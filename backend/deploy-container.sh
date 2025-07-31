#!/bin/bash

set -e

# Configuration
SERVICE_NAME="secrets-service"
AWS_REGION="${AWS_REGION:-us-east-1}"
POWER="${POWER:-nano}"
SCALE="${SCALE:-1}"

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

# Validation function
validate_requirements() {
    if [ -z "$JWT_SECRET" ]; then
        print_error "JWT_SECRET environment variable is required"
        exit 1
    fi
    
    if [ -z "$AUTH_USERNAME" ]; then
        print_error "AUTH_USERNAME environment variable is required"
        exit 1
    fi
    
    if [ -z "$AUTH_PASSWORD" ]; then
        print_error "AUTH_PASSWORD environment variable is required"
        exit 1
    fi
    
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed or not available"
        exit 1
    fi
    
    if ! aws sts get-caller-identity >/dev/null 2>&1; then
        print_error "AWS CLI is not configured or credentials are invalid"
        exit 1
    fi
    
    # Check if lightsailctl plugin is available
    if ! command -v lightsailctl &> /dev/null; then
        print_warning "lightsailctl plugin not found in PATH."
        print_info "AWS CLI will attempt to use it automatically for push-container-image commands."
        print_info "If deployment fails, see: https://lightsail.aws.amazon.com/ls/docs/en_us/articles/amazon-lightsail-install-software"
    else
        print_status "lightsailctl plugin found at $(which lightsailctl)"
    fi
    
    print_status "Requirements validation passed"
}

# Function to check if service exists
check_service_exists() {
    aws lightsail get-container-services --service-name "$SERVICE_NAME" --region "$AWS_REGION" >/dev/null 2>&1
}

# Function to get service state
get_service_state() {
    aws lightsail get-container-services --service-name "$SERVICE_NAME" --region "$AWS_REGION" --query 'containerServices[0].state' --output text 2>/dev/null || echo "not-found"
}

# Function to create container service
create_service() {
    print_status "Creating Lightsail container service: $SERVICE_NAME"
    
    aws lightsail create-container-service \
        --service-name "$SERVICE_NAME" \
        --power "$POWER" \
        --scale "$SCALE" \
        --region "$AWS_REGION" \
        --tags key=Project,value=secrets-service \
        --no-cli-pager >/dev/null || true
    
    print_status "Container service creation initiated"
}

# Function to wait for service to be ready
wait_for_service() {
    print_status "Waiting for container service health check to respond..."
    local service_url
    service_url=$(aws lightsail get-container-services --service-name "$SERVICE_NAME" --region "$AWS_REGION" --query 'containerServices[0].url' --output text 2>/dev/null || echo "")

    if [ -z "$service_url" ] || [ "$service_url" = "None" ] || [ "$service_url" = "null" ]; then
        print_error "Failed to get service URL"
        return 1
    fi

    local health_url="$service_url/health"
    local max_attempts=30
    local attempt=0

    while [ $attempt -lt $max_attempts ]; do
        if curl -f -s "$health_url" >/dev/null 2>&1; then
            print_status "✅ Health check passed! Service is ready."
            return 0
        fi

        print_info "⏳ Attempt $((attempt + 1))/$max_attempts - waiting 10 seconds..."
        sleep 10
        attempt=$((attempt + 1))
    done

    print_error "❌ Health check failed to respond after $((max_attempts * 10)) seconds"
    return 1
}

# Function to build and push image
build_and_push_image() {
    print_status "Building Docker image..."
    docker build -t secrets-service:latest .
    
    print_status "Pushing image to Lightsail container registry..."
    print_info "Using service: $SERVICE_NAME in region: $AWS_REGION"
    
    # Ensure lightsailctl is available for AWS CLI
    if command -v lightsailctl &> /dev/null; then
        print_info "✅ lightsailctl plugin found at $(which lightsailctl)"
    else
        print_warning "⚠️ lightsailctl not found in PATH, AWS CLI will try to locate it automatically"
    fi
    
    aws lightsail push-container-image \
        --service-name "$SERVICE_NAME" \
        --label "secrets-service" \
        --image "secrets-service:latest" \
        --region "$AWS_REGION" \
        --no-cli-pager
    
    print_status "Container image pushed successfully"
}

