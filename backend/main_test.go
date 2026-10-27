package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"portfolio-secrets-service/internal"
)

func TestHealthHandler(t *testing.T) {
	service := &SecretService{
		config: &Config{},
	}

	req, err := http.NewRequest("GET", "/health", nil)
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(service.healthHandler)

	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	var response map[string]string
	if err := json.Unmarshal(rr.Body.Bytes(), &response); err != nil {
		t.Fatal("Could not parse response")
	}

	if response["status"] != "healthy" {
		t.Errorf("Expected status 'healthy', got %v", response["status"])
	}
}

func TestClientIPPrefersCFConnectingIP(t *testing.T) {
	req := httptest.NewRequest("POST", "/auth", nil)
	req.RemoteAddr = "10.0.0.5:1234"
	req.Header.Set("CF-Connecting-IP", "203.0.113.9")
	req.Header.Set("X-Forwarded-For", "198.51.100.7, 10.0.0.5")

	if got := clientIP(req); got != "203.0.113.9" {
		t.Errorf("expected CF-Connecting-IP to win, got %q", got)
	}
}

func TestClientIPUsesFirstForwardedFor(t *testing.T) {
	req := httptest.NewRequest("POST", "/auth", nil)
	req.RemoteAddr = "10.0.0.5:1234"
	req.Header.Set("X-Forwarded-For", "198.51.100.7, 10.0.0.5")

	if got := clientIP(req); got != "198.51.100.7" {
		t.Errorf("expected first X-Forwarded-For entry, got %q", got)
	}
}

func TestClientIPFallsBackToRemoteAddr(t *testing.T) {
	req := httptest.NewRequest("POST", "/auth", nil)
	req.RemoteAddr = "192.0.2.44:5555"

	if got := clientIP(req); got != "192.0.2.44" {
		t.Errorf("expected RemoteAddr host, got %q", got)
	}
}

func TestRateLimitMiddlewareRejectsBeyondBurst(t *testing.T) {
	service := &SecretService{
		config:        &Config{},
		ipLimiter:     internal.NewRateLimiter(60, time.Minute, 2),
		globalLimiter: nil,
	}

	handler := service.rateLimitMiddleware(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	}))

	newReq := func() *http.Request {
		req := httptest.NewRequest("POST", "/auth", nil)
		req.RemoteAddr = "203.0.113.30:1234"
		return req
	}

	for i := 0; i < 2; i++ {
		rr := httptest.NewRecorder()
		handler.ServeHTTP(rr, newReq())
		if rr.Code != http.StatusOK {
			t.Fatalf("request %d: expected 200, got %d", i+1, rr.Code)
		}
	}

	rr := httptest.NewRecorder()
	handler.ServeHTTP(rr, newReq())

	if rr.Code != http.StatusTooManyRequests {
		t.Fatalf("expected 429 beyond burst, got %d", rr.Code)
	}
	if rr.Header().Get("Retry-After") == "" {
		t.Error("expected a Retry-After header on 429")
	}
}

func TestRateLimitMiddlewareAllowsWithoutLimiter(t *testing.T) {
	service := &SecretService{config: &Config{}}

	handler := service.rateLimitMiddleware(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	}))

	rr := httptest.NewRecorder()
	handler.ServeHTTP(rr, httptest.NewRequest("POST", "/auth", nil))

	if rr.Code != http.StatusOK {
		t.Errorf("nil limiters should allow the request, got %d", rr.Code)
	}
}

func TestGetEnvInt(t *testing.T) {
	if got := getEnvInt("UNSET_RATE_LIMIT_VAR", 30); got != 30 {
		t.Errorf("expected default 30, got %d", got)
	}

	t.Setenv("RATE_LIMIT_TEST_VALUE", "45")
	if got := getEnvInt("RATE_LIMIT_TEST_VALUE", 30); got != 45 {
		t.Errorf("expected 45, got %d", got)
	}

	t.Setenv("RATE_LIMIT_TEST_VALUE", "not-a-number")
	if got := getEnvInt("RATE_LIMIT_TEST_VALUE", 30); got != 30 {
		t.Errorf("expected fallback to 30, got %d", got)
	}
}
