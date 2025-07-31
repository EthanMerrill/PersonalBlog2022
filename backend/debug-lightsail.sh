#!/bin/bash

# Debug script for Lightsail Container Service issues
# Run this to get detailed information about your deployment

set -e

SERVICE_NAME="secrets-service"
AWS_REGION="${AWS_REGION:-us-east-1}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_info() {
    echo -e "${BLUE}[DEBUG]${NC} $1"
}

echo "🔍 Debugging Lightsail Container Service: $SERVICE_NAME"
echo "================================================================"

# Check service status
print_status "Getting service status..."
aws lightsail get-container-services \
    --service-name "$SERVICE_NAME" \
    --region "$AWS_REGION" \
    --no-cli-pager

echo ""

# Get container logs
print_status "Getting recent container logs..."
aws lightsail get-container-log \
    --service-name "$SERVICE_NAME" \
    --container-name secrets-service \
    --region "$AWS_REGION" \
    --start-time "$(date -u -d '30 minutes ago' +%Y-%m-%dT%H:%M:%S)" \
    --no-cli-pager

echo ""

# Check if service URL is accessible
print_status "Testing service accessibility..."
SERVICE_URL=$(aws lightsail get-container-services \
    --service-name "$SERVICE_NAME" \
    --region "$AWS_REGION" \
    --query 'containerServices[0].url' \
    --output text 2>/dev/null || echo "")

if [ -n "$SERVICE_URL" ] && [ "$SERVICE_URL" != "None" ] && [ "$SERVICE_URL" != "null" ]; then
    print_info "Service URL: $SERVICE_URL"
    
    print_info "Testing health endpoint..."
    if curl -f -s "$SERVICE_URL/health" 2>/dev/null; then
        print_status "✅ Health endpoint is accessible"
        curl -s "$SERVICE_URL/health" | jq . 2>/dev/null || curl -s "$SERVICE_URL/health"
    else
        print_warning "❌ Health endpoint is not accessible"
        print_info "Trying basic connectivity..."
        curl -I -s "$SERVICE_URL" || print_warning "Service URL not reachable"
    fi
else
    print_error "No service URL available"
fi

echo ""
print_status "Debug complete!"
