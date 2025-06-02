#!/bin/bash

# Simple monitoring script for the deployed Secrets Service
# Usage: ./monitor.sh <public-ip>

PUBLIC_IP=$1

if [ -z "$PUBLIC_IP" ]; then
    echo "Usage: $0 <public-ip>"
    echo "Example: $0 1.2.3.4"
    exit 1
fi

BASE_URL="http://$PUBLIC_IP:8080"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "🔍 Monitoring Secrets Service at $BASE_URL"
echo "=================================="

# Health check
echo -n "Health Check: "
if curl -s -f "$BASE_URL/health" > /dev/null; then
    echo -e "${GREEN}✅ HEALTHY${NC}"
    HEALTH_RESPONSE=$(curl -s "$BASE_URL/health" | jq -r '.status' 2>/dev/null || echo "healthy")
    echo "  Status: $HEALTH_RESPONSE"
else
    echo -e "${RED}❌ UNHEALTHY${NC}"
fi

echo ""

# Test authentication endpoint
echo -n "Auth Endpoint: "
AUTH_RESPONSE=$(curl -s -w "%{http_code}" -o /dev/null -X POST "$BASE_URL/auth" \
    -H "Content-Type: application/json" \
    -d '{"username":"test","password":"test"}')

if [ "$AUTH_RESPONSE" = "401" ]; then
    echo -e "${GREEN}✅ RESPONDING${NC}"
    echo "  HTTP Status: $AUTH_RESPONSE (Unauthorized - expected)"
elif [ "$AUTH_RESPONSE" = "400" ]; then
    echo -e "${YELLOW}⚠️  BAD REQUEST${NC}"
    echo "  HTTP Status: $AUTH_RESPONSE"
else
    echo -e "${RED}❌ ERROR${NC}"
    echo "  HTTP Status: $AUTH_RESPONSE"
fi

echo ""

# Check if ports are open
echo "Port Status:"
for port in 22 80 443 8080; do
    echo -n "  Port $port: "
    if timeout 3 bash -c "</dev/tcp/$PUBLIC_IP/$port" 2>/dev/null; then
        echo -e "${GREEN}OPEN${NC}"
    else
        echo -e "${RED}CLOSED${NC}"
    fi
done

echo ""

# Response time test
echo -n "Response Time: "
RESPONSE_TIME=$(curl -s -w "%{time_total}" -o /dev/null "$BASE_URL/health")
if [ $? -eq 0 ]; then
    echo -e "${GREEN}${RESPONSE_TIME}s${NC}"
else
    echo -e "${RED}TIMEOUT${NC}"
fi

echo ""
echo "📊 Service Information:"
echo "  Health Endpoint: $BASE_URL/health"
echo "  Auth Endpoint: $BASE_URL/auth"
echo "  Protected APIs: $BASE_URL/api/secrets/*"

echo ""
echo "🔧 Useful Commands:"
echo "  SSH: ssh -i <key-file> ec2-user@$PUBLIC_IP"
echo "  Logs: ssh -i <key-file> ec2-user@$PUBLIC_IP 'sudo docker logs \$(sudo docker ps -q)'"
echo "  Restart: ssh -i <key-file> ec2-user@$PUBLIC_IP 'cd /opt/secrets-service && sudo docker-compose restart'"
