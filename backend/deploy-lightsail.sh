#!/bin/bash

set -e

# Configuration
INSTANCE_NAME="secrets-service-instance"
AWS_REGION="${AWS_REGION:-us-east-1}"
BLUEPRINT_ID="amazon_linux_2"
BUNDLE_ID="${BUNDLE_ID:-nano_2_0}"  # $3.50/month, can be upgraded to micro_2_0 ($5/month) if needed
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

# Function to check if instance exists
check_instance_exists() {
    aws lightsail get-instance --instance-name "$INSTANCE_NAME" --region "$AWS_REGION" > /dev/null 2>&1
}

# Function to get instance state
get_instance_state() {
    aws lightsail get-instance --instance-name "$INSTANCE_NAME" --region "$AWS_REGION" --query 'instance.state.name' --output text 2>/dev/null || echo "not-found"
}

# Function to get instance public IP
get_instance_ip() {
    aws lightsail get-instance --instance-name "$INSTANCE_NAME" --region "$AWS_REGION" --query 'instance.publicIpAddress' --output text 2>/dev/null || echo ""
}

# Function to wait for instance to be running
wait_for_instance() {
    print_status "Waiting for instance to be running..."
    local max_attempts=30
    local attempt=0
    
    while [ $attempt -lt $max_attempts ]; do
        local state=$(get_instance_state)
        case "$state" in
            "running")
                print_status "Instance is running!"
                return 0
                ;;
            "pending"|"starting")
                print_info "Instance state: $state (attempt $((attempt + 1))/$max_attempts)"
                sleep 10
                ;;
            "stopped"|"stopping")
                print_status "Starting stopped instance..."
                aws lightsail start-instance --instance-name "$INSTANCE_NAME" --region "$AWS_REGION"
                sleep 10
                ;;
            *)
                print_error "Instance is in unexpected state: $state"
                return 1
                ;;
        esac
        attempt=$((attempt + 1))
    done
    
    print_error "Instance failed to reach running state after $((max_attempts * 10)) seconds"
    return 1
}

# Function to create the startup script
create_startup_script() {
    cat > startup-script.sh << 'EOF'
#!/bin/bash
set -e

# Update system
sudo yum update -y

# Install Docker
sudo yum install -y docker git
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -a -G docker ec2-user

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

# Create application directory
sudo mkdir -p /opt/secrets-service
sudo chown ec2-user:ec2-user /opt/secrets-service
cd /opt/secrets-service

# Clone repository (will be updated by deployment script)
echo "Repository will be cloned during deployment..."
EOF
}

# Function to create environment file on instance
create_env_file() {
    local instance_ip="$1"
    
    print_status "Creating environment file on instance..."
    
    # Create temporary env file locally
    cat > temp_env_file << EOF
VAULT_ADDR=http://localhost:8200
VAULT_TOKEN=dev-token
JWT_SECRET=${JWT_SECRET}
PORT=8080
ALLOWED_ORIGIN=${ALLOWED_ORIGINS:-*}
AUTH_USERNAME=${AUTH_USERNAME}
AUTH_PASSWORD=${AUTH_PASSWORD}
OPENAI_API_KEY=${OPENAI_API_KEY:-}
FIREBASE_API_KEY=${FIREBASE_API_KEY:-}
EOF

    # Copy env file to instance
    scp -i "$KEY_PAIR_NAME.pem" -o StrictHostKeyChecking=no temp_env_file "ec2-user@$instance_ip:/tmp/.env"
    
    # Clean up temp file
    rm temp_env_file
}

# Function to create management scripts on instance
create_management_scripts() {
    local instance_ip="$1"
    
    print_status "Creating management scripts on instance..."
    
    # Create management scripts locally
    cat > temp_start.sh << 'EOF'
#!/bin/bash
cd /opt/secrets-service/backend
docker-compose up -d
EOF

    cat > temp_stop.sh << 'EOF'
#!/bin/bash
cd /opt/secrets-service/backend
docker-compose down
EOF

    cat > temp_restart.sh << 'EOF'
#!/bin/bash
cd /opt/secrets-service/backend
docker-compose down
git pull origin main
docker-compose up -d --build
EOF

    cat > temp_status.sh << 'EOF'
#!/bin/bash
cd /opt/secrets-service/backend
docker-compose ps
EOF

    cat > temp_logs.sh << 'EOF'
#!/bin/bash
cd /opt/secrets-service/backend
docker-compose logs -f
EOF

    # Copy scripts to instance
    scp -i "$KEY_PAIR_NAME.pem" -o StrictHostKeyChecking=no temp_start.sh "ec2-user@$instance_ip:/tmp/start.sh"
    scp -i "$KEY_PAIR_NAME.pem" -o StrictHostKeyChecking=no temp_stop.sh "ec2-user@$instance_ip:/tmp/stop.sh"
    scp -i "$KEY_PAIR_NAME.pem" -o StrictHostKeyChecking=no temp_restart.sh "ec2-user@$instance_ip:/tmp/restart.sh"
    scp -i "$KEY_PAIR_NAME.pem" -o StrictHostKeyChecking=no temp_status.sh "ec2-user@$instance_ip:/tmp/status.sh"
    scp -i "$KEY_PAIR_NAME.pem" -o StrictHostKeyChecking=no temp_logs.sh "ec2-user@$instance_ip:/tmp/logs.sh"
    
    # Clean up temp files
    rm temp_*.sh
}

