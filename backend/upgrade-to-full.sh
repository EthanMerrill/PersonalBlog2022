#!/bin/bash

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🔄 Upgrading to Full Secrets Service Application${NC}"
echo "This will replace the minimal placeholder with your actual Go secrets service"
echo ""

STACK_NAME="secrets-service-minimal"

# Check if stack exists
if ! aws cloudformation describe-stacks --stack-name "$STACK_NAME" > /dev/null 2>&1; then
    echo -e "${RED}❌ Stack '$STACK_NAME' not found. Deploy the simple version first.${NC}"
    echo "Run: ./deploy-simple.sh"
    exit 1
fi

# Get the public IP
PUBLIC_IP=$(aws cloudformation describe-stacks \
    --stack-name "$STACK_NAME" \
    --query 'Stacks[0].Outputs[?OutputKey==`PublicIP`].OutputValue' \
    --output text)

if [ -z "$PUBLIC_IP" ]; then
    echo -e "${RED}❌ Could not get public IP from stack${NC}"
    exit 1
fi

echo -e "${GREEN}📡 Found instance at: $PUBLIC_IP${NC}"

# Get key pair name from stack parameters
KEY_PAIR_NAME=$(aws cloudformation describe-stacks \
    --stack-name "$STACK_NAME" \
    --query 'Stacks[0].Parameters[?ParameterKey==`KeyPairName`].ParameterValue' \
    --output text)

if [ -z "$KEY_PAIR_NAME" ]; then
    echo -e "${RED}❌ Could not get key pair name from stack${NC}"
    exit 1
fi

echo -e "${GREEN}🔑 Using key pair: $KEY_PAIR_NAME${NC}"

# Check if we can connect
echo ""
echo -e "${GREEN}🔍 Testing SSH connectivity...${NC}"
if ! ssh -i "${KEY_PAIR_NAME}.pem" -o ConnectTimeout=10 -o StrictHostKeyChecking=no ec2-user@$PUBLIC_IP "echo 'SSH connection successful'" 2>/dev/null; then
    echo -e "${RED}❌ Cannot connect to instance via SSH${NC}"
    echo "Make sure:"
    echo "  1. Your ${KEY_PAIR_NAME}.pem file is in the current directory"
    echo "  2. The file has correct permissions (chmod 400 ${KEY_PAIR_NAME}.pem)"
    echo "  3. The security group allows SSH from your IP"
    exit 1
fi

echo -e "${GREEN}✅ SSH connection successful${NC}"

# Prompt for environment variables
echo ""
echo -e "${YELLOW}🔐 Enter your application secrets:${NC}"

read -p "JWT Secret (min 16 chars): " -s JWT_SECRET
echo ""

read -p "Auth Username [admin]: " AUTH_USERNAME
AUTH_USERNAME=${AUTH_USERNAME:-admin}

read -p "Auth Password: " -s AUTH_PASSWORD
echo ""

read -p "OpenAI API Key: " -s OPENAI_K
echo ""

read -p "Firebase API Key (optional): " -s FIREBASE_API_KEY
echo ""

