#!/bin/bash

# Cloudflare setup script for your Secrets Service
# This script helps configure your deployment for optimal Cloudflare integration

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}☁️  Cloudflare Integration Setup${NC}"
echo ""

# Function to validate domain format
validate_domain() {
    local domain=$1
    if [[ $domain =~ ^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$ ]]; then
        return 0
    else
        return 1
    fi
}

# Function to validate email format
validate_email() {
    local email=$1
    if [[ $email =~ ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$ ]]; then
        return 0
    else
        return 1
    fi
}

# Get domain information
echo -e "${BLUE}🌍 Domain Configuration${NC}"
echo ""
read -p "Enter your domain registered with Cloudflare (e.g., yourdomain.com): " DOMAIN
while ! validate_domain "$DOMAIN"; do
    echo -e "${RED}❌ Invalid domain format${NC}"
    read -p "Please enter a valid domain: " DOMAIN
done

read -p "Enter subdomain for API (default: api): " SUBDOMAIN
SUBDOMAIN=${SUBDOMAIN:-api}
FULL_DOMAIN="${SUBDOMAIN}.${DOMAIN}"

echo -e "${BLUE}📧 SSL Configuration${NC}"
echo ""
read -p "Enter your email for Let's Encrypt certificates: " EMAIL
while ! validate_email "$EMAIL"; do
    echo -e "${RED}❌ Invalid email format${NC}"
    read -p "Please enter a valid email: " EMAIL
done

echo ""
echo -e "${YELLOW}📋 Configuration Summary:${NC}"
echo "  Domain: $DOMAIN"
echo "  API Endpoint: $FULL_DOMAIN"
echo "  SSL Email: $EMAIL"
echo ""

read -p "Proceed with this configuration? (y/N): " confirm
if [[ ! $confirm =~ ^[Yy]$ ]]; then
    echo "Setup cancelled."
    exit 0
fi

# Update GitHub secrets
echo ""
echo -e "${BLUE}🔐 GitHub Secrets Configuration${NC}"
echo ""
echo "You need to update these GitHub repository secrets:"
echo ""
echo -e "${YELLOW}Required secrets:${NC}"
echo "  DOMAIN_NAME=${FULL_DOMAIN}"
echo "  SSL_EMAIL=${EMAIL}"
echo ""
echo -e "${YELLOW}Optional optimizations:${NC}"
echo "  ALLOWED_ORIGINS=https://${DOMAIN},https://www.${DOMAIN}"
echo ""

read -p "Would you like me to generate the GitHub secrets setup commands? (y/N): " gen_commands
if [[ $gen_commands =~ ^[Yy]$ ]]; then
    echo ""
    echo -e "${GREEN}📝 GitHub CLI Commands:${NC}"
    echo ""
    echo "# Set domain and SSL email"
    echo "gh secret set DOMAIN_NAME --body \"${FULL_DOMAIN}\""
    echo "gh secret set SSL_EMAIL --body \"${EMAIL}\""
    echo ""
    echo "# Update CORS origins for your domain"
    echo "gh secret set ALLOWED_ORIGINS --body \"https://${DOMAIN},https://www.${DOMAIN}\""
    echo ""
    echo -e "${BLUE}💡 Tip: Run these commands in your repository root${NC}"
fi

# Cloudflare configuration instructions
echo ""
echo -e "${BLUE}☁️  Cloudflare Configuration Steps${NC}"
echo ""
echo "After deploying your infrastructure, configure Cloudflare:"
echo ""
echo -e "${YELLOW}1. DNS Configuration:${NC}"
echo "   - Go to your Cloudflare dashboard"
echo "   - Navigate to DNS management"
echo "   - Add A record:"
echo "     Type: A"
echo "     Name: ${SUBDOMAIN}"
echo "     Content: [YOUR_EC2_IP] (from deployment output)"
echo "     Proxy status: ✅ Proxied (orange cloud)"
echo ""
echo -e "${YELLOW}2. SSL/TLS Settings:${NC}"
echo "   - Go to SSL/TLS → Overview"
echo "   - Set encryption mode to 'Full (strict)'"
echo "   - Enable 'Always Use HTTPS'"
echo ""
echo -e "${YELLOW}3. Security Settings:${NC}"
echo "   - Security Level: Medium or High"
echo "   - Enable Bot Fight Mode"
echo "   - Consider enabling WAF rules"
echo ""

# Deployment instructions
echo ""
echo -e "${BLUE}🚀 Deployment Instructions${NC}"
echo ""
echo "1. Set up GitHub secrets (see commands above)"
echo "2. Push to main branch to trigger deployment:"
echo "   git add ."
echo "   git commit -m \"Configure for Cloudflare with ${FULL_DOMAIN}\""
echo "   git push origin main"
echo ""
echo "3. After deployment completes:"
echo "   - Get EC2 IP from CloudFormation outputs"
echo "   - Update Cloudflare DNS A record"
echo "   - Test: https://${FULL_DOMAIN}/health"
echo ""

# Testing instructions
echo -e "${BLUE}🧪 Testing Your Setup${NC}"
echo ""
echo "After configuration, test these endpoints:"
echo ""
echo "# Basic connectivity"
echo "curl -I https://${FULL_DOMAIN}/health"
echo ""
echo "# SSL certificate verification"
echo "curl -vI https://${FULL_DOMAIN}/health 2>&1 | grep -E \"subject|issuer\""
echo ""
echo "# Cloudflare headers verification"
echo "curl -I https://${FULL_DOMAIN}/health | grep -i cf-"
echo ""

# Frontend configuration
echo -e "${BLUE}🌐 Frontend Configuration${NC}"
echo ""
echo "Update your frontend environment variables:"
echo ""
echo "# Production (.env.production)"
echo "VITE_SECRETS_SERVICE_URL=https://${FULL_DOMAIN}"
echo ""
echo "# Development (.env.development)"
echo "VITE_SECRETS_SERVICE_URL=https://${FULL_DOMAIN}"
echo ""

# Monitoring recommendations
echo -e "${BLUE}📊 Monitoring & Maintenance${NC}"
echo ""
echo "Recommended monitoring:"
echo "1. Cloudflare Analytics for traffic insights"
echo "2. AWS CloudWatch for EC2 metrics"
echo "3. SSL certificate expiration monitoring"
echo "4. Uptime monitoring service"
echo ""

# Summary
echo -e "${GREEN}✅ Cloudflare Setup Complete!${NC}"
echo ""
echo -e "${YELLOW}📝 Next Steps:${NC}"
echo "1. Update GitHub secrets with the commands above"
echo "2. Deploy your infrastructure"
echo "3. Configure Cloudflare DNS and SSL settings"
echo "4. Test your API endpoints"
echo "5. Update frontend configuration"
echo ""
echo -e "${BLUE}📖 For detailed instructions, see:${NC}"
echo "  - CLOUDFLARE_INTEGRATION_GUIDE.md"
echo "  - HTTPS_DEPLOYMENT_GUIDE.md"
echo ""
