#!/bin/bash

# Script to deploy updated source code to EC2 instance
# Usage: ./update-code.sh <public-ip> <key-file-path>

set -e

PUBLIC_IP=$1
KEY_FILE=$2

if [ -z "$PUBLIC_IP" ] || [ -z "$KEY_FILE" ]; then
    echo "Usage: $0 <public-ip> <key-file-path>"
    echo "Example: $0 1.2.3.4 my-secrets-service-key.pem"
    exit 1
fi

echo "Copying source code to EC2 instance..."

# Copy Go source files
scp -i "$KEY_FILE" main.go go.mod go.sum ec2-user@$PUBLIC_IP:/tmp/

# Copy environment template if it exists
if [ -f ".env.example" ]; then
    scp -i "$KEY_FILE" .env.example ec2-user@$PUBLIC_IP:/tmp/
fi

echo "Updating application on EC2 instance..."

# SSH and update the application
ssh -i "$KEY_FILE" ec2-user@$PUBLIC_IP << 'EOF'
    cd /opt/secrets-service
    
    # Backup current files
    sudo cp main.go main.go.backup || true
    sudo cp go.mod go.mod.backup || true
    sudo cp go.sum go.sum.backup || true
    
    # Copy new files
    sudo cp /tmp/main.go .
    sudo cp /tmp/go.mod .
    sudo cp /tmp/go.sum .
    
    # Copy env template if provided
    if [ -f "/tmp/.env.example" ]; then
        sudo cp /tmp/.env.example .
    fi
    
    # Rebuild and restart the application
    echo "Stopping current application..."
    sudo docker-compose down
    
    echo "Building new application..."
    sudo docker-compose build --no-cache
    
    echo "Starting updated application..."
    sudo docker-compose up -d
    
    echo "Waiting for application to start..."
    sleep 10
    
    # Check if application is healthy
    if curl -f http://localhost:8080/health; then
        echo ""
        echo "✅ Application updated successfully!"
    else
        echo ""
        echo "❌ Application health check failed. Rolling back..."
        
        # Rollback on failure
        sudo docker-compose down
        sudo cp main.go.backup main.go || true
        sudo cp go.mod.backup go.mod || true
        sudo cp go.sum.backup go.sum || true
        sudo docker-compose build --no-cache
        sudo docker-compose up -d
        
        echo "Rollback completed. Check the logs for errors."
        exit 1
    fi
EOF

echo ""
echo "Deployment completed!"
echo "Check the application at: http://$PUBLIC_IP:8080/health"
