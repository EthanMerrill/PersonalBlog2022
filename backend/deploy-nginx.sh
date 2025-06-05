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

# Setup SSL certificates based on environment
setup_ssl_certificates() {
    log "Setting up SSL certificates..."
    
    # Source environment variables
    if [ -f ".env" ]; then
        set -a
        source .env
        set +a
    fi
    
    # Check if SSL setup script exists
    if [ ! -f "./ssl-setup.sh" ]; then
        error "SSL setup script not found at ./ssl-setup.sh"
        exit 1
    fi
    
    # Make SSL setup script executable
    chmod +x ./ssl-setup.sh
    
    # Run automatic SSL setup
    log "Running automatic SSL certificate setup..."
    if ./ssl-setup.sh auto; then
        log "✅ SSL certificates configured successfully"
        # Enable SSL server block in nginx configuration
        enable_ssl_in_nginx
    else
        warn "SSL certificate setup failed. HTTPS will not be available."
        warn "The application will run with HTTP only."
    fi
}

# Enable SSL server block in nginx configuration
enable_ssl_in_nginx() {
    log "Enabling SSL server block in nginx configuration..."
    
    # Check if SSL certificates exist
    if [ -f "./ssl/certs/fullchain.pem" ] && [ -f "./ssl/private/privkey.pem" ]; then
        # Create a backup of the original nginx.conf
        cp nginx.conf nginx.conf.backup
        
        # Create SSL-enabled nginx configuration
        cat > nginx.conf << 'EOF'
# nginx.conf - Production-ready reverse proxy configuration with SSL
events {
    worker_connections 1024;
}

http {
    # Use Docker's internal DNS resolver
    resolver 127.0.0.11 valid=10s ipv6=off;
    
    # Define backend variable for dynamic resolution
    map $uri $backend_server {
        default secrets-service:8080;
    }

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;

    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384;
    ssl_prefer_server_ciphers off;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/atom+xml
        image/svg+xml;

    # HTTP server - redirect to HTTPS
    server {
        listen 80;
        server_name _;

        # Health check endpoint (allow HTTP for load balancer)
        location /health {
            access_log off;
            return 200 "healthy\n";
            add_header Content-Type text/plain;
        }

        # Redirect all other HTTP traffic to HTTPS
        location / {
            return 301 https://$server_name$request_uri;
        }
    }

    # HTTPS server
    server {
        listen 443 ssl;
        http2 on;
        server_name _;

        # SSL certificate paths
        ssl_certificate /etc/ssl/certs/fullchain.pem;
        ssl_certificate_key /etc/ssl/private/privkey.pem;

        # SSL session settings
        ssl_session_cache shared:SSL:10m;
        ssl_session_timeout 10m;

        # Security headers
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
        add_header X-Frame-Options DENY;
        add_header X-Content-Type-Options nosniff;
        add_header X-XSS-Protection "1; mode=block";
        add_header Referrer-Policy "strict-origin-when-cross-origin";

        # Health check endpoint
        location /health {
            access_log off;
            return 200 "healthy\n";
            add_header Content-Type text/plain;
        }

        # Main application proxy
        location / {
            limit_req zone=api burst=20 nodelay;

            proxy_pass http://$backend_server;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto https;
            proxy_set_header X-Forwarded-Host $host;

            # Cloudflare headers
            proxy_set_header CF-Connecting-IP $http_cf_connecting_ip;
            proxy_set_header CF-Ray $http_cf_ray;
            proxy_set_header CF-Visitor $http_cf_visitor;

            proxy_connect_timeout 30s;
            proxy_send_timeout 30s;
            proxy_read_timeout 30s;

            proxy_buffering on;
            proxy_buffer_size 4k;
            proxy_buffers 8 4k;
            proxy_busy_buffers_size 8k;

            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection $connection_upgrade;
        }

        # Static file serving with caching
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            proxy_pass http://$backend_server;
            proxy_set_header Host $host;
            expires 1y;
            add_header Cache-Control "public, immutable";
        }

        # API routes with specific rate limiting
        location /api/ {
            limit_req zone=api burst=10 nodelay;
            
            proxy_pass http://$backend_server;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto https;
        }
    }

    # Connection upgrade mapping for WebSockets
    map $http_upgrade $connection_upgrade {
        default upgrade;
        '' close;
    }
}
EOF
        
        log "✅ SSL-enabled nginx configuration created"
        
        # Validate the nginx configuration
        if docker run --rm -v "$PWD/nginx.conf:/etc/nginx/nginx.conf:ro" nginx:alpine nginx -t >/dev/null 2>&1; then
            log "✅ Nginx configuration is valid"
        else
            warn "Nginx configuration validation failed. Restoring backup..."
            mv nginx.conf.backup nginx.conf
            error "Failed to create SSL-enabled nginx configuration"
            return 1
        fi
    else
        warn "SSL certificates not found. SSL server block will remain disabled."
        return 1
    fi
}

