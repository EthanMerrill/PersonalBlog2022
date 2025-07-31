#!/bin/bash

# Lightsail Container Service Validation Script
# This script validates that a container service deployment is working correctly

set -e

# Configuration
SERVICE_NAME="${SERVICE_NAME:-secrets-service}"
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

# Function to check if service exists and get details
check_service() {
    print_info "Checking Lightsail container service..."
    
    if ! aws lightsail get-container-services --service-name "$SERVICE_NAME" --region "$AWS_REGION" >/dev/null 2>&1; then
        print_error "Container service '$SERVICE_NAME' not found in region '$AWS_REGION'"
        return 1
    fi
    
    local state=$(aws lightsail get-container-services --service-name "$SERVICE_NAME" --region "$AWS_REGION" --query 'containerServices[0].state' --output text)
    local url=$(aws lightsail get-container-services --service-name "$SERVICE_NAME" --region "$AWS_REGION" --query 'containerServices[0].url' --output text)
    local power=$(aws lightsail get-container-services --service-name "$SERVICE_NAME" --region "$AWS_REGION" --query 'containerServices[0].power' --output text)
    local scale=$(aws lightsail get-container-services --service-name "$SERVICE_NAME" --region "$AWS_REGION" --query 'containerServices[0].scale' --output text)
    
    if [ "$state" != "READY" ]; then
        print_error "Container service is not ready (state: $state)"
        return 1
    fi
    
    print_status "Container service is ready"
    print_info "  - State: $state"
    print_info "  - URL: $url"
    print_info "  - Power: $power"
    print_info "  - Scale: $scale"
    
    echo "$url"
}

# Function to check health endpoint
check_health() {
    local service_url="$1"
    local health_url="$service_url/health"
    
    print_info "Checking health endpoint: $health_url"
    
    local response=$(curl -s -w "%{http_code}" "$health_url" 2>/dev/null || echo "000")
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

# Function to check auth endpoint
check_auth_endpoint() {
    local service_url="$1"
    local auth_url="$service_url/auth"
    
    print_info "Checking auth endpoint: $auth_url"
    
    # Test with invalid credentials (should return 401)
    local response=$(curl -s -w "%{http_code}" -X POST \
        -H "Content-Type: application/json" \
        -d '{"username":"invalid","password":"invalid"}' \
        "$auth_url" 2>/dev/null || echo "000")
    
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

# Function to check container logs
check_container_logs() {
    print_info "Checking recent container logs..."
    
    local logs=$(aws lightsail get-container-log \
        --service-name "$SERVICE_NAME" \
        --container-name secrets-service \
        --region "$AWS_REGION" \
        --start-time "$(date -u -d '5 minutes ago' +%Y-%m-%dT%H:%M:%S)" \
        --query 'logEvents[-5:].message' \
        --output text 2>/dev/null || echo "")
    
    if [ -n "$logs" ]; then
        print_status "Recent container logs available"
        print_info "Last 5 log entries:"
        echo "$logs" | while IFS= read -r line; do
            echo "    $line"
        done
    else
        print_warning "No recent logs found or unable to retrieve logs"
    fi
}

# Function to show service costs
show_costs() {
    local power="$1"
    local scale="$2"
    
    case "$power" in
        "nano")
            local monthly_cost=$(echo "$scale * 7" | bc 2>/dev/null || echo "$((scale * 7))")
            print_info "💰 Service cost: ~\$${monthly_cost}.00/month (${scale}x nano)"
            ;;
        "micro")
            local monthly_cost=$(echo "$scale * 10" | bc 2>/dev/null || echo "$((scale * 10))")
            print_info "💰 Service cost: ~\$${monthly_cost}.00/month (${scale}x micro)"
            ;;
        "small")
            local monthly_cost=$(echo "$scale * 20" | bc 2>/dev/null || echo "$((scale * 20))")
            print_info "💰 Service cost: ~\$${monthly_cost}.00/month (${scale}x small)"
            ;;
        *)
            print_info "💰 Service cost: Check Lightsail pricing for power $power x$scale"
            ;;
    esac
}

