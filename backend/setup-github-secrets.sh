#!/bin/bash

# Script to help set up GitHub Actions secrets for AWS deployment
# Usage: ./setup-github-secrets.sh

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
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

echo_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

clear
echo "🚀 GitHub Actions AWS Deployment Setup"
echo "======================================="
echo ""

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

echo_info "AWS CLI is configured. Current identity:"
aws sts get-caller-identity --output table

echo ""
echo_step "1. Gathering AWS Information"

# Get current AWS region
AWS_REGION=$(aws configure get region)
echo_info "Current AWS Region: $AWS_REGION"

# List available key pairs
echo_info "Available EC2 Key Pairs:"
aws ec2 describe-key-pairs --query 'KeyPairs[*].[KeyName,KeyType]' --output table

echo ""
echo_step "2. Generating GitHub Secrets Values"
echo ""

echo "Copy the following secrets to your GitHub repository:"
echo "Repository → Settings → Secrets and variables → Actions → New repository secret"
echo ""

# Get current AWS credentials (if using access keys)
AWS_ACCESS_KEY_ID=$(aws configure get aws_access_key_id)
AWS_SECRET_ACCESS_KEY=$(aws configure get aws_secret_access_key)

if [ -n "$AWS_ACCESS_KEY_ID" ]; then
    echo "📋 GitHub Secrets to Add:"
    echo "========================"
    echo ""
    echo "Secret Name: AWS_ACCESS_KEY_ID"
    echo "Secret Value: $AWS_ACCESS_KEY_ID"
    echo ""
    echo "Secret Name: AWS_SECRET_ACCESS_KEY"
    echo "Secret Value: [HIDDEN - use 'aws configure get aws_secret_access_key']"
    echo ""
else
    echo_warn "No AWS access keys found in configuration."
    echo_warn "You might be using IAM roles or SSO."
    echo ""
    echo_info "To create new access keys:"
    echo "1. Go to AWS Console → IAM → Users → Your User → Security credentials"
    echo "2. Create new access key"
    echo "3. Download the credentials"
    echo ""
fi

echo "Secret Name: AWS_KEY_PAIR_NAME"
echo "Secret Value: [Choose from the key pairs listed above]"
echo ""

echo "Secret Name: JWT_SECRET"
echo "Secret Value: [Generate a secure random string, min 16 characters]"
echo ""

echo "Secret Name: AUTH_USERNAME"
echo "Secret Value: admin"
echo ""

echo "Secret Name: AUTH_PASSWORD"
echo "Secret Value: [Create a secure password, min 8 characters]"
echo ""

echo "Secret Name: ALLOWED_ORIGINS"
echo "Secret Value: https://ethanmerrill.com,https://www.ethanmerrill.com"
echo ""

echo "Secret Name: OPENAI_API_KEY"
echo "Secret Value: [Your OpenAI API key starting with sk-]"
echo ""

echo "Secret Name: FIREBASE_API_KEY"
echo "Secret Value: [Your Firebase API key, or leave empty]"
echo ""

echo_step "3. Security Recommendations"
echo ""

echo_warn "Important Security Notes:"
echo "• Never commit these secrets to your repository"
echo "• Use strong, unique passwords"
echo "• Regularly rotate access keys"
echo "• Monitor AWS CloudTrail for access patterns"
echo ""

echo_step "4. IAM Permissions for GitHub Actions"
echo ""

echo_info "The AWS user/role needs these permissions:"
cat << 'EOF'
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "cloudformation:CreateStack",
                "cloudformation:UpdateStack",
                "cloudformation:DeleteStack",
                "cloudformation:DescribeStacks",
                "cloudformation:DescribeStackEvents",
                "cloudformation:DescribeStackResources",
                "cloudformation:GetTemplate",
                "ec2:*",
                "iam:CreateRole",
                "iam:DeleteRole",
                "iam:GetRole",
                "iam:PassRole",
                "iam:AttachRolePolicy",
                "iam:DetachRolePolicy",
                "iam:CreateInstanceProfile",
                "iam:DeleteInstanceProfile",
                "iam:AddRoleToInstanceProfile",
                "iam:RemoveRoleFromInstanceProfile",
                "logs:CreateLogGroup",
                "logs:DeleteLogGroup",
                "logs:DescribeLogGroups",
                "sts:GetCallerIdentity"
            ],
            "Resource": "*"
        }
    ]
}
EOF

echo ""
echo_step "5. Next Steps"
echo ""

echo_info "After setting up the secrets:"
echo "1. Push any change to the 'backend/' directory on main branch"
echo "2. Go to GitHub → Actions to monitor the deployment"
echo "3. The workflow will automatically deploy to AWS"
echo ""

echo_info "Manual deployment:"
echo "1. Go to GitHub → Actions → 'Deploy Secrets Service to AWS'"
echo "2. Click 'Run workflow' → 'Run workflow'"
echo ""

echo_step "6. Helpful Commands"
echo ""

echo "🔍 Check current AWS config:"
echo "aws configure list"
echo ""

echo "🔑 Get secret access key:"
echo "aws configure get aws_secret_access_key"
echo ""

echo "🌐 Generate a secure JWT secret:"
echo "openssl rand -base64 32"
echo ""

echo "🔒 Generate a secure password:"
echo "openssl rand -base64 16"
echo ""

echo "✅ Test CloudFormation permissions:"
echo "aws cloudformation describe-stacks --region $AWS_REGION"
echo ""

echo_info "Setup complete! Follow the GitHub Secrets setup above."
