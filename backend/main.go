package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/rs/cors"

	"portfolio-secrets-service/internal"
)

// Config holds all configuration
type Config struct {
	JWTSecret      string
	Port           string
	AllowedOrigins string
	AuthUsername   string
	AuthPassword   string
	OpenAIKey      string
	FirebaseKey    string
	// Add more API keys as needed
}

// SecretService handles secret operations
type SecretService struct {
	config *Config
}

// Claims for JWT
type Claims struct {
	Username string `json:"username"`
	jwt.RegisteredClaims
}

// AuthRequest for login
type AuthRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// AuthResponse for login
type AuthResponse struct {
	Token string `json:"token"`
	Error string `json:"error,omitempty"`
}

// SecretResponse for secret endpoints
type SecretResponse struct {
	Secret string `json:"secret"`
	Error  string `json:"error,omitempty"`
}

// HealthResponse for health check
type HealthResponse struct {
	Status string `json:"status"`
}

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using system environment variables")
	}

	config := &Config{
		JWTSecret:      getEnv("JWT_SECRET", "your-jwt-secret-change-this"),
		Port:           getEnv("PORT", "8080"),
		AllowedOrigins: getEnv("ALLOWED_ORIGINS", "https://ethanmerrill.com"),
		AuthUsername:   getEnv("VITE_SECRETS_SERVICE_USERNAME", "admin"),
		AuthPassword:   getEnv("VITE_SECRETS_SERVICE_PASSWORD", "changeme"),
		OpenAIKey:      getEnv("OPENAI_API_KEY", ""),
		FirebaseKey:    getEnv("FIREBASE_API_KEY", ""),
	}

	// Log configuration (without sensitive data)
	log.Printf("Configuration loaded:")
	log.Printf("  Port: %s", config.Port)

	log.Printf("  Auth Username: %s", config.AuthUsername)
	log.Printf("  JWT Secret configured: %t", config.JWTSecret != "")
	log.Printf("  OpenAI Key configured: %t", config.OpenAIKey != "")
	log.Printf("  Firebase Key configured: %t", config.FirebaseKey != "")

	// Validate required environment variables
	if config.JWTSecret == "your-jwt-secret-change-this" {
		log.Println("WARNING: Using default JWT secret. This is insecure for production!")
	}

	if config.OpenAIKey == "" {
		log.Println("WARNING: OPENAI_API_KEY environment variable is not set. OpenAI functionality will be disabled.")
	}

	log.Println("Environment validation complete, starting service...")

	service := &SecretService{
		config: config,
	}

	// Initialize ChatService
	chatService := internal.NewChatService(config.OpenAIKey)

	// Setup routes
	router := mux.NewRouter()

	// Add request logging middleware
	router.Use(service.loggingMiddleware)

	// Health check endpoint
	router.HandleFunc("/health", service.healthHandler).Methods("GET")
	log.Println("Registered route: GET /health")

	// Authentication endpoint
	router.HandleFunc("/auth", service.authHandler).Methods("POST")
	log.Println("Registered route: POST /auth")

	// Protected secret endpoints
	apiRouter := router.PathPrefix("/api").Subrouter()
	apiRouter.Use(service.jwtMiddleware)
	apiRouter.HandleFunc("/secrets/openai", service.getOpenAIKeyHandler).Methods("GET")
	apiRouter.HandleFunc("/secrets/{secretName}", service.getSecretHandler).Methods("GET")
	apiRouter.HandleFunc("/chat", chatService.ChatHandler).Methods("POST")
	log.Println("Registered protected routes: GET /api/secrets/openai, GET /api/secrets/{secretName}, POST /api/chat")

	// Setup CORS
	// Parse comma-separated allowed origins
	originsSlice := strings.Split(config.AllowedOrigins, ",")

	// Add localhost origins for development
	originsSlice = append(originsSlice, "http://localhost:3000", "http://localhost:5173")
	log.Printf("CORS configured with origins: %v", originsSlice)

	c := cors.New(cors.Options{
		AllowedOrigins:   originsSlice,
		AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: true,
	})

	handler := c.Handler(router)

	log.Printf("Server starting on port %s, listening at http://localhost:%s", config.Port, config.Port)
	log.Printf("Allowed origins: %s", originsSlice)
	log.Fatal(http.ListenAndServe(":"+config.Port, handler))
}

