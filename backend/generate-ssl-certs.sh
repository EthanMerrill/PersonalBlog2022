#!/bin/bash

# Script to generate self-signed SSL certificates for development/testing
# For production, use certificates from a trusted CA like Let's Encrypt

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🔐 SSL Certificate Generator${NC}"
echo ""

# Configuration
CERT_DIR="./certs"
DOMAIN=${1:-localhost}
DAYS=${2:-365}

# Create certificate directory
mkdir -p "$CERT_DIR"

echo -e "${YELLOW}📝 Configuration:${NC}"
echo "  Domain: $DOMAIN"
echo "  Validity: $DAYS days"
echo "  Output directory: $CERT_DIR"
echo ""

# Generate private key
echo -e "${YELLOW}🔑 Generating private key...${NC}"
openssl genrsa -out "$CERT_DIR/server.key" 2048

# Generate certificate signing request
echo -e "${YELLOW}📄 Generating certificate signing request...${NC}"
openssl req -new -key "$CERT_DIR/server.key" -out "$CERT_DIR/server.csr" -subj "/C=US/ST=State/L=City/O=Organization/CN=$DOMAIN"

# Generate self-signed certificate
echo -e "${YELLOW}📜 Generating self-signed certificate...${NC}"
openssl x509 -req -in "$CERT_DIR/server.csr" -signkey "$CERT_DIR/server.key" -out "$CERT_DIR/server.crt" -days "$DAYS" -extensions v3_req -extfile <(
cat <<EOF
[v3_req]
basicConstraints = CA:FALSE
keyUsage = nonRepudiation, digitalSignature, keyEncipherment
subjectAltName = @alt_names

[alt_names]
DNS.1 = $DOMAIN
DNS.2 = localhost
DNS.3 = *.localhost
IP.1 = 127.0.0.1
IP.2 = ::1
EOF
)

# Set appropriate permissions
chmod 600 "$CERT_DIR/server.key"
chmod 644 "$CERT_DIR/server.crt"

# Clean up CSR
rm "$CERT_DIR/server.csr"

echo ""
echo -e "${GREEN}✅ SSL certificates generated successfully!${NC}"
echo ""
echo -e "${YELLOW}📁 Files created:${NC}"
echo "  Private key: $CERT_DIR/server.key"
echo "  Certificate: $CERT_DIR/server.crt"
echo ""
echo -e "${YELLOW}🚀 Usage:${NC}"
echo "  1. For Docker: Set USE_HTTPS=true in your .env file"
echo "  2. For development: Access your service at https://$DOMAIN:8080"
echo "  3. For production: Replace with certificates from a trusted CA"
echo ""
echo -e "${RED}⚠️  Warning:${NC}"
echo "  These are self-signed certificates for development only."
echo "  Browsers will show security warnings."
echo "  For production, use certificates from Let's Encrypt or another trusted CA."
echo ""

# Verify certificate
echo -e "${YELLOW}🔍 Certificate information:${NC}"
openssl x509 -in "$CERT_DIR/server.crt" -text -noout | grep -E "(Subject|DNS|IP Address)" || echo "Certificate verification complete"
