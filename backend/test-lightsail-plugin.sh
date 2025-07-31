#!/bin/bash

# Test script to verify Lightsail plugin installation
# This script helps debug the lightsailctl plugin setup

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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
    echo -e "${BLUE}[INFO]${NC} $1"
}

echo "🔍 Testing Lightsail Plugin Setup"
echo "=================================="

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    print_error "AWS CLI is not installed"
    exit 1
fi

print_status "✅ AWS CLI found: $(aws --version)"

# Check AWS credentials
if ! aws sts get-caller-identity >/dev/null 2>&1; then
    print_error "AWS credentials not configured or invalid"
    exit 1
fi

print_status "✅ AWS credentials configured"

# Check if lightsailctl is in PATH
if command -v lightsailctl &> /dev/null; then
    print_status "✅ lightsailctl found at: $(which lightsailctl)"
else
    print_warning "⚠️ lightsailctl not found in PATH"
fi

# Test basic Lightsail commands
print_info "Testing basic Lightsail commands..."

if aws lightsail get-regions --no-cli-pager >/dev/null 2>&1; then
    print_status "✅ Basic Lightsail commands work"
else
    print_error "❌ Basic Lightsail commands failed"
    exit 1
fi

# Test if push-container-image command is available
print_info "Testing push-container-image command availability..."

if aws lightsail push-container-image help >/dev/null 2>&1; then
    print_status "✅ push-container-image command is available"
else
    print_error "❌ push-container-image command failed"
    print_info "You may need to install the lightsailctl plugin:"
    print_info "curl -L -o lightsailctl https://s3.us-west-2.amazonaws.com/lightsailctl/latest/linux-amd64/lightsailctl"
    print_info "chmod +x lightsailctl"
    print_info "sudo mv lightsailctl /usr/local/bin/"
    exit 1
fi

# Check for existing container services
print_info "Checking for existing container services..."
SERVICES=$(aws lightsail get-container-services --no-cli-pager --output table 2>/dev/null || echo "No services found")
echo "$SERVICES"

print_status "🎉 All tests passed! Lightsail plugin is properly configured."
