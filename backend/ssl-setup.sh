#!/bin/bash

# ssl-setup.sh - SSL certificate management for nginx reverse proxy
# Supports self-signed certificates and Cloudflare SSL

set -e

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Default paths
SSL_DIR="./ssl"
CERTS_DIR="$SSL_DIR/certs"
PRIVATE_DIR="$SSL_DIR/private"
CERT_FILE="$CERTS_DIR/fullchain.pem"
KEY_FILE="$PRIVATE_DIR/privkey.pem"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
}

info() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')] INFO: $1${NC}"
}

# Create SSL directories
create_ssl_dirs() {
    mkdir -p "$CERTS_DIR" "$PRIVATE_DIR"
    chmod 700 "$PRIVATE_DIR"
    chmod 755 "$CERTS_DIR"
}

# Generate self-signed certificate
generate_self_signed() {
    local domain="${1:-localhost}"
    
    log "Generating self-signed SSL certificate for domain: $domain"
    create_ssl_dirs
    
    # Generate private key
    openssl genrsa -out "$KEY_FILE" 2048
    
    # Generate certificate
    openssl req -new -x509 -days 365 -key "$KEY_FILE" -out "$CERT_FILE" -subj "/C=US/ST=State/L=City/O=Organization/OU=OrgUnit/CN=$domain"
    
    # Set proper permissions
    chmod 600 "$KEY_FILE"
    chmod 644 "$CERT_FILE"
    
    log "✅ Self-signed certificate generated successfully"
    log "Certificate: $CERT_FILE"
    log "Private key: $KEY_FILE"
    
    # Validate the certificate
    validate_certificate
}

# Setup Cloudflare SSL (placeholder for future implementation)
setup_cloudflare_ssl() {
    local domain="$1"
    local api_token="$2"
    
    if [ -z "$domain" ] || [ -z "$api_token" ]; then
        error "Domain and Cloudflare API token are required for Cloudflare SSL setup"
        return 1
    fi
    
    warn "Cloudflare SSL setup is not yet implemented"
    warn "Using self-signed certificate instead"
    generate_self_signed "$domain"
}

# Install existing certificate
install_existing_cert() {
    local cert_path="$1"
    local key_path="$2"
    
    if [ -z "$cert_path" ] || [ -z "$key_path" ]; then
        error "Certificate and key paths are required"
        return 1
    fi
    
    if [ ! -f "$cert_path" ] || [ ! -f "$key_path" ]; then
        error "Certificate or key file not found"
        return 1
    fi
    
    log "Installing existing SSL certificate..."
    create_ssl_dirs
    
    cp "$cert_path" "$CERT_FILE"
    cp "$key_path" "$KEY_FILE"
    
    # Set proper permissions
    chmod 600 "$KEY_FILE"
    chmod 644 "$CERT_FILE"
    
    log "✅ Existing certificate installed successfully"
    validate_certificate
}

# Validate SSL certificate
validate_certificate() {
    if [ ! -f "$CERT_FILE" ] || [ ! -f "$KEY_FILE" ]; then
        error "SSL certificate or key file not found"
        return 1
    fi
    
    log "Validating SSL certificate..."
    
    # Check certificate validity
    if openssl x509 -in "$CERT_FILE" -text -noout >/dev/null 2>&1; then
        log "✅ Certificate is valid"
    else
        error "❌ Certificate is invalid"
        return 1
    fi
    
    # Check private key
    if openssl rsa -in "$KEY_FILE" -check -noout >/dev/null 2>&1; then
        log "✅ Private key is valid"
    else
        error "❌ Private key is invalid"
        return 1
    fi
    
    # Check if certificate and key match
    cert_hash=$(openssl x509 -noout -modulus -in "$CERT_FILE" | openssl md5)
    key_hash=$(openssl rsa -noout -modulus -in "$KEY_FILE" | openssl md5)
    
    if [ "$cert_hash" = "$key_hash" ]; then
        log "✅ Certificate and private key match"
    else
        error "❌ Certificate and private key do not match"
        return 1
    fi
    
    # Show certificate information
    echo ""
    echo "=== Certificate Information ==="
    openssl x509 -in "$CERT_FILE" -text -noout | grep -E "Subject:|Issuer:|Not Before:|Not After:|DNS:"
    echo ""
}

# Check certificate expiration
check_expiration() {
    if [ ! -f "$CERT_FILE" ]; then
        error "SSL certificate file not found: $CERT_FILE"
        return 1
    fi
    
    log "Checking certificate expiration..."
    
    local expiry_date=$(openssl x509 -enddate -noout -in "$CERT_FILE" | cut -d= -f2)
    local expiry_epoch=$(date -d "$expiry_date" +%s 2>/dev/null || date -j -f "%b %d %T %Y %Z" "$expiry_date" +%s 2>/dev/null)
    local current_epoch=$(date +%s)
    local days_until_expiry=$(((expiry_epoch - current_epoch) / 86400))
    
    echo "Certificate expires: $expiry_date"
    
    if [ $days_until_expiry -lt 0 ]; then
        error "❌ Certificate has expired $((days_until_expiry * -1)) days ago!"
        return 1
    elif [ $days_until_expiry -lt 30 ]; then
        warn "⚠️ Certificate expires in $days_until_expiry days"
    else
        log "✅ Certificate is valid for $days_until_expiry more days"
    fi
}