# Deploy the application
deploy() {
    log "Starting nginx reverse proxy deployment..."
    
    check_docker
    
    # Create necessary directories
    mkdir -p logs/nginx ssl
    
    # Ensure .env file exists or create minimal one for Docker Compose
    if [ ! -f ".env" ]; then
        warn ".env file not found."
        if [ -f ".env.example" ]; then
            log "Creating .env from .env.example..."
            cp .env.example .env
            warn "Please update .env file with your actual values"
        else
            log "Creating minimal .env file for Docker Compose compatibility..."
            # Create a minimal .env file with default values
            # Environment variables from the system (e.g., CloudFormation, GitHub Actions) will override these
            cat > .env << EOF
# Minimal .env file for Docker Compose compatibility
# System environment variables will override these values
VAULT_ADDR=
VAULT_TOKEN=
JWT_SECRET=${JWT_SECRET:-changeme}
PORT=8080
ALLOWED_ORIGIN=${ALLOWED_ORIGIN:-*}
AUTH_USERNAME=${AUTH_USERNAME:-admin}
AUTH_PASSWORD=${AUTH_PASSWORD:-changeme}
OPENAI_API_KEY=${OPENAI_API_KEY:-}
FIREBASE_API_KEY=${FIREBASE_API_KEY:-}
DOMAIN=${DOMAIN:-}
CLOUDFLARE_API_TOKEN=${CLOUDFLARE_API_TOKEN:-}
EOF
            log "✅ Created minimal .env file. System environment variables will be used."
        fi
    fi
    
    # Setup SSL certificates before starting nginx
    setup_ssl_certificates
    
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
    echo "=== SSL Certificate Status ==="
    if [ -f "./ssl/certs/fullchain.pem" ] && [ -f "./ssl/private/privkey.pem" ]; then
        echo -e "SSL Certificates: ${GREEN}✅ FOUND${NC}"
        
        # Check certificate expiration
        if command -v openssl >/dev/null 2>&1; then
            cert_expiry=$(openssl x509 -in "./ssl/certs/fullchain.pem" -noout -enddate 2>/dev/null | cut -d= -f2)
            if [ -n "$cert_expiry" ]; then
                echo "Certificate expires: $cert_expiry"
            fi
        fi
        
        # Check if HTTPS is responding
        if curl -f -s -k --connect-timeout 5 https://localhost/health >/dev/null 2>&1; then
            echo -e "HTTPS Health: ${GREEN}✅ RESPONDING${NC}"
        else
            echo -e "HTTPS Health: ${YELLOW}⚠️ NOT RESPONDING${NC}"
        fi
    else
        echo -e "SSL Certificates: ${RED}❌ NOT FOUND${NC}"
        echo -e "HTTPS Health: ${RED}❌ UNAVAILABLE${NC}"
    fi
    
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

# SSL certificate management
ssl() {
    log "SSL certificate management..."
    
    if [ ! -f "./ssl-setup.sh" ]; then
        error "SSL setup script not found at ./ssl-setup.sh"
        exit 1
    fi
    
    chmod +x ./ssl-setup.sh
    
    case "${1:-status}" in
        setup|install)
            ./ssl-setup.sh auto
            if [ $? -eq 0 ]; then
                log "SSL certificates configured. Updating nginx configuration..."
                enable_ssl_in_nginx
                log "Restarting nginx to apply SSL configuration..."
                restart
            fi
            ;;
        check|status)
            ./ssl-setup.sh status
            ;;
        renew)
            ./ssl-setup.sh renew
            if [ $? -eq 0 ]; then
                log "SSL certificates renewed. Restarting nginx..."
                restart
            fi
            ;;
        remove)
            ./ssl-setup.sh remove
            log "SSL certificates removed. Consider restarting nginx with HTTP-only config."
            ;;
        *)
            echo "Usage: $0 ssl {setup|check|renew|remove}"
            echo ""
            echo "Commands:"
            echo "  setup    - Set up SSL certificates automatically"
            echo "  check    - Check SSL certificate status"
            echo "  renew    - Renew SSL certificates"
            echo "  remove   - Remove SSL certificates"
            ;;
    esac
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
    echo "  ssl       SSL certificate management (setup|check|renew|remove)"
    echo "  clean     Clean up all containers and volumes"
    echo "  help      Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 deploy"
    echo "  $0 logs nginx"
    echo "  $0 logs secrets-service"
    echo "  $0 ssl setup"
    echo "  $0 ssl check"
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
        ssl)
            ssl "$2"
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
