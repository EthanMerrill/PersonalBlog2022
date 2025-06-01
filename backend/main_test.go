package main

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
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

func TestAuthHandler(t *testing.T) {
	service := &SecretService{
		config: &Config{
			JWTSecret: "test-secret",
		},
	}

	// Set environment variables for test
	t.Setenv("AUTH_USERNAME", "testuser")
	t.Setenv("AUTH_PASSWORD", "testpass")

	authReq := AuthRequest{
		Username: "testuser",
		Password: "testpass",
	}

	body, _ := json.Marshal(authReq)
	req, err := http.NewRequest("POST", "/auth", bytes.NewBuffer(body))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(service.authHandler)

	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	var response AuthResponse
	if err := json.Unmarshal(rr.Body.Bytes(), &response); err != nil {
		t.Fatal("Could not parse response")
	}

	if response.Token == "" {
		t.Error("Expected token in response")
	}

	if response.Error != "" {
		t.Errorf("Unexpected error: %v", response.Error)
	}
}

func TestAuthHandlerInvalidCredentials(t *testing.T) {
	service := &SecretService{
		config: &Config{
			JWTSecret: "test-secret",
		},
	}

	// Set environment variables for test
	t.Setenv("AUTH_USERNAME", "testuser")
	t.Setenv("AUTH_PASSWORD", "testpass")

	authReq := AuthRequest{
		Username: "wronguser",
		Password: "wrongpass",
	}

	body, _ := json.Marshal(authReq)
	req, err := http.NewRequest("POST", "/auth", bytes.NewBuffer(body))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(service.authHandler)

	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusUnauthorized {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusUnauthorized)
	}
}
