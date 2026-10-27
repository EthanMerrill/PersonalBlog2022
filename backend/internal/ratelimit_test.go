package internal

import (
	"testing"
	"time"
)

func TestRateLimiterAllowsUpToBurst(t *testing.T) {
	l := NewRateLimiter(60, time.Minute, 5)

	for i := 0; i < 5; i++ {
		if ok, _ := l.Allow("1.2.3.4"); !ok {
			t.Fatalf("request %d should have been allowed", i+1)
		}
	}

	ok, retryAfter := l.Allow("1.2.3.4")
	if ok {
		t.Fatal("request beyond burst should have been denied")
	}
	if retryAfter <= 0 {
		t.Errorf("expected a positive retry hint, got %v", retryAfter)
	}
}

func TestRateLimiterIsolatesKeys(t *testing.T) {
	l := NewRateLimiter(60, time.Minute, 1)

	if ok, _ := l.Allow("1.1.1.1"); !ok {
		t.Fatal("first request for 1.1.1.1 should be allowed")
	}
	if ok, _ := l.Allow("1.1.1.1"); ok {
		t.Fatal("second request for 1.1.1.1 should be denied")
	}
	if ok, _ := l.Allow("2.2.2.2"); !ok {
		t.Fatal("a different key must not be affected by another key's usage")
	}
}

func TestRateLimiterRefills(t *testing.T) {
	now := time.Now()
	l := NewRateLimiter(60, time.Minute, 1) // one token per second
	l.now = func() time.Time { return now }

	if ok, _ := l.Allow("9.9.9.9"); !ok {
		t.Fatal("initial request should be allowed")
	}
	if ok, _ := l.Allow("9.9.9.9"); ok {
		t.Fatal("immediate second request should be denied")
	}

	now = now.Add(time.Second)
	if ok, _ := l.Allow("9.9.9.9"); !ok {
		t.Fatal("request after one second should be allowed again")
	}
}

func TestRateLimiterCapsAtBurst(t *testing.T) {
	now := time.Now()
	l := NewRateLimiter(60, time.Minute, 2)
	l.now = func() time.Time { return now }

	// Drain the bucket, then idle long enough to earn far more than the burst.
	l.Allow("5.5.5.5")
	l.Allow("5.5.5.5")
	now = now.Add(10 * time.Minute)

	allowed := 0
	for i := 0; i < 10; i++ {
		if ok, _ := l.Allow("5.5.5.5"); ok {
			allowed++
		}
	}
	if allowed != 2 {
		t.Errorf("expected refill to be capped at burst (2), got %d", allowed)
	}
}

func TestRateLimiterCleanupDropsIdleBuckets(t *testing.T) {
	now := time.Now()
	l := NewRateLimiter(60, time.Minute, 1)
	l.now = func() time.Time { return now }

	l.Allow("8.8.8.8")
	if len(l.buckets) != 1 {
		t.Fatalf("expected 1 tracked bucket, got %d", len(l.buckets))
	}

	// idleTTL is 10 windows; move past it so cleanup prunes the entry.
	now = now.Add(11 * time.Minute)
	l.Allow("4.4.4.4")

	l.mu.Lock()
	tracked := len(l.buckets)
	l.mu.Unlock()
	if tracked != 1 {
		t.Errorf("expected idle bucket to be pruned, %d buckets remain", tracked)
	}
}

func TestNilRateLimiterAllows(t *testing.T) {
	var l *RateLimiter
	if ok, _ := l.Allow("any"); !ok {
		t.Fatal("nil limiter should allow")
	}
}

func TestNewRateLimiterDisabled(t *testing.T) {
	if l := NewRateLimiter(0, time.Minute, 5); l != nil {
		t.Fatal("limit of 0 should disable the limiter")
	}
	if l := NewRateLimiter(10, 0, 5); l != nil {
		t.Fatal("zero window should disable the limiter")
	}
}