# Function to display management commands
show_management_commands() {
    echo
    print_info "🛠️  Management Commands:"
    echo "# View service details"
    echo "aws lightsail get-container-services --service-name $SERVICE_NAME --region $AWS_REGION"
    echo
    echo "# View container logs"
    echo "aws lightsail get-container-log --service-name $SERVICE_NAME --container-name secrets-service --region $AWS_REGION"
    echo
    echo "# Scale horizontally (more replicas)"
    echo "aws lightsail update-container-service --service-name $SERVICE_NAME --scale 2 --region $AWS_REGION"
    echo
    echo "# Scale vertically (more power)"
    echo "aws lightsail update-container-service --service-name $SERVICE_NAME --power micro --region $AWS_REGION"
    echo
    echo "# View service metrics"
    echo "aws lightsail get-container-service-metric-data --service-name $SERVICE_NAME --metric-name CPUUtilization --region $AWS_REGION"
}

# Main validation function
main() {
    echo -e "${BLUE}===============================================${NC}"
    echo -e "${BLUE}   Lightsail Container Service Validation${NC}"
    echo -e "${BLUE}===============================================${NC}"
    echo
    
    print_info "Validating deployment for service: $SERVICE_NAME"
    print_info "Region: $AWS_REGION"
    echo
    
    # Check if AWS CLI is configured
    if ! aws sts get-caller-identity >/dev/null 2>&1; then
        print_error "AWS CLI is not configured or credentials are invalid"
        exit 1
    fi
    
    local service_url
    local power
    local scale
    
    # Check service
    if service_url=$(check_service); then
        power=$(aws lightsail get-container-services --service-name "$SERVICE_NAME" --region "$AWS_REGION" --query 'containerServices[0].power' --output text)
        scale=$(aws lightsail get-container-services --service-name "$SERVICE_NAME" --region "$AWS_REGION" --query 'containerServices[0].scale' --output text)
    else
        exit 1
    fi
    
    echo
    
    # Application health tests
    if ! check_health "$service_url"; then
        print_error "Application health check failed"
        exit 1
    fi
    
    echo
    
    # Auth endpoint test
    check_auth_endpoint "$service_url"
    
    echo
    
    # Container logs check
    check_container_logs
    
    echo
    print_status "🎉 Validation completed successfully!"
    echo
    print_info "🔗 Service URL: $service_url"
    print_info "🏥 Health Check: $service_url/health"
    
    show_costs "$power" "$scale"
    show_management_commands
}

# Show help
show_help() {
    echo "Usage: $0 [OPTIONS]"
    echo
    echo "Validate AWS Lightsail Container Service deployment"
    echo
    echo "Environment Variables:"
    echo "  SERVICE_NAME      - Container service name (default: secrets-service)"
    echo "  AWS_REGION        - AWS region (default: us-east-1)"
    echo
    echo "Options:"
    echo "  -h, --help        Show this help message"
    echo "  --logs            Show recent container logs"
    echo "  --metrics         Show service metrics"
    echo
    echo "Examples:"
    echo "  $0                # Validate default service"
    echo "  SERVICE_NAME=my-service $0  # Validate specific service"
    echo "  $0 --logs         # Show recent logs"
}

# Parse command line arguments
case "${1:-}" in
    -h|--help)
        show_help
        exit 0
        ;;
    --logs)
        if aws lightsail get-container-services --service-name "$SERVICE_NAME" --region "$AWS_REGION" >/dev/null 2>&1; then
            print_status "Fetching container logs..."
            aws lightsail get-container-log \
                --service-name "$SERVICE_NAME" \
                --container-name secrets-service \
                --region "$AWS_REGION" \
                --query 'logEvents[*].[timestamp,message]' \
                --output table
        else
            print_error "Container service does not exist"
            exit 1
        fi
        exit 0
        ;;
    --metrics)
        if aws lightsail get-container-services --service-name "$SERVICE_NAME" --region "$AWS_REGION" >/dev/null 2>&1; then
            print_status "Fetching service metrics..."
            aws lightsail get-container-service-metric-data \
                --service-name "$SERVICE_NAME" \
                --metric-name CPUUtilization \
                --start-time "$(date -u -d '1 hour ago' +%Y-%m-%dT%H:%M:%S)" \
                --end-time "$(date -u +%Y-%m-%dT%H:%M:%S)" \
                --period 300 \
                --statistics Average \
                --region "$AWS_REGION" \
                --query 'metricData[*].[timestamp,average]' \
                --output table
        else
            print_error "Container service does not exist"
            exit 1
        fi
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
