#!/bin/bash

# deploy-nginx.sh - Nginx reverse proxy deployment script
# This script manages the Docker Compose deployment of the secrets service with nginx

set -e

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
}

# Check if Docker and Docker Compose are available
check_docker() {
    if ! command -v docker &> /dev/null; then
        error "Docker is not installed or not in PATH"
        exit 1
    fi

    if ! command -v docker-compose &> /dev/null; then
        error "Docker Compose is not installed or not in PATH"
        exit 1
    fi

    if ! docker info &> /dev/null; then
        error "Docker daemon is not running or not accessible"
        exit 1
    fi
}

# Deploy the application
deploy() {
    log "Starting nginx reverse proxy deployment..."
    
    check_docker
    
    # Create necessary directories
    mkdir -p logs/nginx ssl
    
    # Ensure .env file exists
    if [ ! -f ".env" ]; then
        warn ".env file not found. Creating from example..."
        if [ -f ".env.example" ]; then
            cp .env.example .env
            warn "Please update .env file with your actual values"
        else
            error ".env.example file not found. Cannot create .env file."
            exit 1
        fi
    fi
    
    log "Building Docker images..."
    docker-compose build --no-cache
    
    log "Starting services..."
    docker-compose up -d
    
    log "Waiting for services to be ready..."
    sleep 10
    
    # Wait for backend service to be healthy
    log "Checking backend service health..."
    for i in {1..30}; do
        if docker-compose exec -T secrets-service wget --quiet --tries=1 --spider http://localhost:8080/health 2>/dev/null; then
            log "Backend service is healthy!"
            break
        fi
        if [ $i -eq 30 ]; then
            error "Backend service failed to become healthy after 5 minutes"
            log "Backend service logs:"
            docker-compose logs secrets-service
            exit 1
        fi
        sleep 10
    done
    
    # Wait for nginx to be healthy
    log "Checking nginx service health..."
    for i in {1..30}; do
        if curl -f -s http://localhost/health >/dev/null 2>&1; then
            log "Nginx service is healthy!"
            break
        fi
        if [ $i -eq 30 ]; then
            error "Nginx service failed to become healthy after 5 minutes"
            log "Nginx service logs:"
            docker-compose logs nginx
            exit 1
        fi
        sleep 10
    done
    
    log "✅ Deployment completed successfully!"
    status
}

# Start services
start() {
    log "Starting nginx reverse proxy services..."
    check_docker
    docker-compose up -d
    log "Services started"
}

# Stop services
stop() {
    log "Stopping nginx reverse proxy services..."
    check_docker
    docker-compose down
    log "Services stopped"
}

# Restart services
restart() {
    log "Restarting nginx reverse proxy services..."
    stop
    sleep 5
    start
}

# Show status
status() {
    log "Checking nginx reverse proxy status..."
    check_docker
    
    echo ""
    echo "=== Container Status ==="
    docker-compose ps
    
    echo ""
    echo "=== Service Health ==="
    
    # Check backend health
    if docker-compose exec -T secrets-service wget --quiet --tries=1 --spider http://localhost:8080/health 2>/dev/null; then
        echo -e "Backend Service: ${GREEN}✅ HEALTHY${NC}"
    else
        echo -e "Backend Service: ${RED}❌ UNHEALTHY${NC}"
    fi
    
    # Check nginx health
    if curl -f -s http://localhost/health >/dev/null 2>&1; then
        echo -e "Nginx Service: ${GREEN}✅ HEALTHY${NC}"
    else
        echo -e "Nginx Service: ${RED}❌ UNHEALTHY${NC}"
    fi
    
    echo ""
    echo "=== Port Status ==="
    echo "HTTP (80): $(netstat -ln | grep ':80 ' | wc -l | tr -d ' ') listener(s)"
    echo "HTTPS (443): $(netstat -ln | grep ':443 ' | wc -l | tr -d ' ') listener(s)"
    
    echo ""
    echo "=== Resource Usage ==="
    docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}" $(docker-compose ps -q) 2>/dev/null || echo "No containers running"
}

# Show logs
logs() {
    log "Showing nginx reverse proxy logs..."
    check_docker
    
    if [ -n "$1" ]; then
        # Show logs for specific service
        docker-compose logs -f "$1"
    else
        # Show logs for all services
        docker-compose logs -f
    fi
}

# Update deployment
update() {
    log "Updating nginx reverse proxy deployment..."
    
    # Pull latest code
    if [ -d ".git" ]; then
        log "Pulling latest code..."
        git pull origin main
    fi
    
    # Rebuild and restart
    log "Rebuilding images..."
    docker-compose build --no-cache
    
    log "Restarting services..."
    docker-compose down
    docker-compose up -d
    
    log "Update completed"
    status
}

# Health check
health() {
    log "Running health checks..."
    
    local exit_code=0
    
    # Check if containers are running
    if ! docker-compose ps | grep -q "Up"; then
        error "No containers are running"
        exit_code=1
    fi
    
    # Check backend health
    if ! docker-compose exec -T secrets-service wget --quiet --tries=1 --spider http://localhost:8080/health 2>/dev/null; then
        error "Backend service health check failed"
        exit_code=1
    fi
    
    # Check nginx health
    if ! curl -f -s http://localhost/health >/dev/null 2>&1; then
        error "Nginx service health check failed"
        exit_code=1
    fi
    
    if [ $exit_code -eq 0 ]; then
        log "✅ All health checks passed"
    else
        error "❌ Health check failed"
    fi
    
    return $exit_code
}

# Clean up
clean() {
    log "Cleaning up nginx reverse proxy deployment..."
    
    warn "This will remove all containers, networks, and volumes. Continue? (y/N)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        log "Cleanup cancelled"
        return 0
    fi
    
    docker-compose down -v --remove-orphans
    docker system prune -f
    
    log "Cleanup completed"
}

# Show help
help() {
    echo "nginx reverse proxy deployment script"
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  deploy    Deploy the nginx reverse proxy with backend service"
    echo "  start     Start the services"
    echo "  stop      Stop the services"
    echo "  restart   Restart the services"
    echo "  status    Show service status and health"
    echo "  logs      Show service logs (optionally specify service name)"
    echo "  update    Update and restart the deployment"
    echo "  health    Run health checks"
    echo "  clean     Clean up all containers and volumes"
    echo "  help      Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 deploy"
    echo "  $0 logs nginx"
    echo "  $0 logs secrets-service"
    echo "  $0 status"
}

# Main script logic
main() {
    case "${1:-help}" in
        deploy)
            deploy
            ;;
        start)
            start
            ;;
        stop)
            stop
            ;;
        restart)
            restart
            ;;
        status)
            status
            ;;
        logs)
            logs "$2"
            ;;
        update)
            update
            ;;
        health)
            health
            ;;
        clean)
            clean
            ;;
        help|--help|-h)
            help
            ;;
        *)
            error "Unknown command: $1"
            help
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@"