read -p "Allowed CORS Origins [https://ethanmerrill.com]: " ALLOWED_ORIGINS
ALLOWED_ORIGINS=${ALLOWED_ORIGINS:-https://ethanmerrill.com}

# Validate inputs
if [ ${#JWT_SECRET} -lt 16 ]; then
    echo -e "${RED}❌ JWT Secret must be at least 16 characters${NC}"
    exit 1
fi

if [ ${#AUTH_PASSWORD} -lt 8 ]; then
    echo -e "${RED}❌ Auth Password must be at least 8 characters${NC}"
    exit 1
fi

if [ -z "$OPENAI_K" ]; then
    echo -e "${RED}❌ OpenAI API Key is required${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}📋 Deployment Summary:${NC}"
echo "  Instance: $PUBLIC_IP"
echo "  Auth Username: $AUTH_USERNAME"
echo "  CORS Origins: $ALLOWED_ORIGINS"
echo "  JWT Secret: [HIDDEN]"
echo "  OpenAI Key: [HIDDEN]"
echo "  Firebase Key: [HIDDEN]"
echo ""

read -p "Proceed with upgrade? (y/N): " CONFIRM
if [[ ! $CONFIRM =~ ^[Yy]$ ]]; then
    echo "Upgrade cancelled"
    exit 0
fi

echo ""
echo -e "${GREEN}🚀 Uploading and deploying full application...${NC}"

# Create a temporary script to run on the instance
cat > /tmp/deploy-app.sh << 'EOF'
#!/bin/bash
set -e

echo "$(date): Starting application deployment..."

# Stop the minimal service
sudo pkill -f "main" || true
sleep 2

# Install Docker
if ! command -v docker &> /dev/null; then
    echo "$(date): Installing Docker..."
    sudo amazon-linux-extras install docker -y
    sudo service docker start
    sudo usermod -a -G docker ec2-user
    sudo systemctl enable docker
fi

# Install Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo "$(date): Installing Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
fi

# Create application directory
sudo mkdir -p /opt/secrets-service
cd /opt/secrets-service

# Copy the real application code
sudo cp /home/ec2-user/main.go .
sudo cp /home/ec2-user/go.mod .
sudo cp /home/ec2-user/.env .
sudo cp /home/ec2-user/Dockerfile .
sudo cp /home/ec2-user/docker-compose.yml .

# Set proper ownership
sudo chown -R ec2-user:ec2-user /opt/secrets-service

# Build and start
echo "$(date): Building application..."
docker-compose build

echo "$(date): Starting application..."
docker-compose up -d

# Wait for application
echo "$(date): Waiting for application to start..."
for i in {1..12}; do
    if wget -q --spider http://localhost:8080/health; then
        echo "$(date): Application is running!"
        break
    fi
    if [ $i -eq 12 ]; then
        echo "$(date): Application failed to start"
        docker-compose logs
        exit 1
    fi
    sleep 10
done

echo "$(date): Deployment complete!"
EOF

# Copy main.go to the instance
echo "Uploading application files..."
scp -i "${KEY_PAIR_NAME}.pem" -o StrictHostKeyChecking=no main.go ec2-user@$PUBLIC_IP:/home/ec2-user/

# Create environment file locally and upload
cat > /tmp/.env << EOF
JWT_SECRET=$JWT_SECRET
PORT=8080
ALLOWED_ORIGIN=$ALLOWED_ORIGINS
AUTH_USERNAME=$AUTH_USERNAME
AUTH_PASSWORD=$AUTH_PASSWORD
OPENAI_K=$OPENAI_K
FIREBASE_API_KEY=$FIREBASE_API_KEY
EOF

scp -i "${KEY_PAIR_NAME}.pem" -o StrictHostKeyChecking=no /tmp/.env ec2-user@$PUBLIC_IP:/home/ec2-user/

# Create go.mod file
cat > /tmp/go.mod << 'EOF'
module secrets-service

go 1.21

require (
    github.com/golang-jwt/jwt/v5 v5.2.0
    github.com/gorilla/mux v1.8.1
    github.com/rs/cors v1.10.1
)
EOF

scp -i "${KEY_PAIR_NAME}.pem" -o StrictHostKeyChecking=no /tmp/go.mod ec2-user@$PUBLIC_IP:/home/ec2-user/

# Create Dockerfile
cat > /tmp/Dockerfile << 'EOF'
FROM golang:1.21-alpine AS builder
WORKDIR /app
RUN apk add --no-cache git ca-certificates
COPY go.mod go.sum ./
RUN go mod download
COPY main.go .
RUN CGO_ENABLED=0 GOOS=linux go build -o main .

FROM alpine:latest
RUN apk --no-cache add ca-certificates wget
WORKDIR /root/
COPY --from=builder /app/main .
EXPOSE 8080
CMD ["./main"]
EOF

scp -i "${KEY_PAIR_NAME}.pem" -o StrictHostKeyChecking=no /tmp/Dockerfile ec2-user@$PUBLIC_IP:/home/ec2-user/

# Create docker-compose.yml
cat > /tmp/docker-compose.yml << 'EOF'
version: "3.8"
services:
  secrets-service:
    build: .
    ports:
      - "8080:8080"
    env_file:
      - .env
    restart: unless-stopped
EOF

scp -i "${KEY_PAIR_NAME}.pem" -o StrictHostKeyChecking=no /tmp/docker-compose.yml ec2-user@$PUBLIC_IP:/home/ec2-user/

# Copy and run deployment script
scp -i "${KEY_PAIR_NAME}.pem" -o StrictHostKeyChecking=no /tmp/deploy-app.sh ec2-user@$PUBLIC_IP:/home/ec2-user/
ssh -i "${KEY_PAIR_NAME}.pem" -o StrictHostKeyChecking=no ec2-user@$PUBLIC_IP "chmod +x deploy-app.sh && ./deploy-app.sh"

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ Application upgrade successful!${NC}"
    echo ""
    echo -e "${GREEN}🎉 Your Secrets Service is now running at:${NC}"
    echo "  Health Check: http://$PUBLIC_IP:8080/health"
    echo "  API Base: http://$PUBLIC_IP:8080"
    echo ""
    echo "Test the endpoints:"
    echo "  curl http://$PUBLIC_IP:8080/health"
    echo "  curl -X POST http://$PUBLIC_IP:8080/auth -d '{\"username\":\"$AUTH_USERNAME\",\"password\":\"[your-password]\"}'"
    
    # Clean up temporary files
    rm -f /tmp/.env /tmp/go.mod /tmp/Dockerfile /tmp/docker-compose.yml /tmp/deploy-app.sh
else
    echo ""
    echo -e "${RED}❌ Application upgrade failed${NC}"
    echo "Check the logs on the instance:"
    echo "  ssh -i ${KEY_PAIR_NAME}.pem ec2-user@$PUBLIC_IP"
    echo "  cd /opt/secrets-service && docker-compose logs"
    exit 1
fi
