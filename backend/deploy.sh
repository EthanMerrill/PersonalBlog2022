#!/bin/bash

# Backward compatibility wrapper for the new Lightsail Container Service deployment
# This script maintains the same interface but uses container service instead of instances

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

print_warning ""
print_status "Redirecting to new container deployment script..."
print_status ""

# Check if the new script exists
if [ ! -f "deploy-container.sh" ]; then
    print_error "New container deployment script not found!"
    print_error "Please ensure deploy-container.sh exists in the current directory"
    exit 1
fi

# Make sure it's executable
chmod +x deploy-container.sh

# Forward all arguments to the new script
exec ./deploy-container.sh "$@"

# Function to delete stack
delete_stack() {
    print_status "Deleting stack: $STACK_NAME"
    aws cloudformation delete-stack --stack-name "$STACK_NAME" --region "$AWS_REGION"
    
    print_status "Waiting for stack deletion to complete..."
    aws cloudformation wait stack-delete-complete --stack-name "$STACK_NAME" --region "$AWS_REGION"
    print_status "Stack deleted successfully"
}

# Function to create or update stack
deploy_stack() {
    local operation="$1"
    
    # Required parameters - these should be set as environment variables
    if [ -z "$KEY_PAIR_NAME" ] || [ -z "$JWT_SECRET" ] || [ -z "$AUTH_USERNAME" ] || [ -z "$AUTH_PASSWORD" ] || [ -z "$GITHUB_REPO" ]; then
        print_error "Missing required environment variables:"
        print_error "KEY_PAIR_NAME, JWT_SECRET, AUTH_USERNAME, AUTH_PASSWORD, GITHUB_REPO"
        exit 1
    fi
    
    local parameters=(
        "ParameterKey=KeyPairName,ParameterValue=$KEY_PAIR_NAME"
        "ParameterKey=JWTSecret,ParameterValue=$JWT_SECRET"
        "ParameterKey=AuthUsername,ParameterValue=$AUTH_USERNAME"
        "ParameterKey=AuthPassword,ParameterValue=$AUTH_PASSWORD"
        "ParameterKey=GitHubRepo,ParameterValue=$GITHUB_REPO"
        "ParameterKey=InstanceType,ParameterValue=${INSTANCE_TYPE:-t2.micro}"
    )
    
    # Add optional parameters if set
    if [ -n "$ALLOWED_ORIGINS" ]; then
        parameters+=("ParameterKey=AllowedOrigins,ParameterValue=$ALLOWED_ORIGINS")
    fi
    
    if [ -n "$OPENAI_API_KEY" ]; then
        parameters+=("ParameterKey=OpenAIAPIKey,ParameterValue=$OPENAI_API_KEY")
    fi
    
    if [ -n "$FIREBASE_API_KEY" ]; then
        parameters+=("ParameterKey=FirebaseAPIKey,ParameterValue=$FIREBASE_API_KEY")
    fi
    
    # Join parameters with space
    local param_string=""
    for param in "${parameters[@]}"; do
        param_string="$param_string $param"
    done
    
    print_status "Performing CloudFormation $operation..."
    
    if [ "$operation" == "create" ]; then
        aws cloudformation create-stack \
            --stack-name "$STACK_NAME" \
            --template-body "file://$TEMPLATE_FILE" \
            --parameters $param_string \
            --capabilities CAPABILITY_IAM \
            --region "$AWS_REGION"
        
        print_status "Waiting for stack creation to complete..."
        aws cloudformation wait stack-create-complete --stack-name "$STACK_NAME" --region "$AWS_REGION"
    else
        aws cloudformation update-stack \
            --stack-name "$STACK_NAME" \
            --template-body "file://$TEMPLATE_FILE" \
            --parameters $param_string \
            --capabilities CAPABILITY_IAM \
            --region "$AWS_REGION"
        
        print_status "Waiting for stack update to complete..."
        aws cloudformation wait stack-update-complete --stack-name "$STACK_NAME" --region "$AWS_REGION"
    fi
}

# Function to get stack outputs
get_stack_outputs() {
    print_status "Stack outputs:"
    aws cloudformation describe-stacks --stack-name "$STACK_NAME" --region "$AWS_REGION" --query 'Stacks[0].Outputs[*].[OutputKey,OutputValue]' --output table
}

# Main deployment logic
main() {
    print_status "Starting deployment process..."
    
    # Check if stack exists
    if check_stack_exists; then
        stack_status=$(get_stack_status)
        print_status "Stack exists with status: $stack_status"
        
        case "$stack_status" in
            "CREATE_COMPLETE"|"UPDATE_COMPLETE")
                # Stack is healthy, check EC2 instance state
                instance_id=$(get_instance_id)
                instance_state=$(get_instance_state "$instance_id")
                
                print_status "EC2 Instance ID: $instance_id"
                print_status "EC2 Instance State: $instance_state"
                
                case "$instance_state" in
                    "running"|"pending"|"stopping"|"stopped")
                        print_status "Instance is in acceptable state, performing stack update..."
                        deploy_stack "update"
                        ;;
                    "terminated"|"terminating"|"not-found")
                        print_warning "Instance is terminated or not found, recreating stack..."
                        delete_stack
                        sleep 10  # Give AWS time to clean up
                        deploy_stack "create"
                        ;;
                    *)
                        print_warning "Unknown instance state '$instance_state', recreating stack..."
                        delete_stack
                        sleep 10
                        deploy_stack "create"
                        ;;
                esac
                ;;
            "CREATE_FAILED"|"DELETE_FAILED"|"UPDATE_ROLLBACK_FAILED"|"UPDATE_ROLLBACK_COMPLETE"|"ROLLBACK_COMPLETE")
                print_warning "Stack is in failed state: $stack_status"
                print_status "Deleting and recreating stack..."
                delete_stack
                sleep 10  # Give AWS time to clean up
                deploy_stack "create"
                ;;
            "CREATE_IN_PROGRESS"|"UPDATE_IN_PROGRESS"|"DELETE_IN_PROGRESS")
                print_error "Stack operation in progress: $stack_status"
                print_error "Please wait for the current operation to complete before deploying"
                exit 1
                ;;
            *)
                print_warning "Unknown stack status: $stack_status"
                print_status "Attempting to delete and recreate stack..."
                delete_stack
                sleep 10
                deploy_stack "create"
                ;;
        esac
    else
        print_status "Stack does not exist, creating new stack..."
        deploy_stack "create"
    fi
    
    print_status "Deployment completed successfully!"
    get_stack_outputs
}

# Check if running in script mode
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi