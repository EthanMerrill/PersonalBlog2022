package main

import (
	"encoding/json"
	"log"
	"math"
	"net"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/rs/cors"

	"portfolio-secrets-service/internal"
)

// Config holds all configuration
type Config struct {
	Port           string
	AllowedOrigins string
	OpenAIKey      string
	OpenAIModel    string

	// Rate limiting for the public /api/chat endpoint. The service is reachable
	// by anyone through the Cloudflare tunnel, so these limits are what caps
	// request volume and OpenAI spend.
	RateLimitPerMinute       int
	RateLimitBurst           int
	RateLimitGlobalPerMinute int
}

// SecretService serves the chat capability. It holds server-side API keys and
// never exposes them over HTTP.
type SecretService struct {
	config        *Config
	ipLimiter     *internal.RateLimiter
	globalLimiter *internal.RateLimiter
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
		Port:           getEnv("PORT", "8080"),
		AllowedOrigins: getEnv("ALLOWED_ORIGINS", "https://ethanmerrill.com"),
		OpenAIKey:      getEnv("OPENAI_API_KEY", ""),
		OpenAIModel:    getEnv("OPENAI_MODEL", "gpt-4o-mini"),

		RateLimitPerMinute:       getEnvInt("RATE_LIMIT_PER_MINUTE", 30),
		RateLimitBurst:           getEnvInt("RATE_LIMIT_BURST", 10),
		RateLimitGlobalPerMinute: getEnvInt("RATE_LIMIT_GLOBAL_PER_MINUTE", 120),
	}

	// Log configuration (without sensitive data)
	log.Printf("Configuration loaded:")
	log.Printf("  Port: %s", config.Port)

	log.Printf("  OpenAI Key configured: %t", config.OpenAIKey != "")
	log.Printf("  OpenAI Model: %s", config.OpenAIModel)
	log.Printf("  Rate limit: %d/min per IP (burst %d), %d/min global",
		config.RateLimitPerMinute, config.RateLimitBurst, config.RateLimitGlobalPerMinute)

	// Validate required environment variables
	if config.OpenAIKey == "" {
		log.Println("WARNING: OPENAI_API_KEY environment variable is not set. OpenAI functionality will be disabled.")
	}

	log.Println("Environment validation complete, starting service...")

	service := &SecretService{
		config: config,
		ipLimiter: internal.NewRateLimiter(
			config.RateLimitPerMinute, time.Minute, config.RateLimitBurst),
		globalLimiter: internal.NewRateLimiter(
			config.RateLimitGlobalPerMinute, time.Minute, config.RateLimitGlobalPerMinute),
	}

	// Initialize ChatService
	chatService := internal.NewChatService(config.OpenAIKey, config.OpenAIModel)

	// Setup routes
	router := mux.NewRouter()

	// Add request logging middleware
	router.Use(service.loggingMiddleware)

	// Health check endpoint
	router.HandleFunc("/health", service.healthHandler).Methods("GET")
	log.Println("Registered route: GET /health")

	// Chat is the only public capability. The service never returns credentials
	// or API keys: the OpenAI key stays server-side and is used to call OpenAI.
	apiRouter := router.PathPrefix("/api").Subrouter()
	apiRouter.Use(service.rateLimitMiddleware)
	apiRouter.HandleFunc("/chat", chatService.ChatHandler).Methods("POST")
	log.Println("Registered route: POST /api/chat (rate limited)")

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

// rateLimitMiddleware applies the per-IP and global limiters to a handler.
func (s *SecretService) rateLimitMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ip := clientIP(r)

		if ok, retryAfter := s.ipLimiter.Allow(ip); !ok {
			s.writeRateLimited(w, r, retryAfter)
			return
		}
		if ok, retryAfter := s.globalLimiter.Allow("global"); !ok {
			s.writeRateLimited(w, r, retryAfter)
			return
		}

		next.ServeHTTP(w, r)
	})
}

// writeRateLimited responds with 429 and a Retry-After hint.
func (s *SecretService) writeRateLimited(w http.ResponseWriter, r *http.Request, retryAfter time.Duration) {
	seconds := int(math.Ceil(retryAfter.Seconds()))
	if seconds < 1 {
		seconds = 1
	}

	log.Printf("Rate limit exceeded: %s %s from %s (retry after %ds)", r.Method, r.URL.Path, clientIP(r), seconds)

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Retry-After", strconv.Itoa(seconds))
	w.WriteHeader(http.StatusTooManyRequests)
	json.NewEncoder(w).Encode(map[string]string{"error": "rate limit exceeded"})
}

// clientIP returns the caller's address. The service is only reachable through
// the Cloudflare tunnel, which sets CF-Connecting-IP and appends to
// X-Forwarded-For. If the origin port is ever exposed directly, these headers
// become spoofable and limits could be bypassed by rotating values.
func clientIP(r *http.Request) string {
	if ip := strings.TrimSpace(r.Header.Get("CF-Connecting-IP")); ip != "" {
		return ip
	}

	if forwarded := strings.TrimSpace(r.Header.Get("X-Forwarded-For")); forwarded != "" {
		first := forwarded
		if i := strings.IndexByte(first, ','); i >= 0 {
			first = first[:i]
		}
		if first = strings.TrimSpace(first); first != "" {
			return first
		}
	}

	if host, _, err := net.SplitHostPort(r.RemoteAddr); err == nil {
		return host
	}
	return r.RemoteAddr
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

// getEnvInt parses an integer environment variable, falling back to the default
// when unset or invalid.
func getEnvInt(key string, defaultValue int) int {
	raw := strings.TrimSpace(os.Getenv(key))
	if raw == "" {
		return defaultValue
	}
	parsed, err := strconv.Atoi(raw)
	if err != nil || parsed <= 0 {
		log.Printf("Invalid value for %s (%q), using default %d", key, raw, defaultValue)
		return defaultValue
	}
	return parsed
}
