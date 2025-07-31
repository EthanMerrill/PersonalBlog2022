#!/bin/bash

# Lightsail Deployment Validation Script
# This script validates that a Lightsail deployment is working correctly

set -e

# Configuration
INSTANCE_NAME="${INSTANCE_NAME:-secrets-service-production}"
AWS_REGION="${AWS_REGION:-us-east-1}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}[✅]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[⚠️]${NC} $1"
}

print_error() {
    echo -e "${RED}[❌]${NC} $1"
}

print_info() {
    echo -e "${BLUE}[ℹ️]${NC} $1"
}

# Function to check if instance exists and get details
check_instance() {
    print_info "Checking Lightsail instance..."
    
    if ! aws lightsail get-instance --instance-name "$INSTANCE_NAME" --region "$AWS_REGION" >/dev/null 2>&1; then
        print_error "Instance '$INSTANCE_NAME' not found in region '$AWS_REGION'"
        return 1
    fi
    
    local state=$(aws lightsail get-instance --instance-name "$INSTANCE_NAME" --region "$AWS_REGION" --query 'instance.state.name' --output text)
    local ip=$(aws lightsail get-instance --instance-name "$INSTANCE_NAME" --region "$AWS_REGION" --query 'instance.publicIpAddress' --output text)
    local bundle=$(aws lightsail get-instance --instance-name "$INSTANCE_NAME" --region "$AWS_REGION" --query 'instance.bundleId' --output text)
    
    if [ "$state" != "running" ]; then
        print_error "Instance is not running (state: $state)"
        return 1
    fi
    
    print_status "Instance is running"
    print_info "  - State: $state"
    print_info "  - IP: $ip"
    print_info "  - Bundle: $bundle"
    
    echo "$ip"
}

# Function to check network connectivity
check_connectivity() {
    local ip="$1"
    print_info "Checking network connectivity to $ip..."
    
    # Test SSH port
    if timeout 5 bash -c "</dev/tcp/$ip/22" 2>/dev/null; then
        print_status "SSH port (22) is accessible"
    else
        print_error "SSH port (22) is not accessible"
        return 1
    fi
    
    # Test application port
    if timeout 5 bash -c "</dev/tcp/$ip/8080" 2>/dev/null; then
        print_status "Application port (8080) is accessible"
    else
        print_error "Application port (8080) is not accessible"
        return 1
    fi
}

# Function to check health endpoint
check_health() {
    local ip="$1"
    local url="http://$ip:8080/health"
    
    print_info "Checking health endpoint: $url"
    
    local response=$(curl -s -w "%{http_code}" "$url" 2>/dev/null || echo "000")
    local http_code="${response: -3}"
    local body="${response%???}"
    
    if [ "$http_code" = "200" ]; then
        print_status "Health check passed (HTTP $http_code)"
        if echo "$body" | grep -q "status"; then
            print_status "Health response contains expected fields"
            print_info "  Response: $body"
        else
            print_warning "Health response format unexpected"
            print_info "  Response: $body"
        fi
    else
        print_error "Health check failed (HTTP $http_code)"
        print_info "  Response: $body"
        return 1
    fi
}

# Function to check application endpoints (requires auth)
check_auth_endpoint() {
    local ip="$1"
    local url="http://$ip:8080/auth"
    
    print_info "Checking auth endpoint: $url"
    
    # Test with invalid credentials (should return 401)
    local response=$(curl -s -w "%{http_code}" -X POST \
        -H "Content-Type: application/json" \
        -d '{"username":"invalid","password":"invalid"}' \
        "$url" 2>/dev/null || echo "000")
    
    local http_code="${response: -3}"
    
    if [ "$http_code" = "401" ]; then
        print_status "Auth endpoint correctly rejects invalid credentials"
    elif [ "$http_code" = "200" ]; then
        print_warning "Auth endpoint exists but accepts invalid credentials"
    else
        print_error "Auth endpoint error (HTTP $http_code)"
        return 1
    fi
}

