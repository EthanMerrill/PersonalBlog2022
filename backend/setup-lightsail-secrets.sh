#!/bin/bash

# GitHub Secrets Setup Script for Lightsail Container Service
# This script helps you set up the required GitHub secrets for Lightsail Container Service deployment

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

# Function to check if GitHub CLI is installed
check_gh_cli() {
    if ! command -v gh &> /dev/null; then
        print_error "GitHub CLI (gh) is not installed"
        print_info "Please install it from: https://cli.github.com/"
        print_info "Or using Homebrew: brew install gh"
        exit 1
    fi
    
    # Check if user is authenticated
    if ! gh auth status &> /dev/null; then
        print_error "You are not authenticated with GitHub CLI"
        print_info "Please run: gh auth login"
        exit 1
    fi
}

# Function to set a secret
set_secret() {
    local secret_name="$1"
    local secret_description="$2"
    local is_file="$3"
    
    echo
    print_info "Setting up secret: $secret_name"
    print_info "Description: $secret_description"
    
    if [ "$is_file" = "true" ]; then
        echo -n "Enter the path to the file: "
        read -r file_path
        
        if [ ! -f "$file_path" ]; then
            print_error "File not found: $file_path"
            return 1
        fi
        
        print_status "Setting secret from file..."
        gh secret set "$secret_name" < "$file_path"
    else
        echo -n "Enter the value (hidden): "
        read -s secret_value
        echo
        
        if [ -z "$secret_value" ]; then
            print_warning "Empty value entered, skipping..."
            return 0
        fi
        
        print_status "Setting secret..."
        echo "$secret_value" | gh secret set "$secret_name"
    fi
    
    print_status "Secret $secret_name set successfully!"
}

# Function to show current secrets
show_secrets() {
    print_info "Current GitHub secrets:"
    gh secret list
}

# Main setup function
main() {
    echo -e "${BLUE}===============================================${NC}"
    echo -e "${BLUE}  GitHub Secrets Setup for Lightsail Containers${NC}"
    echo -e "${BLUE}===============================================${NC}"
    echo
    
    check_gh_cli
    
    print_status "Repository: $(gh repo view --json nameWithOwner -q .nameWithOwner)"
    echo
    
    print_info "This script will help you set up the required GitHub secrets for Lightsail Container Service"
    print_info "No SSH key pairs needed - containers are managed entirely through AWS APIs!"
    print_info "You can skip optional secrets by entering an empty value"
    echo
    
    # Required secrets
    print_status "Setting up REQUIRED secrets..."
    
    set_secret "AWS_ACCESS_KEY_ID" "Your AWS Access Key ID" false
    set_secret "AWS_SECRET_ACCESS_KEY" "Your AWS Secret Access Key" false
    set_secret "JWT_SECRET" "JWT secret for authentication" false
    set_secret "AUTH_USERNAME" "Basic authentication username" false
    set_secret "AUTH_PASSWORD" "Basic authentication password" false
    
    echo
    print_status "Setting up OPTIONAL secrets..."
    print_info "Press Enter to skip optional secrets"
    
    set_secret "ALLOWED_ORIGINS" "CORS allowed origins (default: *)" false || true
    set_secret "OPENAI_API_KEY" "OpenAI API key" false || true
    set_secret "FIREBASE_API_KEY" "Firebase API key" false || true
    
    echo
    print_status "✅ Secret setup completed!"
    echo
    show_secrets
    
    echo
    print_info "Next steps:"
    print_info "1. Push your changes to trigger the deployment workflow"
    print_info "2. Monitor the deployment in the Actions tab of your repository"
    print_info "3. Check the deployment summary for connection details"
}

# Show help
show_help() {
    echo "Usage: $0 [OPTIONS]"
    echo
    echo "Set up GitHub secrets for Lightsail Container Service deployment"
    echo "No SSH key pairs required - fully managed container service!"
    echo
    echo "Options:"
    echo "  -h, --help        Show this help message"
    echo "  --list            List current secrets"
    echo "  --delete SECRET   Delete a specific secret"
    echo
    echo "Examples:"
    echo "  $0                # Interactive setup"
    echo "  $0 --list         # List current secrets"
    echo "  $0 --delete JWT_SECRET  # Delete a secret"
}

# Parse command line arguments
case "${1:-}" in
    -h|--help)
        show_help
        exit 0
        ;;
    --list)
        check_gh_cli
        show_secrets
        exit 0
        ;;
    --delete)
        if [ -z "$2" ]; then
            print_error "Please specify a secret name to delete"
            exit 1
        fi
        check_gh_cli
        print_warning "Deleting secret: $2"
        gh secret delete "$2"
        print_status "Secret deleted successfully!"
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
