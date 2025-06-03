# HTTPS Deployment Guide

This guide covers multiple approaches to add HTTPS to your backend service currently running on AWS EC2.

## Overview

Your current setup:

- Go backend service running on EC2 port 8080 (HTTP)
- Frontend served via GitHub Pages
- API calls from frontend to backend over HTTP

After HTTPS implementation:

- Secure encrypted communication between frontend and backend
- Browser security warnings eliminated
- Improved SEO and security posture

## Option 1: Application Load Balancer with SSL Certificate (Recommended for Production)

### Advantages

- ✅ Professional-grade security
- ✅ Automatic SSL termination
- ✅ Health checks and high availability
- ✅ Can use ACM certificates (free)
- ✅ Handles traffic distribution

### Steps

1. **Request SSL Certificate (if using custom domain)**

   ```bash
   # In AWS Certificate Manager
   # Request certificate for your domain (e.g., api.ethanmerrill.com)
   # Validate via DNS or email
   ```

2. **Deploy with CloudFormation**

   ```bash
   # Copy and customize the HTTPS CloudFormation template
   cp cloudformation-template-https.yaml my-https-deployment.yal

   # Deploy the stack
   aws cloudformation create-stack \
     --stack-name secrets-service-https \
     --template-body file://my-https-deployment.yaml \
     --parameters \
       ParameterKey=KeyPairName,ParameterValue=your-key-name \
       ParameterKey=CertificateArn,ParameterValue=arn:aws:acm:region:account:certificate/certificate-id \
       ParameterKey=DomainName,ParameterValue=api.ethanmerrill.com \
       ParameterKey=JWTSecret,ParameterValue=your-jwt-secret \
       ParameterKey=AuthUsername,ParameterValue=admin \
       ParameterKey=AuthPassword,ParameterValue=your-password \
       ParameterKey=OpenAIAPIKey,ParameterValue=your-openai-key \
       ParameterKey=GitHubRepo,ParameterValue=https://github.com/your-username/PersonalBlog2022.git \
     --capabilities CAPABILITY_IAM
   ```

3. **Update DNS**

   - Point your domain to the load balancer DNS name
   - Or use the load balancer URL directly

4. **Update Frontend Configuration**
   ```bash
   # Update your GitHub repository secrets
   VITE_SECRETS_SERVICE_URL=https://your-alb-dns-name
   # or
   VITE_SECRETS_SERVICE_URL=https://api.ethanmerrill.com
   ```

## Option 2: Direct HTTPS in Go Application

### Advantages

- ✅ Simple setup
- ✅ No additional AWS resources needed
- ✅ Direct TLS in application

### Disadvantages

- ❌ Manual certificate management
- ❌ Single point of failure
- ❌ Browser warnings with self-signed certificates

### Steps