# Function to create container configuration
create_container_config() {
    print_status "Creating container configuration..."
    
    # Create containers.json
    cat > /tmp/containers.json << EOF
{
  "secrets-service": {
    "image": ":$SERVICE_NAME.secrets-service.latest",
    "environment": {
      "JWT_SECRET": "$JWT_SECRET",
      "PORT": "8080",
      "AUTH_USERNAME": "$AUTH_USERNAME",
      "AUTH_PASSWORD": "$AUTH_PASSWORD"
    },
    "ports": {
      "8080": "HTTP"
    }
  }
}
EOF

    # Add optional environment variables
    if [ -n "$ALLOWED_ORIGINS" ]; then
        # Use Python to modify JSON (more reliable than sed)
        python3 -c "
import json
with open('/tmp/containers.json', 'r') as f:
    data = json.load(f)
data['secrets-service']['environment']['ALLOWED_ORIGINS'] = '$ALLOWED_ORIGINS'
with open('/tmp/containers.json', 'w') as f:
    json.dump(data, f, indent=2)
" 2>/dev/null || true
    fi
    
    if [ -n "$OPENAI_API_KEY" ]; then
        python3 -c "
import json
with open('/tmp/containers.json', 'r') as f:
    data = json.load(f)
data['secrets-service']['environment']['OPENAI_API_KEY'] = '$OPENAI_API_KEY'
with open('/tmp/containers.json', 'w') as f:
    json.dump(data, f, indent=2)
" 2>/dev/null || true
    fi
    
    if [ -n "$FIREBASE_API_KEY" ]; then
        python3 -c "
import json
with open('/tmp/containers.json', 'r') as f:
    data = json.load(f)
data['secrets-service']['environment']['FIREBASE_API_KEY'] = '$FIREBASE_API_KEY'
with open('/tmp/containers.json', 'w') as f:
    json.dump(data, f, indent=2)
" 2>/dev/null || true
    fi

    # Create public-endpoint.json
    cat > /tmp/public-endpoint.json << EOF
{
  "containerName": "secrets-service",
  "containerPort": 8080,
  "healthCheck": {
    "healthyThreshold": 2,
    "unhealthyThreshold": 3,
    "timeoutSeconds": 10,
    "intervalSeconds": 45,
    "path": "/health",
    "successCodes": "200"
  }
}
EOF
    
    print_status "Container configuration created"
    
    # Debug: Show the configuration files
    print_info "Container configuration:"
    cat /tmp/containers.json | python3 -m json.tool 2>/dev/null || cat /tmp/containers.json
    
    print_info "Public endpoint configuration:"
    cat /tmp/public-endpoint.json | python3 -m json.tool 2>/dev/null || cat /tmp/public-endpoint.json
}

# Function to deploy container
deploy_container() {
    print_status "Deploying container to service..."
    
    aws lightsail create-container-service-deployment \
        --service-name "$SERVICE_NAME" \
        --region "$AWS_REGION" \
        --containers file:///tmp/containers.json \
        --public-endpoint file:///tmp/public-endpoint.json \
        --no-cli-pager
    
    print_status "Container deployment initiated"
}

# Function to run health check
run_health_check() {
    local service_url="$1"
    local health_url="${SERVICE_URL}health"
    
    print_status "Running health check..."
    local response=$(curl -s "$health_url" 2>/dev/null || echo "")
    
    if [ -n "$response" ] && echo "$response" | grep -q "status"; then
        print_status "✅ Health check passed!"
        echo "Health response: $response"
        return 0
    else
        print_error "❌ Health check failed - unexpected response"
        echo "Response: $response"
        return 1
    fi
}

# Function to display deployment summary
display_summary() {
    local service_url="$1"
    
    echo
    echo -e "${GREEN}🚀 Deployment Successful!${NC}"
    echo
    echo -e "${BLUE}📋 Deployment Details${NC}"
    echo "- Service Name: $SERVICE_NAME"
    echo "- Region: $AWS_REGION"
    echo "- Power: $POWER"
    echo "- Scale: $SCALE"
    echo
    echo -e "${BLUE}🔗 Application URLs${NC}"
    echo "- Application: $service_url"
    echo "- Health Check: $service_url/health"
    echo
    echo -e "${BLUE}🛠 Management Commands${NC}"
    echo "# View service details"
    echo "aws lightsail get-container-services --service-name $SERVICE_NAME --region $AWS_REGION"
    echo
    echo "# View container logs"
    echo "aws lightsail get-container-log --service-name $SERVICE_NAME --container-name secrets-service --region $AWS_REGION"
    echo
    echo "# Scale service"
    echo "aws lightsail update-container-service --service-name $SERVICE_NAME --scale 2 --region $AWS_REGION"
    echo
}