# Function to validate deployment files on instance
validate_deployment() {
    local ip="$1"
    
    if [ -z "$KEY_PAIR_NAME" ]; then
        print_warning "KEY_PAIR_NAME not set, skipping deployment validation"
        return 0
    fi
    
    if [ ! -f "$KEY_PAIR_NAME.pem" ]; then
        print_warning "Key file $KEY_PAIR_NAME.pem not found, skipping deployment validation"
        return 0
    fi
    
    print_info "Validating deployment on instance..."
    
    # Check if application directory exists and has correct structure
    local check_result=$(ssh -i "$KEY_PAIR_NAME.pem" -o StrictHostKeyChecking=no -o ConnectTimeout=10 \
        "ec2-user@$ip" \
        'if [ -d "/opt/secrets-service" ]; then echo "dir_exists"; fi' 2>/dev/null || echo "ssh_failed")
    
    if [ "$check_result" = "dir_exists" ]; then
        print_status "Application directory exists on instance"
        
        # Check if Docker containers are running
        local docker_status=$(ssh -i "$KEY_PAIR_NAME.pem" -o StrictHostKeyChecking=no \
            "ec2-user@$ip" \
            'cd /opt/secrets-service/backend && docker-compose ps --services --filter status=running' 2>/dev/null || echo "")
        
        if [ -n "$docker_status" ]; then
            print_status "Docker containers are running"
            print_info "  Running services: $docker_status"
        else
            print_error "No Docker containers running"
            return 1
        fi
        
    elif [ "$check_result" = "ssh_failed" ]; then
        print_warning "Could not SSH to instance for validation"
    else
        print_error "Application directory not found on instance"
        return 1
    fi
}

# Function to show instance costs
show_costs() {
    local bundle="$1"
    
    case "$bundle" in
        "nano_2_0")
            print_info "💰 Instance cost: ~$3.50/month (nano)"
            ;;
        "micro_2_0")
            print_info "💰 Instance cost: ~$5.00/month (micro)"
            ;;
        "small_2_0")
            print_info "💰 Instance cost: ~$10.00/month (small)"
            ;;
        *)
            print_info "💰 Instance cost: Check Lightsail pricing for bundle $bundle"
            ;;
    esac
}

# Function to display management commands
show_management_commands() {
    local ip="$1"
    
    echo
    print_info "🛠️  Management Commands:"
    echo "# SSH into the instance"
    echo "ssh -i your-key.pem ec2-user@$ip"
    echo
    echo "# Check application status"
    echo "sudo /opt/secrets-service/status.sh"
    echo
    echo "# View logs"
    echo "sudo /opt/secrets-service/logs.sh"
    echo
    echo "# Restart application"
    echo "sudo /opt/secrets-service/restart.sh"
}

# Main validation function
main() {
    echo -e "${BLUE}==========================================${NC}"
    echo -e "${BLUE}   Lightsail Deployment Validation${NC}"
    echo -e "${BLUE}==========================================${NC}"
    echo
    
    print_info "Validating deployment for instance: $INSTANCE_NAME"
    print_info "Region: $AWS_REGION"
    echo
    
    # Check if AWS CLI is configured
    if ! aws sts get-caller-identity >/dev/null 2>&1; then
        print_error "AWS CLI is not configured or credentials are invalid"
        exit 1
    fi
    
    local ip
    local bundle
    
    # Check instance
    if ip=$(check_instance); then
        bundle=$(aws lightsail get-instance --instance-name "$INSTANCE_NAME" --region "$AWS_REGION" --query 'instance.bundleId' --output text)
    else
        exit 1
    fi
    
    echo
    
    # Network connectivity tests
    if ! check_connectivity "$ip"; then
        print_error "Network connectivity issues detected"
        exit 1
    fi
    
    echo
    
    # Application health tests
    if ! check_health "$ip"; then
        print_error "Application health check failed"
        exit 1
    fi
    
    echo
    
    # Auth endpoint test
    check_auth_endpoint "$ip"
    
    echo
    
    # Deployment validation (if possible)
    validate_deployment "$ip"
    
    echo
    print_status "🎉 Validation completed successfully!"
    echo
    print_info "🔗 Application URL: http://$ip:8080"
    print_info "🏥 Health Check: http://$ip:8080/health"
    
    show_costs "$bundle"
    show_management_commands "$ip"
}

# Show help
show_help() {
    echo "Usage: $0 [OPTIONS]"
    echo
    echo "Validate AWS Lightsail deployment"
    echo
    echo "Environment Variables:"
    echo "  INSTANCE_NAME     - Lightsail instance name (default: secrets-service-production)"
    echo "  AWS_REGION        - AWS region (default: us-east-1)"
    echo "  KEY_PAIR_NAME     - Key pair name for SSH validation (optional)"
    echo
    echo "Options:"
    echo "  -h, --help        Show this help message"
    echo
    echo "Examples:"
    echo "  $0                # Validate default instance"
    echo "  INSTANCE_NAME=my-instance $0  # Validate specific instance"
}

# Parse command line arguments
case "${1:-}" in
    -h|--help)
        show_help
        exit 0
        ;;
    "")
        main
        ;;
    *)
        print_error "Unknown option: $1"
        show_help
        exit 1
        ;;
esac
