.PHONY: build run test clean docker-build docker-run dev

# Variables
APP_NAME=secrets-service
DOCKER_IMAGE=secrets-service:latest

# Build the application
build:
	go build -o bin/$(APP_NAME) .

# Run the application locally
run:
	go run main.go

# Run tests
test:
	go test -v ./...

# Run in development mode with auto-reload (requires air)
dev:
	@if command -v air > /dev/null; then \
		air; \
	else \
		echo "Install air for auto-reload: go install github.com/cosmtrek/air@latest"; \
		go run main.go; \
	fi

# Clean build artifacts
clean:
	rm -rf bin/
	docker rmi $(DOCKER_IMAGE) 2>/dev/null || true

# Build Docker image
docker-build:
	docker build -t $(DOCKER_IMAGE) .

# Run Docker container
docker-run: docker-build
	docker run -p 8080:8080 --env-file .env $(DOCKER_IMAGE)

# Run with Docker Compose
compose-up:
	docker-compose up -d

# Stop Docker Compose
compose-down:
	docker-compose down

# View logs
logs:
	docker-compose logs -f

# Setup development environment
setup:
	@echo "Setting up development environment..."
	@if [ ! -f .env ]; then \
		cp .env.example .env; \
		echo "Created .env file from template. Please update with your values."; \
	else \
		echo ".env file already exists."; \
	fi
	go mod tidy
	@echo "Setup complete! Update .env file and run 'make run' to start."

# Health check
health:
	@curl -f http://localhost:8080/health || echo "Service is not running"

# Format code
fmt:
	go fmt ./...

# Run linter
lint:
	@if command -v golangci-lint > /dev/null; then \
		golangci-lint run; \
	else \
		echo "Install golangci-lint: https://golangci-lint.run/usage/install/"; \
	fi

# Security check
security:
	@if command -v gosec > /dev/null; then \
		gosec ./...; \
	else \
		echo "Install gosec: go install github.com/securecodewarrior/gosec/v2/cmd/gosec@latest"; \
	fi

# Help
help:
	@echo "Available commands:"
	@echo "  setup       - Setup development environment"
	@echo "  build       - Build the application"
	@echo "  run         - Run the application locally"
	@echo "  dev         - Run with auto-reload (requires air)"
	@echo "  test        - Run tests"
	@echo "  docker-build - Build Docker image"
	@echo "  docker-run   - Run Docker container"
	@echo "  compose-up   - Start with Docker Compose"
	@echo "  compose-down - Stop Docker Compose"
	@echo "  logs        - View Docker Compose logs"
	@echo "  health      - Check service health"
	@echo "  fmt         - Format code"
	@echo "  lint        - Run linter"
	@echo "  security    - Run security checks"
	@echo "  clean       - Clean build artifacts"
	@echo "  help        - Show this help message"