# Function to deploy application to instance
deploy_application() {
    local instance_ip="$1"
    
    print_status "Deploying application to instance..."
    
    # SSH and setup application
    ssh -i "$KEY_PAIR_NAME.pem" -o StrictHostKeyChecking=no "ec2-user@$instance_ip" << EOF
        set -e
        
        # Setup application directory
        sudo mkdir -p /opt/secrets-service
        sudo chown ec2-user:ec2-user /opt/secrets-service
        cd /opt/secrets-service
        
        # Clone or update repository
        if [ -d ".git" ]; then
            echo "Updating existing repository..."
            git fetch origin
            git reset --hard origin/main
        else
            echo "Cloning repository..."
            git clone $GITHUB_REPO .
        fi
        
        cd backend
        
        # Move environment file
        mv /tmp/.env .
        
        # Move management scripts
        sudo mv /tmp/*.sh /opt/secrets-service/
        sudo chmod +x /opt/secrets-service/*.sh
        
        # Stop existing containers if running
        docker-compose down 2>/dev/null || true
        
        # Build and start the application
        docker-compose up -d --build
        
        # Create systemd service for auto-restart
        sudo tee /etc/systemd/system/secrets-service.service > /dev/null << 'EOL'
[Unit]
Description=Secrets Service
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
ExecStart=/opt/secrets-service/start.sh
ExecStop=/opt/secrets-service/stop.sh

[Install]
WantedBy=multi-user.target
EOL
        
        sudo systemctl daemon-reload
        sudo systemctl enable secrets-service
        sudo systemctl start secrets-service
        
        echo "Application deployed successfully!"
EOF
}

# Function to setup firewall rules
setup_firewall() {
    print_status "Setting up firewall rules..."
    
    # Allow SSH (port 22)
    aws lightsail put-instance-public-ports \
        --instance-name "$INSTANCE_NAME" \
        --port-infos fromPort=22,toPort=22,protocol=tcp,cidrs=0.0.0.0/0 \
        --region "$AWS_REGION"
    
    # Allow HTTP on port 8080
    aws lightsail put-instance-public-ports \
        --instance-name "$INSTANCE_NAME" \
        --port-infos fromPort=8080,toPort=8080,protocol=tcp,cidrs=0.0.0.0/0 \
        --region "$AWS_REGION"
        
    print_status "Firewall rules configured"
}

# Function to create instance
create_instance() {
    print_status "Creating Lightsail instance: $INSTANCE_NAME"
    
    create_startup_script
    
    aws lightsail create-instances \
        --instance-names "$INSTANCE_NAME" \
        --availability-zone "${AWS_REGION}a" \
        --blueprint-id "$BLUEPRINT_ID" \
        --bundle-id "$BUNDLE_ID" \
        --user-data file://startup-script.sh \
        --key-pair-name "$KEY_PAIR_NAME" \
        --region "$AWS_REGION" \
        --tags key=Project,value=secrets-service
    
    # Clean up startup script
    rm startup-script.sh
    
    print_status "Instance creation initiated"
}

# Function to delete instance
delete_instance() {
    print_warning "Deleting instance: $INSTANCE_NAME"
    aws lightsail delete-instance --instance-name "$INSTANCE_NAME" --region "$AWS_REGION"
    print_status "Instance deletion initiated"
}

# Function to wait for application to be ready
wait_for_application() {
    local instance_ip="$1"
    local url="http://$instance_ip:8080/health"
    
    print_status "Waiting for application to be ready at $url"
    local max_attempts=30
    local attempt=0
    
    while [ $attempt -lt $max_attempts ]; do
        if curl -f -s "$url" >/dev/null 2>&1; then
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
    local instance_ip="$1"
    local url="http://$instance_ip:8080/health"
    
    print_status "Running health check..."
    local response=$(curl -s "$url" 2>/dev/null || echo "")
    
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
    local instance_ip="$1"
    
    echo
    echo -e "${GREEN}🚀 Deployment Successful!${NC}"
    echo
    echo -e "${BLUE}📋 Deployment Details${NC}"
    echo "- Instance Name: $INSTANCE_NAME"
    echo "- Region: $AWS_REGION"
    echo "- Bundle: $BUNDLE_ID"
    echo "- Public IP: $instance_ip"
    echo
    echo -e "${BLUE}🔗 Application URLs${NC}"
    echo "- Application: http://$instance_ip:8080"
    echo "- Health Check: http://$instance_ip:8080/health"
    echo
    echo -e "${BLUE}🛠 Management Commands${NC}"
    echo "# SSH into the instance"
    echo "ssh -i $KEY_PAIR_NAME.pem ec2-user@$instance_ip"
    echo
    echo "# Check application status"
    echo "sudo /opt/secrets-service/status.sh"
    echo
    echo "# View logs"
    echo "sudo /opt/secrets-service/logs.sh"
    echo
    echo "# Restart application"
    echo "sudo /opt/secrets-service/restart.sh"
    echo
}

# Validation function
validate_requirements() {
    # Check required environment variables
    if [ -z "$KEY_PAIR_NAME" ]; then
        print_error "KEY_PAIR_NAME environment variable is required"
        exit 1
    fi
    
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
    
    # Check if key pair file exists
    if [ ! -f "$KEY_PAIR_NAME.pem" ]; then
        print_error "Key pair file $KEY_PAIR_NAME.pem not found in current directory"
        print_info "Please ensure your AWS key pair file is in the current directory"
        exit 1
    fi
    
    # Check if AWS CLI is configured
    if ! aws sts get-caller-identity >/dev/null 2>&1; then
        print_error "AWS CLI is not configured or credentials are invalid"
        print_info "Please run 'aws configure' to set up your credentials"
        exit 1
    fi
    
    print_status "Requirements validation passed"
}

# Main deployment logic
main() {
    print_status "Starting Lightsail deployment process..."
    
    # Validate requirements
    validate_requirements
    
    # Check if instance exists
    if check_instance_exists; then
        local state=$(get_instance_state)
        print_status "Instance exists with state: $state"
        
        case "$state" in
            "running"|"pending"|"starting")
                print_status "Instance is available, updating deployment..."
                ;;
            "stopped"|"stopping")
                print_status "Starting stopped instance..."
                aws lightsail start-instance --instance-name "$INSTANCE_NAME" --region "$AWS_REGION"
                ;;
            "terminated"|"terminating")
                print_warning "Instance is terminated, creating new instance..."
                delete_instance
                sleep 30  # Wait for cleanup
                create_instance
                ;;
            *)
                print_warning "Instance in unknown state: $state, recreating..."
                delete_instance
                sleep 30
                create_instance
                ;;
        esac
    else
        print_status "Instance does not exist, creating new instance..."
        create_instance
    fi
    
    # Wait for instance to be running
    wait_for_instance
    
    # Get instance IP
    local instance_ip=$(get_instance_ip)
    if [ -z "$instance_ip" ]; then
        print_error "Failed to get instance IP address"
        exit 1
    fi
    
    print_status "Instance IP: $instance_ip"
    
    # Setup firewall
    setup_firewall
    
    # Wait a bit for instance to fully initialize
    print_status "Waiting for instance to fully initialize..."
    sleep 30
    
    # Create and deploy application files
    create_env_file "$instance_ip"
    create_management_scripts "$instance_ip"
    deploy_application "$instance_ip"
    
    # Wait for application to be ready
    wait_for_application "$instance_ip"
    
    # Run health check
    run_health_check "$instance_ip"
    
    # Display summary
    display_summary "$instance_ip"
    
    print_status "Deployment completed successfully!"
}

# Show help
show_help() {
    echo "Usage: $0 [OPTIONS]"
    echo
    echo "Deploy Secrets Service to AWS Lightsail"
    echo
    echo "Required Environment Variables:"
    echo "  KEY_PAIR_NAME     - Name of AWS key pair (and .pem file)"
    echo "  JWT_SECRET        - JWT secret for authentication"
    echo "  AUTH_USERNAME     - Basic auth username"
    echo "  AUTH_PASSWORD     - Basic auth password"
    echo
    echo "Optional Environment Variables:"
    echo "  AWS_REGION        - AWS region (default: us-east-1)"
    echo "  BUNDLE_ID         - Lightsail bundle ID (default: nano_2_0)"
    echo "  ALLOWED_ORIGINS   - CORS allowed origins (default: *)"
    echo "  OPENAI_API_KEY    - OpenAI API key"
    echo "  FIREBASE_API_KEY  - Firebase API key"
    echo "  GITHUB_REPO       - GitHub repository URL"
    echo
    echo "Options:"
    echo "  -h, --help        Show this help message"
    echo "  --delete          Delete the instance"
    echo
    echo "Examples:"
    echo "  # Deploy with required variables"
    echo "  KEY_PAIR_NAME=my-key JWT_SECRET=secret AUTH_USERNAME=admin AUTH_PASSWORD=pass $0"
    echo
    echo "  # Delete instance"
    echo "  $0 --delete"
}

# Parse command line arguments
case "${1:-}" in
    -h|--help)
        show_help
        exit 0
        ;;
    --delete)
        if check_instance_exists; then
            delete_instance
            print_status "Instance deletion initiated"
        else
            print_warning "Instance does not exist"
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