# Renew certificate (currently only supports self-signed)
renew_certificate() {
    log "Renewing SSL certificate..."
    
    if [ ! -f "$CERT_FILE" ]; then
        warn "No existing certificate found. Generating new self-signed certificate..."
        generate_self_signed
        return 0
    fi
    
    # Get the subject from existing certificate
    local subject=$(openssl x509 -noout -subject -in "$CERT_FILE" | sed 's/subject=//')
    local cn=$(echo "$subject" | grep -o 'CN=[^,]*' | cut -d= -f2)
    
    # Backup existing certificate
    local backup_suffix=$(date +%Y%m%d_%H%M%S)
    cp "$CERT_FILE" "$CERT_FILE.backup_$backup_suffix"
    cp "$KEY_FILE" "$KEY_FILE.backup_$backup_suffix"
    
    log "Backed up existing certificate to: $CERT_FILE.backup_$backup_suffix"
    
    # Generate new certificate
    generate_self_signed "${cn:-localhost}"
    
    log "✅ Certificate renewed successfully"
}

# Remove SSL certificates
remove_certificates() {
    warn "This will remove all SSL certificates. Continue? (y/N)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        log "Certificate removal cancelled"
        return 0
    fi
    
    if [ -d "$SSL_DIR" ]; then
        rm -rf "$SSL_DIR"
        log "✅ SSL certificates removed"
    else
        log "No SSL certificates found to remove"
    fi
}

# Auto-setup based on environment variables
auto_setup() {
    log "Running automatic SSL setup..."
    
    # Check for existing certificates first
    if [ -f "$CERT_FILE" ] && [ -f "$KEY_FILE" ]; then
        log "Existing certificates found. Validating..."
        if validate_certificate; then
            log "✅ Existing certificates are valid"
            return 0
        else
            warn "Existing certificates are invalid. Generating new ones..."
        fi
    fi
    
    # Load environment variables if .env exists
    if [ -f ".env" ]; then
        source .env
    fi
    
    # Determine SSL setup method based on environment
    if [ -n "$DOMAIN" ] && [ -n "$CLOUDFLARE_API_TOKEN" ]; then
        log "Domain and Cloudflare API token found. Setting up Cloudflare SSL..."
        setup_cloudflare_ssl "$DOMAIN" "$CLOUDFLARE_API_TOKEN"
    elif [ -n "$DOMAIN" ]; then
        log "Domain found. Generating self-signed certificate for: $DOMAIN"
        generate_self_signed "$DOMAIN"
    else
        log "No domain specified. Generating self-signed certificate for localhost"
        generate_self_signed "localhost"
    fi
}

# Show SSL status
status() {
    log "SSL Certificate Status"
    echo ""
    
    if [ -f "$CERT_FILE" ] && [ -f "$KEY_FILE" ]; then
        echo -e "Certificate file: ${GREEN}✅ Found${NC} ($CERT_FILE)"
        echo -e "Private key file: ${GREEN}✅ Found${NC} ($KEY_FILE)"
        echo ""
        
        if validate_certificate; then
            check_expiration
        fi
    else
        echo -e "Certificate file: ${RED}❌ Not found${NC} ($CERT_FILE)"
        echo -e "Private key file: ${RED}❌ Not found${NC} ($KEY_FILE)"
        echo ""
        warn "No SSL certificates found. Run '$0 auto' to set up certificates."
    fi
}

# Show help
help() {
    echo "SSL certificate management script for nginx reverse proxy"
    echo ""
    echo "Usage: $0 [COMMAND] [OPTIONS]"
    echo ""
    echo "Commands:"
    echo "  auto                    Automatic SSL setup based on environment"
    echo "  self-signed [domain]    Generate self-signed certificate (default: localhost)"
    echo "  cloudflare <domain> <token>  Setup Cloudflare SSL (future implementation)"
    echo "  install <cert> <key>    Install existing certificate files"
    echo "  validate               Validate existing certificates"
    echo "  check                  Check certificate expiration"
    echo "  renew                  Renew existing certificate"
    echo "  remove                 Remove all SSL certificates"
    echo "  status                 Show SSL certificate status"
    echo "  help                   Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 auto"
    echo "  $0 self-signed api.example.com"
    echo "  $0 install /path/to/cert.pem /path/to/key.pem"
    echo "  $0 check"
    echo ""
    echo "Environment Variables:"
    echo "  DOMAIN                 Domain name for certificate"
    echo "  CLOUDFLARE_API_TOKEN   Cloudflare API token for SSL management"
}

# Main script logic
main() {
    case "${1:-help}" in
        auto)
            auto_setup
            ;;
        self-signed)
            generate_self_signed "$2"
            ;;
        cloudflare)
            setup_cloudflare_ssl "$2" "$3"
            ;;
        install)
            install_existing_cert "$2" "$3"
            ;;
        validate)
            validate_certificate
            ;;
        check)
            check_expiration
            ;;
        renew)
            renew_certificate
            ;;
        remove)
            remove_certificates
            ;;
        status)
            status
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