# Main deployment logic  
main() {
    print_status "Starting Lightsail Container Service deployment..."
    
    # Validate requirements
    validate_requirements
    
    # Check if service exists
    if check_service_exists; then
        local state=$(get_service_state)
        print_status "Container service exists with state: $state"
        
        case "$state" in
            "READY"|"RUNNING"|"PENDING")
                print_status "Service is available, proceeding with deployment..."
                ;;
            "DISABLED"|"FAILED")
                print_warning "Service is in failed state, it may need manual intervention"
                ;;
            *)
                print_info "Service in state: $state"
                ;;
        esac
    else
        print_status "Container service does not exist, creating new service..."
        create_service
        sleep 30  # Give service time to initialize
    fi
    
    # Wait for service to be ready
    wait_for_service
    
    # Build and push container image
    build_and_push_image
    
    # Create container configuration
    create_container_config
    
    # Deploy container
    deploy_container
    
    # Wait for deployment to complete
    print_status "Waiting for deployment to complete..."
    sleep 60  # Give deployment time to start
    
    # Wait for service to be ready again after deployment
    if wait_for_service; then
        print_status "Service is ready after deployment"
    else
        print_error "Service failed to become ready after deployment"
        print_info "Attempting to get service URL anyway for debugging..."
    fi
    
    # Get service URL
    local service_url
    service_url=$(aws lightsail get-container-services --service-name "$SERVICE_NAME" --region "$AWS_REGION" --query 'containerServices[0].url' --output text 2>/dev/null || echo "")
    
    if [ -z "$service_url" ] || [ "$service_url" = "None" ] || [ "$service_url" = "null" ]; then
        print_error "Failed to get service URL"
        
        # Show full service details for debugging
        print_info "Full service details:"
        aws lightsail get-container-services --service-name "$SERVICE_NAME" --region "$AWS_REGION" --no-cli-pager 2>/dev/null || true
        
        exit 1
    fi
    
    print_status "Service URL: $service_url"
    
    # Even if service isn't "READY", try to test the application
    print_info "Attempting to connect to application (may fail if container isn't healthy)..."
    
    # Wait for application to be ready (with more lenient timing)
    if wait_for_application "$service_url"; then
        # Run health check
        run_health_check "$service_url"
        
        # Display summary
        display_summary "$service_url"
    else
        print_warning "Application health check failed, but deployment may still be in progress"
        print_info "Service URL: $service_url"
        print_info "Try accessing $service_url/health manually in a few minutes"
        
        # Show recent logs for debugging
        print_info "Recent container logs for debugging:"
        aws lightsail get-container-log \
            --service-name "$SERVICE_NAME" \
            --container-name secrets-service \
            --region "$AWS_REGION" \
            --start-time "$(date -u -d '10 minutes ago' +%Y-%m-%dT%H:%M:%S)" \
            --no-cli-pager 2>/dev/null || echo "No logs available"
    fi
    
    # Cleanup temp files
    rm -f /tmp/containers.json /tmp/public-endpoint.json
    
    print_status "Deployment completed successfully!"
}

# Show help
show_help() {
    echo "Usage: $0 [OPTIONS]"
    echo
    echo "Deploy Secrets Service to AWS Lightsail Container Service"
    echo
    echo "Required Environment Variables:"
    echo "  JWT_SECRET        - JWT secret for authentication"
    echo "  AUTH_USERNAME     - Basic auth username"
    echo "  AUTH_PASSWORD     - Basic auth password"
    echo
    echo "Optional Environment Variables:"
    echo "  AWS_REGION        - AWS region (default: us-east-1)"
    echo "  POWER             - Container power: nano, micro, small (default: nano)"
    echo "  SCALE             - Number of containers (default: 1)"
    echo "  ALLOWED_ORIGINS   - CORS allowed origins"
    echo "  OPENAI_API_KEY    - OpenAI API key"
    echo "  FIREBASE_API_KEY  - Firebase API key"
    echo
    echo "Options:"
    echo "  -h, --help        Show this help message"
    echo
    echo "Examples:"
    echo "  JWT_SECRET=secret AUTH_USERNAME=admin AUTH_PASSWORD=pass $0"
}

# Parse command line arguments
case "${1:-}" in
    -h|--help)
        show_help
        exit 0
        ;;
    "")
        main "$@"
        ;;
    *)
        print_error "Unknown option: $1"
        show_help
        exit 1
        ;;
esac
