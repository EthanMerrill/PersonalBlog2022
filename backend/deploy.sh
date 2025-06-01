#!/bin/bash

# Deploy Go Secrets Service to AWS EC2 using CloudFormation
# Usage: ./deploy.sh [stack-name] [key-pair-name]

set -e

# Default values
STACK_NAME=${1:-"secrets-service-stack"}
KEY_PAIR_NAME=${2}
AWS_REGION=${AWS_REGION:-"us-east-1"}

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

echo_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

echo_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo_error "AWS CLI is not installed. Please install it first."
    echo "Visit: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"
    exit 1
fi

# Check if AWS credentials are configured
if ! aws sts get-caller-identity &> /dev/null; then
    echo_error "AWS credentials not configured. Please run 'aws configure' first."
    exit 1
fi

# Check if key pair name is provided
if [ -z "$KEY_PAIR_NAME" ]; then
    echo_error "Key pair name is required."
    echo "Usage: $0 [stack-name] <key-pair-name>"
    echo ""
    echo "Available key pairs:"
    aws ec2 describe-key-pairs --query 'KeyPairs[*].KeyName' --output table
    exit 1
fi

# Check if key pair exists
if ! aws ec2 describe-key-pairs --key-names "$KEY_PAIR_NAME" &> /dev/null; then
    echo_error "Key pair '$KEY_PAIR_NAME' does not exist in region $AWS_REGION"
    echo ""
    echo "Available key pairs:"
    aws ec2 describe-key-pairs --query 'KeyPairs[*].KeyName' --output table
    exit 1
fi

echo_info "Starting deployment of stack '$STACK_NAME' in region '$AWS_REGION'"

# Prompt for required parameters
echo ""
echo "Please provide the following parameters:"

read -p "JWT Secret (min 16 characters): " JWT_SECRET
echo ""
if [ ${#JWT_SECRET} -lt 16 ]; then
    echo_error "JWT Secret must be at least 16 characters long"
    exit 1
fi

read -p "Auth Username (default: admin): " AUTH_USERNAME
AUTH_USERNAME=${AUTH_USERNAME:-admin}

read -p "Auth Password (min 8 characters): " AUTH_PASSWORD
echo ""
if [ ${#AUTH_PASSWORD} -lt 8 ]; then
    echo_error "Auth Password must be at least 8 characters long"
    exit 1
fi

read -p "Allowed Origins (default: https://ethanmerrill.com): " ALLOWED_ORIGINS
ALLOWED_ORIGINS=${ALLOWED_ORIGINS:-"https://ethanmerrill.com"}

read -p "OpenAI API Key: " OPENAI_API_KEY
echo ""
if [ -z "$OPENAI_API_KEY" ]; then
    echo_error "OpenAI API Key is required"
    exit 1
fi

read -p "Firebase API Key (optional, press Enter to skip): " FIREBASE_API_KEY
echo ""

echo ""
echo_info "Deploying CloudFormation stack..."

# Deploy the stack
aws cloudformation deploy \
    --template-file cloudformation-template-docker.yaml \
    --stack-name "$STACK_NAME" \
    --parameter-overrides \
        KeyPairName="$KEY_PAIR_NAME" \
        JWTSecret="$JWT_SECRET" \
        AuthUsername="$AUTH_USERNAME" \
        AuthPassword="$AUTH_PASSWORD" \
        AllowedOrigins="$ALLOWED_ORIGINS" \
        OpenAIAPIKey="$OPENAI_API_KEY" \
        FirebaseAPIKey="$FIREBASE_API_KEY" \
    --capabilities CAPABILITY_IAM \
    --region "$AWS_REGION"

if [ $? -eq 0 ]; then
    echo_info "Stack deployment completed successfully!"
    
    # Get stack outputs
    echo ""
    echo_info "Stack Outputs:"
    aws cloudformation describe-stacks \
        --stack-name "$STACK_NAME" \
        --region "$AWS_REGION" \
        --query 'Stacks[0].Outputs[*].[OutputKey,OutputValue]' \
        --output table
    
    # Get the public IP
    PUBLIC_IP=$(aws cloudformation describe-stacks \
        --stack-name "$STACK_NAME" \
        --region "$AWS_REGION" \
        --query 'Stacks[0].Outputs[?OutputKey==`PublicIP`].OutputValue' \
        --output text)
    
    echo ""
    echo_info "Deployment completed! Your service will be available at:"
    echo "  Health Check: http://$PUBLIC_IP:8080/health"
    echo "  Application: http://$PUBLIC_IP:8080"
    echo ""
    echo_warn "Note: It may take a few minutes for the service to be fully ready."
    echo_warn "The instance is installing Docker and setting up the application."
    echo ""
    echo_info "To check the deployment status:"
    echo "  ssh -i $KEY_PAIR_NAME.pem ec2-user@$PUBLIC_IP"
    echo "  sudo docker logs \$(sudo docker ps -q)"
    
else
    echo_error "Stack deployment failed!"
    exit 1
fi
