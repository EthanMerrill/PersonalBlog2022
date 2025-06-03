#!/bin/bash

# Quick HTTPS setup script for your secrets service
# This script helps you choose and configure HTTPS for your deployment

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}🔐 Secrets Service HTTPS Setup${NC}"
echo ""

# Check if we're on EC2 or local development
if curl -s --max-time 2 http://169.254.169.254/latest/meta-data/instance-id > /dev/null 2>&1; then
    ON_EC2=true
    echo -e "${BLUE}📍 Detected: Running on AWS EC2${NC}"
else
    ON_EC2=false
    echo -e "${BLUE}📍 Detected: Running locally${NC}"
fi

echo ""
echo -e "${YELLOW}📋 HTTPS Setup Options:${NC}"
echo "1. Development setup (self-signed certificates)"
echo "2. Production setup with Let's Encrypt (domain required)"
echo "3. Application Load Balancer setup (AWS CloudFormation)"
echo "4. Show current configuration"
echo "5. Exit"
echo ""

read -p "Choose an option (1-5): " choice

case $choice in
    1)
        echo -e "${YELLOW}🔧 Setting up development HTTPS with self-signed certificates...${NC}"
        
        # Get domain for certificate
        read -p "Enter domain name (default: localhost): " domain
        domain=${domain:-localhost}
        
        # Generate self-signed certificates
        ./generate-ssl-certs.sh "$domain"
        
        # Update environment variables
        if [ ! -f .env ]; then
            cp .env.example .env
        fi
        
        # Update or add HTTPS settings
        if grep -q "USE_HTTPS" .env; then
            sed -i.bak 's/USE_HTTPS=.*/USE_HTTPS=true/' .env
        else
            echo "USE_HTTPS=true" >> .env
        fi
        
        if grep -q "TLS_CERT_FILE" .env; then
            sed -i.bak 's|TLS_CERT_FILE=.*|TLS_CERT_FILE=./certs/server.crt|' .env
        else
            echo "TLS_CERT_FILE=./certs/server.crt" >> .env
        fi
        
        if grep -q "TLS_KEY_FILE" .env; then
            sed -i.bak 's|TLS_KEY_FILE=.*|TLS_KEY_FILE=./certs/server.key|' .env
        else
            echo "TLS_KEY_FILE=./certs/server.key" >> .env
        fi
        
        echo ""
        echo -e "${GREEN}✅ Development HTTPS setup complete!${NC}"
        echo ""
        echo -e "${YELLOW}🚀 To start the service:${NC}"
        echo "  CERT_DIR=./certs docker-compose -f docker-compose-https.yml up -d"
        echo ""
        echo -e "${YELLOW}🔍 Test the service:${NC}"
        echo "  curl -k https://$domain:8080/health"
        echo ""
        echo -e "${RED}⚠️  Note: Browsers will show security warnings for self-signed certificates${NC}"
        ;;
        
    2)
        if [ "$ON_EC2" = false ]; then
            echo -e "${RED}❌ Let's Encrypt setup requires running on a public server${NC}"
            echo "This option is for production deployment on EC2 instances."
            exit 1
        fi
        
        echo -e "${YELLOW}🔧 Setting up production HTTPS with Let's Encrypt...${NC}"
        
        # Get domain and email
        read -p "Enter your domain name (e.g., api.ethanmerrill.com): " domain
        if [ -z "$domain" ]; then
            echo -e "${RED}❌ Domain name is required for Let's Encrypt${NC}"
            exit 1
        fi
        
        read -p "Enter your email for Let's Encrypt notifications: " email
        if [ -z "$email" ]; then
            echo -e "${RED}❌ Email is required for Let's Encrypt${NC}"
            exit 1
        fi
        
        echo ""
        echo -e "${YELLOW}📋 Configuration:${NC}"
        echo "  Domain: $domain"
        echo "  Email: $email"
        echo ""
        read -p "Proceed with Let's Encrypt setup? (y/N): " confirm
        
        if [[ $confirm =~ ^[Yy]$ ]]; then
            sudo ./setup-letsencrypt.sh "$domain" "$email"
        else
            echo "Setup cancelled."
        fi
        ;;
        
    3)
        echo -e "${YELLOW}🔧 Application Load Balancer setup...${NC}"
        echo ""
        echo "For ALB setup, you'll need:"
        echo "1. An SSL certificate in AWS Certificate Manager (ACM)"
        echo "2. A domain name"
        echo "3. AWS CLI configured"
        echo ""
        
        read -p "Do you have an SSL certificate ARN from ACM? (y/N): " has_cert
        
        if [[ $has_cert =~ ^[Yy]$ ]]; then
            read -p "Enter your certificate ARN: " cert_arn
            read -p "Enter your domain name: " domain
            
            echo ""
            echo -e "${YELLOW}📋 CloudFormation deployment command:${NC}"
            echo ""
            echo "aws cloudformation create-stack \\"
            echo "  --stack-name secrets-service-https \\"
            echo "  --template-body file://cloudformation-template-https.yaml \\"
            echo "  --parameters \\"
            echo "    ParameterKey=CertificateArn,ParameterValue=$cert_arn \\"
            echo "    ParameterKey=DomainName,ParameterValue=$domain \\"
            echo "    ParameterKey=KeyPairName,ParameterValue=YOUR_KEY_PAIR \\"
            echo "    ParameterKey=JWTSecret,ParameterValue=YOUR_JWT_SECRET \\"
            echo "    ParameterKey=AuthUsername,ParameterValue=YOUR_USERNAME \\"
            echo "    ParameterKey=AuthPassword,ParameterValue=YOUR_PASSWORD \\"
            echo "    ParameterKey=OpenAIAPIKey,ParameterValue=YOUR_OPENAI_KEY \\"
            echo "    ParameterKey=GitHubRepo,ParameterValue=YOUR_GITHUB_REPO \\"
            echo "  --capabilities CAPABILITY_IAM"
            echo ""
        else
            echo ""
            echo -e "${YELLOW}📝 Steps to get an SSL certificate:${NC}"
            echo "1. Go to AWS Certificate Manager in your AWS Console"
            echo "2. Request a public certificate"
            echo "3. Enter your domain name (e.g., api.ethanmerrill.com)"
            echo "4. Choose DNS validation"
            echo "5. Add the CNAME record to your DNS"
            echo "6. Wait for validation to complete"
            echo "7. Copy the certificate ARN and run this script again"
            echo ""
        fi
        
        echo -e "${BLUE}📖 For detailed instructions, see: HTTPS_DEPLOYMENT_GUIDE.md${NC}"
        ;;
        
    4)
        echo -e "${YELLOW}📋 Current Configuration:${NC}"
        echo ""
        
        if [ -f .env ]; then
            echo -e "${BLUE}Environment variables:${NC}"
            grep -E "USE_HTTPS|TLS_|PORT|ALLOWED_ORIGIN" .env || echo "No HTTPS configuration found"
        else
            echo -e "${RED}No .env file found${NC}"
        fi
        
        echo ""
        
        if [ -d certs ]; then
            echo -e "${BLUE}SSL Certificates:${NC}"
            ls -la certs/
            
            if [ -f certs/server.crt ]; then
                echo ""
                echo -e "${BLUE}Certificate details:${NC}"
                openssl x509 -in certs/server.crt -noout -subject -dates 2>/dev/null || echo "Unable to read certificate"
            fi
        else
            echo -e "${YELLOW}No certificate directory found${NC}"
        fi
        
        echo ""
        
        if command -v docker-compose &> /dev/null; then
            echo -e "${BLUE}Docker services:${NC}"
            docker-compose ps 2>/dev/null || echo "No running services"
        fi
        ;;
        
    5)
        echo "Exiting..."
        exit 0
        ;;
        
    *)
        echo -e "${RED}❌ Invalid option${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}🔗 Useful Resources:${NC}"
echo "  - Deployment Guide: HTTPS_DEPLOYMENT_GUIDE.md"
echo "  - Backend README: README.md"
echo "  - Frontend .env example: ../frontend/.env.example"
echo ""