1. **Generate SSL Certificates**

   For **development/testing** (self-signed):

   ```bash
   cd backend
   ./generate-ssl-certs.sh your-domain.com
   ```

   For **production** (Let's Encrypt):

   ```bash
   # On your EC2 instance
   ./setup-letsencrypt.sh api.ethanmerrill.com your-email@domain.com
   ```

2. **Update Environment Variables**

   ```bash
   # Add to your .env file
   USE_HTTPS=true
   TLS_CERT_FILE=/opt/certs/server.crt
   TLS_KEY_FILE=/opt/certs/server.key
   ```

3. **Deploy with Docker**

   ```bash
   # Use the HTTPS Docker Compose configuration
   CERT_DIR=./certs docker-compose -f docker-compose-https.yml up -d
   ```

4. **Update Security Groups**
   ```bash
   # Allow HTTPS traffic
   aws ec2 authorize-security-group-ingress \
     --group-id sg-your-security-group \
     --protocol tcp \
     --port 443 \
     --cidr 0.0.0.0/0
   ```

## Option 3: Nginx Reverse Proxy with SSL

### Advantages

- ✅ SSL termination at proxy level
- ✅ Additional security features
- ✅ Rate limiting capabilities
- ✅ Static file serving

### Steps

1. **Generate Certificates** (same as Option 2)

2. **Deploy with Nginx**

   ```bash
   # Use Docker Compose with Nginx profile
   CERT_DIR=./certs docker-compose -f docker-compose-https.yml --profile with-nginx up -d
   ```

3. **Configure Security Groups**
   - Allow ports 80 and 443 for Nginx
   - Restrict port 8080 to only Nginx container

## Quick Start Commands

### For Development (Self-signed certificates)

```bash
cd backend

# Generate self-signed certificates
./generate-ssl-certs.sh localhost

# Update environment
echo "USE_HTTPS=true" >> .env
echo "TLS_CERT_FILE=./certs/server.crt" >> .env
echo "TLS_KEY_FILE=./certs/server.key" >> .env

# Start with HTTPS
CERT_DIR=./certs docker-compose -f docker-compose-https.yml up -d

# Test
curl -k https://localhost:8080/health
```

### For Production (Let's Encrypt)

```bash
# On EC2 instance
cd /opt/secrets-service/backend

# Setup Let's Encrypt (replace with your domain)
sudo ./setup-letsencrypt.sh api.ethanmerrill.com your-email@domain.com

# Service will automatically restart with HTTPS
```

## Frontend Updates Required

After enabling HTTPS on your backend, update your frontend configuration:

### 1. Update GitHub Secrets

```bash
# Set in your GitHub repository secrets
VITE_SECRETS_SERVICE_URL=https://your-backend-url
```

### 2. Update Local Development

```bash
# In frontend/.env.local
VITE_SECRETS_SERVICE_URL=https://localhost:8080
```

### 3. Handle Self-signed Certificates in Development

```typescript
// For development only - accept self-signed certificates
// Add to your secretsService.ts for local development
const response = await fetch(url, {
  ...options,
  // Only for development with self-signed certificates
  ...(process.env.NODE_ENV === "development" && {
    agent: new (require("https").Agent)({
      rejectUnauthorized: false,
    }),
  }),
});
```

## Security Considerations

### Production Checklist

- [ ] Use certificates from a trusted CA (Let's Encrypt, etc.)
- [ ] Enable HSTS headers
- [ ] Update CORS origins to use HTTPS URLs
- [ ] Remove HTTP endpoints or redirect to HTTPS
- [ ] Update firewall rules
- [ ] Set up certificate auto-renewal
- [ ] Monitor certificate expiration

### Development vs Production

| Aspect       | Development         | Production       |
| ------------ | ------------------- | ---------------- |
| Certificates | Self-signed         | Let's Encrypt/CA |
| Domain       | localhost           | Real domain      |
| Warnings     | Browser warnings OK | No warnings      |
| Renewal      | Manual              | Automatic        |

## Troubleshooting

### Common Issues

1. **Certificate not found errors**

   ```bash
   # Check certificate files exist and have correct permissions
   ls -la /opt/certs/
   ```

2. **Port access issues**

   ```bash
   # Check security groups allow HTTPS traffic
   curl -v https://your-domain:443/health
   ```

3. **Certificate validation errors**

   ```bash
   # Verify certificate details
   openssl x509 -in /opt/certs/server.crt -text -noout
   ```

4. **Docker volume mount issues**
   ```bash
   # Ensure certificate directory is properly mounted
   docker exec -it container_name ls -la /opt/certs/
   ```

## Monitoring and Maintenance

### Certificate Expiration Monitoring

```bash
# Check certificate expiration
openssl x509 -in /opt/certs/server.crt -noout -dates

# Set up monitoring (example cron job)
0 0 * * 0 /opt/scripts/check-cert-expiry.sh
```

### Logs to Monitor

- TLS handshake errors
- Certificate validation failures
- HTTP to HTTPS redirects
- Backend health checks

## Cost Implications

| Option       | AWS Costs                          | Complexity |
| ------------ | ---------------------------------- | ---------- |
| ALB + ACM    | ~$16/month for ALB + free ACM cert | Medium     |
| Direct HTTPS | No additional cost                 | Low        |
| Nginx Proxy  | No additional cost                 | Medium     |

Choose the option that best fits your budget, security requirements, and operational preferences.
