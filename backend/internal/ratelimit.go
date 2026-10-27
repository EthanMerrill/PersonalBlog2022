package internal

import (
	"sync"
	"time"
)

// RateLimiter is a token-bucket limiter keyed by an arbitrary string, typically
// the client IP. A key may burst up to `burst` requests and then replenishes at
// `limit` requests per `window`. It is safe for concurrent use.
//
// A nil *RateLimiter allows every request, so callers can leave the limiter
// unset (tests, local development) without nil checks.
type RateLimiter struct {
	mu          sync.Mutex
	buckets     map[string]*rateBucket
	ratePerSec  float64
	burst       float64
	idleTTL     time.Duration
	lastCleanup time.Time
	now         func() time.Time
}

type rateBucket struct {
	tokens float64
	last   time.Time
}

// NewRateLimiter returns a limiter that permits `limit` requests per window with
// a maximum burst of `burst`. It returns nil when disabled (limit <= 0).
func NewRateLimiter(limit int, window time.Duration, burst int) *RateLimiter {
	if limit <= 0 || window <= 0 {
		return nil
	}
	if burst < 1 {
		burst = 1
	}
	return &RateLimiter{
		buckets:    make(map[string]*rateBucket),
		ratePerSec: float64(limit) / window.Seconds(),
		burst:      float64(burst),
		idleTTL:    10 * window,
		now:        time.Now,
	}
}

// Allow reports whether a request for key may proceed. When it may not, it also
// returns how long the caller should wait before retrying.
func (l *RateLimiter) Allow(key string) (bool, time.Duration) {
	if l == nil {
		return true, 0
	}

	now := l.now()

	l.mu.Lock()
	defer l.mu.Unlock()

	l.cleanupLocked(now)

	b, ok := l.buckets[key]
	if !ok {
		b = &rateBucket{tokens: l.burst, last: now}
		l.buckets[key] = b
	} else if elapsed := now.Sub(b.last).Seconds(); elapsed > 0 {
		b.tokens += elapsed * l.ratePerSec
		if b.tokens > l.burst {
			b.tokens = l.burst
		}
		b.last = now
	}

	if b.tokens >= 1 {
		b.tokens--
		return true, 0
	}

	// Time needed to earn the missing token(s) at the configured rate.
	wait := time.Duration((1 - b.tokens) / l.ratePerSec * float64(time.Second))
	if wait <= 0 {
		wait = time.Second
	}
	return false, wait
}

// cleanupLocked drops buckets that have been idle longer than idleTTL so the map
// cannot grow without bound as new IPs arrive. It runs at most once per idleTTL.
func (l *RateLimiter) cleanupLocked(now time.Time) {
	if now.Sub(l.lastCleanup) < l.idleTTL {
		return
	}
	l.lastCleanup = now
	for key, b := range l.buckets {
		if now.Sub(b.last) > l.idleTTL {
			delete(l.buckets, key)
		}
	}
}
