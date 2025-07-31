#!/bin/bash

set -e

# Configuration
SERVICE_NAME="secrets-service"
AWS_REGION="${AWS_REGION:-us-east-1}"
POWER="${POWER:-nano}"  # nano, micro, small, medium, large, xlarge
SCALE="${SCALE:-1}"     # Number of container instances
GITHUB_REPO="${GITHUB_REPO:-https://github.com/$GITHUB_REPOSITORY.git}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
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

# Function to check if container service exists
check_service_exists() {
    aws lightsail get-container-services --service-name "$SERVICE_NAME" --region "$AWS_REGION" > /dev/null 2>&1
}

# Function to get service state
get_service_state() {
    aws lightsail get-container-services --service-name "$SERVICE_NAME" --region "$AWS_REGION" --query 'containerServices[0].state' --output text 2>/dev/null || echo "not-found"
}

# Function to get service URL
get_service_url() {
    aws lightsail get-container-services --service-name "$SERVICE_NAME" --region "$AWS_REGION" --query 'containerServices[0].url' --output text 2>/dev/null || echo ""
}

# Function to wait for service to be ready
wait_for_service() {
    print_status "Waiting for container service to be ready..."
    local max_attempts=60  # 10 minutes
    local attempt=0
    
    while [ $attempt -lt $max_attempts ]; do
        local state=$(get_service_state)
        case "$state" in
            "READY")
                print_status "Container service is ready!"
                return 0
                ;;
            "PENDING"|"RUNNING")
                print_info "Service state: $state (attempt $((attempt + 1))/$max_attempts)"
                sleep 10
                ;;
            "DISABLED"|"FAILED")
                print_error "Service is in failed state: $state"
                return 1
                ;;
            *)
                print_error "Service is in unexpected state: $state"
                return 1
                ;;
        esac
        attempt=$((attempt + 1))
    done
    
    print_error "Service failed to reach ready state after $((max_attempts * 10)) seconds"
    return 1
}

# Function to create container service
create_service() {
    print_status "Creating Lightsail container service: $SERVICE_NAME"
    
    aws lightsail create-container-service \
        --service-name "$SERVICE_NAME" \
        --power "$POWER" \
        --scale "$SCALE" \
        --region "$AWS_REGION" \
        --tags key=Project,value=secrets-service
    
    print_status "Container service creation initiated"
}

# Function to delete container service
delete_service() {
    print_warning "Deleting container service: $SERVICE_NAME"
    aws lightsail delete-container-service --service-name "$SERVICE_NAME" --region "$AWS_REGION"
    print_status "Container service deletion initiated"
}

# Function to create container configuration
create_container_config() {
    print_status "Creating container configuration..."
    
    # Create containers.json configuration
    cat > containers.json << EOF
{
  "secrets-service": {
    "image": ":secrets-service.latest",
    "environment": {
      "JWT_SECRET": "${JWT_SECRET}",
      "PORT": "8080",
      "ALLOWED_ORIGIN": "${ALLOWED_ORIGINS:-*}",
      "AUTH_USERNAME": "${AUTH_USERNAME}",
      "AUTH_PASSWORD": "${AUTH_PASSWORD}",
      "OPENAI_API_KEY": "${OPENAI_API_KEY:-}",
      "FIREBASE_API_KEY": "${FIREBASE_API_KEY:-}"
    },
    "ports": {
      "8080": "HTTP"
    }
  }
}
EOF

    # Create public-endpoint.json configuration
    cat > public-endpoint.json << EOF
{
  "containerName": "secrets-service",
  "containerPort": 8080,
  "healthCheck": {
    "healthyThreshold": 2,
    "unhealthyThreshold": 2,
    "timeoutSeconds": 5,
    "intervalSeconds": 30,
    "path": "/health",
    "successCodes": "200"
  }
}
EOF

    print_status "Container configuration created"
}

# Function to build and push container image
build_and_push_image() {
    print_status "Building and pushing container image..."
    
    # Get push commands from Lightsail
    local push_commands=$(aws lightsail get-container-image-push-commands \
        --service-name "$SERVICE_NAME" \
        --region "$AWS_REGION" \
        --query 'commands[*].command' \
        --output text)
    
    if [ -z "$push_commands" ]; then
        print_error "Failed to get push commands from Lightsail"
        return 1
    fi
    
    print_info "Executing Docker commands..."
    
    # Execute each push command
    echo "$push_commands" | while IFS= read -r command; do
        if [ -n "$command" ]; then
            print_info "Running: $command"
            eval "$command"
        fi
    done
    
    print_status "Container image built and pushed successfully"
}

# Function to deploy container
deploy_container() {
    print_status "Deploying container to service..."
    
    aws lightsail create-container-service-deployment \
        --service-name "$SERVICE_NAME" \
        --region "$AWS_REGION" \
        --containers file://containers.json \
        --public-endpoint file://public-endpoint.json
    
    print_status "Container deployment initiated"
    
    # Clean up config files
    rm -f containers.json public-endpoint.json
}

