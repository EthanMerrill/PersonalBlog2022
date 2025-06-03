#!/bin/bash

# Script to set up Let's Encrypt SSL certificates for Nginx reverse proxy
# This script should be run on your EC2 instance

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🔐 Let's Encrypt SSL Setup for Nginx${NC}"
echo ""

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   echo -e "${RED}❌ This script should not be run as root${NC}"
   exit 1
fi

# Get domain name
if [ -z "$1" ]; then
    echo -e "${YELLOW}📝 Please provide your domain name:${NC}"
    read -p "Domain (e.g., api.ethanmerrill.com): " DOMAIN
else
    DOMAIN=$1
fi

# Get email for Let's Encrypt
if [ -z "$2" ]; then
    echo -e "${YELLOW}📧 Please provide your email for Let's Encrypt notifications:${NC}"
    read -p "Email: " EMAIL
else
    EMAIL=$2
fi

echo ""
echo -e "${YELLOW}📋 Configuration:${NC}"
echo "  Domain: $DOMAIN"
echo "  Email: $EMAIL"
echo ""

# Install certbot if not already installed
if ! command -v certbot &> /dev/null; then
    echo -e "${YELLOW}📦 Installing certbot...${NC}"
    sudo yum update -y
    sudo yum install -y certbot
fi

# Stop the application temporarily to free up port 80
echo -e "${YELLOW}⏸️  Stopping application temporarily...${NC}"
cd /opt/secrets-service/backend
sudo docker-compose down || true

# Obtain certificate using standalone mode
echo -e "${YELLOW}🔒 Obtaining SSL certificate from Let's Encrypt...${NC}"
sudo certbot certonly \
    --standalone \
    --preferred-challenges http \
    --email "$EMAIL" \
    --agree-tos \
    --no-eff-email \
    -d "$DOMAIN"

# Create certificate directory for the application
CERT_DIR="/opt/secrets-service/backend/certs"
sudo mkdir -p "$CERT_DIR"

# Copy certificates to application directory
echo -e "${YELLOW}📁 Copying certificates...${NC}"
sudo cp "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" "$CERT_DIR/server.crt"
sudo cp "/etc/letsencrypt/live/$DOMAIN/privkey.pem" "$CERT_DIR/server.key"

# Set proper permissions
sudo chown -R ec2-user:ec2-user "$CERT_DIR"
chmod 600 "$CERT_DIR/server.key"
chmod 644 "$CERT_DIR/server.crt"

# Start the application with HTTPS (using the main docker-compose.yml with Nginx)
echo -e "${YELLOW}🚀 Starting application with HTTPS via Nginx...${NC}"
sudo docker-compose up -d

# Set up automatic certificate renewal
echo -e "${YELLOW}🔄 Setting up automatic certificate renewal...${NC}"
RENEWAL_SCRIPT="/opt/secrets-service/renew-certs.sh"
sudo tee "$RENEWAL_SCRIPT" > /dev/null <<EOF
#!/bin/bash
# Automatic certificate renewal script for Nginx reverse proxy

set -e

# Stop the application
cd /opt/secrets-service/backend
docker-compose down

# Renew certificate
certbot renew --standalone

# Copy renewed certificates
cp "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" "/opt/secrets-service/backend/certs/server.crt"
cp "/etc/letsencrypt/live/$DOMAIN/privkey.pem" "/opt/secrets-service/backend/certs/server.key"

# Set permissions
chown -R ec2-user:ec2-user "/opt/secrets-service/backend/certs"
chmod 600 "/opt/secrets-service/backend/certs/server.key"
chmod 644 "/opt/secrets-service/backend/certs/server.crt"

# Restart the application with Nginx
docker-compose up -d

echo "Certificate renewal completed successfully"
EOF

sudo chmod +x "$RENEWAL_SCRIPT"

# Add cron job for automatic renewal (runs twice daily)
echo -e "${YELLOW}⏰ Setting up automatic renewal cron job...${NC}"
(sudo crontab -l 2>/dev/null; echo "0 12,0 * * * $RENEWAL_SCRIPT >> /var/log/letsencrypt-renewal.log 2>&1") | sudo crontab -

echo ""
echo -e "${GREEN}✅ HTTPS setup completed successfully!${NC}"
echo ""
echo -e "${YELLOW}📋 Summary:${NC}"
echo "  - SSL certificate obtained from Let's Encrypt"
echo "  - Nginx configured as HTTPS reverse proxy"
echo "  - Go application running on HTTP (behind Nginx)"
echo "  - Automatic certificate renewal set up"
echo "  - Service URL: https://$DOMAIN"
echo ""
echo -e "${YELLOW}🔍 Verify setup:${NC}"
echo "  curl https://$DOMAIN/health"
echo ""
echo -e "${YELLOW}📝 Next steps:${NC}"
echo "  1. Update your DNS to point $DOMAIN to this server's IP"
echo "  2. Update your frontend configuration to use https://$DOMAIN"
echo "  3. Test the HTTPS endpoint"
echo ""
