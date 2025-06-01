#!/bin/bash

# Diagnostic script for EC2 instance troubleshooting
# Usage: ./diagnose.sh <public-ip> <key-file-path>

PUBLIC_IP=$1
KEY_FILE=$2

if [ -z "$PUBLIC_IP" ] || [ -z "$KEY_FILE" ]; then
    echo "Usage: $0 <public-ip> <key-file-path>"
    echo "Example: $0 52.23.1.128 my-secrets-service-key.pem"
    exit 1
fi

echo "🔍 Diagnosing EC2 instance: $PUBLIC_IP"
echo "=================================="

# Run comprehensive diagnostics on the remote instance
ssh -i "$KEY_FILE" ec2-user@$PUBLIC_IP << 'EOF'
echo "📊 System Information:"
echo "  OS: $(cat /etc/os-release | grep PRETTY_NAME)"
echo "  Uptime: $(uptime)"
echo "  Memory: $(free -h | grep Mem)"
echo "  Disk: $(df -h / | tail -1)"

echo ""
echo "🐳 Docker Status:"
sudo systemctl status docker --no-pager -l

echo ""
echo "📁 Application Directory:"
ls -la /opt/secrets-service/

echo ""
echo "📄 Environment File:"
if [ -f "/opt/secrets-service/.env" ]; then
    echo "  .env file exists"
    echo "  Size: $(wc -l < /opt/secrets-service/.env) lines"
else
    echo "  ❌ .env file missing!"
fi

echo ""
echo "🏗️ Go Files:"
cd /opt/secrets-service
if [ -f "main.go" ]; then
    echo "  ✅ main.go exists ($(wc -l < main.go) lines)"
else
    echo "  ❌ main.go missing!"
fi

if [ -f "go.mod" ]; then
    echo "  ✅ go.mod exists"
    cat go.mod
else
    echo "  ❌ go.mod missing!"
fi

echo ""
echo "🐳 Docker Containers:"
sudo docker ps -a

echo ""
echo "🔄 Docker Compose Status:"
cd /opt/secrets-service
if [ -f "docker-compose.yml" ]; then
    echo "  ✅ docker-compose.yml exists"
    sudo docker-compose ps
else
    echo "  ❌ docker-compose.yml missing!"
fi

echo ""
echo "📋 Application Logs:"
if sudo docker ps -q | grep -q .; then
    echo "Container logs:"
    sudo docker logs $(sudo docker ps -q) --tail=20
else
    echo "  ❌ No running containers found"
fi

echo ""
echo "🌐 Network Status:"
echo "  Listening ports:"
sudo netstat -tlnp | grep -E ":(22|80|443|8080)\s"

echo ""
echo "🔥 Firewall Status:"
sudo iptables -L INPUT

echo ""
echo "📜 Startup Logs:"
if [ -f "/var/log/startup.log" ]; then
    echo "Last 20 lines of startup.log:"
    tail -20 /var/log/startup.log
else
    echo "  ❌ /var/log/startup.log not found"
fi

echo ""
echo "☁️ Cloud-init Status:"
sudo cloud-init status

echo ""
echo "🩺 Health Check Test:"
if curl -f http://localhost:8080/health 2>/dev/null; then
    echo "  ✅ Local health check PASSED"
else
    echo "  ❌ Local health check FAILED"
fi

EOF

echo ""
echo "🌍 External Health Check:"
if curl -f "http://$PUBLIC_IP:8080/health" 2>/dev/null; then
    echo "  ✅ External health check PASSED"
    echo "  Response:"
    curl -s "http://$PUBLIC_IP:8080/health" | jq . 2>/dev/null || curl -s "http://$PUBLIC_IP:8080/health"
else
    echo "  ❌ External health check FAILED"
fi

echo ""
echo "🔧 Quick Fix Commands:"
echo "  SSH: ssh -i $KEY_FILE ec2-user@$PUBLIC_IP"
echo "  Restart App: ssh -i $KEY_FILE ec2-user@$PUBLIC_IP 'cd /opt/secrets-service && sudo docker-compose restart'"
echo "  View Logs: ssh -i $KEY_FILE ec2-user@$PUBLIC_IP 'cd /opt/secrets-service && sudo docker-compose logs'"
echo "  Rebuild: ssh -i $KEY_FILE ec2-user@$PUBLIC_IP 'cd /opt/secrets-service && sudo docker-compose down && sudo docker-compose build --no-cache && sudo docker-compose up -d'"