# Function to wait for application to be ready
wait_for_application() {
    local service_url="$1"
    local health_url="${service_url}/health"
    
    print_status "Waiting for application to be ready at $health_url"
    local max_attempts=30
    local attempt=0
    
    while [ $attempt -lt $max_attempts ]; do
        if curl -f -s "$health_url" >/dev/null 2>&1; then
            print_status "✅ Application is ready!"
            return 0
        fi
        
        if [ $attempt -eq $((max_attempts - 1)) ]; then
            print_error "❌ Application failed to respond after $((max_attempts * 10)) seconds"
            return 1
        fi
        
        print_info "⏳ Attempt $((attempt + 1))/$max_attempts - waiting 10 seconds..."
        sleep 10
        attempt=$((attempt + 1))
    done
}

# Function to run health check
run_health_check() {
    local service_url="$1"
    local health_url="${service_url}/health"
    
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
    echo "# Update service power"
    echo "aws lightsail update-container-service --service-name $SERVICE_NAME --power micro --region $AWS_REGION"
    echo
}

# Function to show service costs
show_costs() {
    local power="$1"
    local scale="$2"
    
    case "$power" in
        "nano")
            local monthly_cost=$(echo "$scale * 7" | bc)
            print_info "💰 Service cost: ~\$${monthly_cost}.00/month (${scale}x nano)"
            ;;
        "micro")
            local monthly_cost=$(echo "$scale * 10" | bc)
            print_info "💰 Service cost: ~\$${monthly_cost}.00/month (${scale}x micro)"
            ;;
        "small")
            local monthly_cost=$(echo "$scale * 20" | bc)
            print_info "💰 Service cost: ~\$${monthly_cost}.00/month (${scale}x small)"
            ;;
        *)
            print_info "💰 Service cost: Check Lightsail pricing for power $power x$scale"
            ;;
    esac
}

# Validation function
validate_requirements() {
    # Check required environment variables
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
    
    # Check if Docker is available
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed or not available"
        print_info "Please install Docker to build container images"
        exit 1
    fi
    
    # Check if AWS CLI is configured
    if ! aws sts get-caller-identity >/dev/null 2>&1; then
        print_error "AWS CLI is not configured or credentials are invalid"
        print_info "Please run 'aws configure' to set up your credentials"
        exit 1
    fi
    
    # Check if bc is available for cost calculation
    if ! command -v bc &> /dev/null; then
        print_warning "bc calculator not found - cost estimates will be skipped"
    fi
    
    print_status "Requirements validation passed"
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
                print_status "Service is available, updating deployment..."
                ;;
            "DISABLED"|"FAILED")
                print_warning "Service is in failed state, deleting and recreating..."
                delete_service
                sleep 30  # Wait for cleanup
                create_service
                ;;
            *)
                print_warning "Service in unknown state: $state, recreating..."
                delete_service
                sleep 30
                create_service
                ;;
        esac
    else
        print_status "Container service does not exist, creating new service..."
        create_service
    fi
    
    # Wait for service to be ready
    wait_for_service
    
    # Create container configuration
    create_container_config
    
    # Build and push container image
    build_and_push_image
    
    # Deploy container
    deploy_container
    
    # Wait for deployment to complete
    print_status "Waiting for deployment to complete..."
    sleep 30
    wait_for_service
    
    # Get service URL
    local service_url=$(get_service_url)
    if [ -z "$service_url" ]; then
        print_error "Failed to get service URL"
        exit 1
    fi
    
    print_status "Service URL: $service_url"
    
    # Wait for application to be ready
    wait_for_application "$service_url"
    
    # Run health check
    run_health_check "$service_url"
    
    # Display summary
    display_summary "$service_url"
    show_costs "$POWER" "$SCALE"
    
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
    echo "  ALLOWED_ORIGINS   - CORS allowed origins (default: *)"
    echo "  OPENAI_API_KEY    - OpenAI API key"
    echo "  FIREBASE_API_KEY  - Firebase API key"
    echo "  GITHUB_REPO       - GitHub repository URL"
    echo
    echo "Options:"
    echo "  -h, --help        Show this help message"
    echo "  --delete          Delete the container service"
    echo "  --logs            Show container logs"
    echo "  --status          Show service status"
    echo
    echo "Examples:"
    echo "  # Deploy with required variables"
    echo "  JWT_SECRET=secret AUTH_USERNAME=admin AUTH_PASSWORD=pass $0"
    echo
    echo "  # Deploy with micro power and 2 replicas"
    echo "  POWER=micro SCALE=2 JWT_SECRET=secret AUTH_USERNAME=admin AUTH_PASSWORD=pass $0"
    echo
    echo "  # Delete service"
    echo "  $0 --delete"
    echo
    echo "  # Show logs"
    echo "  $0 --logs"
}

# Parse command line arguments
case "${1:-}" in
    -h|--help)
        show_help
        exit 0
        ;;
    --delete)
        if check_service_exists; then
            delete_service
            print_status "Container service deletion initiated"
        else
            print_warning "Container service does not exist"
        fi
        exit 0
        ;;
    --logs)
        if check_service_exists; then
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
    --status)
        if check_service_exists; then
            print_status "Container service status:"
            aws lightsail get-container-services \
                --service-name "$SERVICE_NAME" \
                --region "$AWS_REGION" \
                --query 'containerServices[0].{State:state,Power:power,Scale:scale,URL:url}' \
                --output table
        else
            print_error "Container service does not exist"
            exit 1
        fi
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