// loggingMiddleware logs all incoming requests
func (s *SecretService) loggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()

		// Log the incoming request
		log.Printf("Request: %s %s from %s", r.Method, r.URL.Path, r.RemoteAddr)

		// Create a response writer wrapper to capture status code
		wrapped := &responseWriter{ResponseWriter: w, statusCode: http.StatusOK}

		next.ServeHTTP(wrapped, r)

		// Log the response
		duration := time.Since(start)
		log.Printf("Response: %s %s - Status: %d - Duration: %v", r.Method, r.URL.Path, wrapped.statusCode, duration)
	})
}

// responseWriter wraps http.ResponseWriter to capture status code
type responseWriter struct {
	http.ResponseWriter
	statusCode int
}

func (rw *responseWriter) WriteHeader(code int) {
	rw.statusCode = code
	rw.ResponseWriter.WriteHeader(code)
}

func (s *SecretService) healthHandler(w http.ResponseWriter, r *http.Request) {
	log.Println("Health check requested")
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "healthy"})
	log.Println("Health check response sent")
}

func (s *SecretService) authHandler(w http.ResponseWriter, r *http.Request) {
	log.Printf("Authentication attempt from %s", r.RemoteAddr)

	var req AuthRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		log.Printf("Authentication failed: invalid request body - %v", err)
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	log.Printf("Authentication attempt for username: %s", req.Username)

	// Use config values for authentication
	if req.Username != s.config.AuthUsername || req.Password != s.config.AuthPassword {
		log.Printf("Authentication failed: invalid credentials for username: %s, password: %s", req.Username, req.Password)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(AuthResponse{Error: "Invalid credentials"})
		return
	}

	// Create JWT token
	expirationTime := time.Now().Add(24 * time.Hour)
	claims := &Claims{
		Username: req.Username,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte(s.config.JWTSecret))
	if err != nil {
		log.Printf("Authentication failed: token generation error - %v", err)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(AuthResponse{Error: "Failed to generate token"})
		return
	}

	log.Printf("Authentication successful for username: %s", req.Username)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(AuthResponse{Token: tokenString})
}

func (s *SecretService) jwtMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Printf("JWT validation for request: %s %s", r.Method, r.URL.Path)

		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			log.Printf("JWT validation failed: missing authorization header")
			http.Error(w, "Authorization header required", http.StatusUnauthorized)
			return
		}

		tokenString := strings.TrimPrefix(authHeader, "Bearer ")
		if tokenString == authHeader {
			log.Printf("JWT validation failed: invalid bearer token format")
			http.Error(w, "Bearer token required", http.StatusUnauthorized)
			return
		}

		claims := &Claims{}
		token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
			return []byte(s.config.JWTSecret), nil
		})

		if err != nil || !token.Valid {
			log.Printf("JWT validation failed: invalid token - %v", err)
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}

		log.Printf("JWT validation successful for user: %s", claims.Username)
		next.ServeHTTP(w, r)
	})
}

func (s *SecretService) getOpenAIKeyHandler(w http.ResponseWriter, r *http.Request) {
	log.Printf("OpenAI key requested from %s", r.RemoteAddr)

	if s.config.OpenAIKey == "" {
		log.Printf("OpenAI API key not configured")
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(SecretResponse{Error: "Secret not configured"})
		return
	}

	log.Printf("OpenAI key successfully provided")
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(SecretResponse{Secret: s.config.OpenAIKey})
}

func (s *SecretService) getSecretHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	secretName := vars["secretName"]

	log.Printf("Secret '%s' requested from %s", secretName, r.RemoteAddr)

	var secret string
	var ok bool

	// Security: Only allow specific secret names and map to config fields
	switch secretName {
	case "openai":
		secret = s.config.OpenAIKey
		ok = secret != ""
		log.Printf("OpenAI secret requested, configured: %t", ok)
	case "firebase":
		secret = s.config.FirebaseKey
		ok = secret != ""
		log.Printf("Firebase secret requested, configured: %t", ok)
	default:
		log.Printf("Forbidden secret requested: %s", secretName)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusForbidden)
		json.NewEncoder(w).Encode(SecretResponse{Error: "Secret not allowed"})
		return
	}

	if !ok {
		log.Printf("Secret %s not configured", secretName)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(SecretResponse{Error: "Secret not configured"})
		return
	}

	log.Printf("Secret '%s' successfully provided", secretName)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(SecretResponse{Secret: secret})
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}
