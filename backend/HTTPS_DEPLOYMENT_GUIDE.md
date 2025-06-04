# HTTPS Deployment Guide

This service uses **Nginx reverse proxy** as the single HTTPS solution. The Go application runs as a simple HTTP service behind Nginx, which handles SSL termination, security headers, and load balancing.

## Architecture

```
Internet → Nginx (HTTPS :443, HTTP :80) → Go Application (HTTP :8080)
             ↓
    Let's Encrypt SSL Certificates
```

## Automated Deployment (Recommended)

### GitHub Actions + AWS CloudFormation

The easiest way to deploy with HTTPS is using the automated GitHub Actions workflow:

1. **Set up GitHub Secrets** (see [GITHUB_SECRETS_SETUP.md](./GITHUB_SECRETS_SETUP.md))
2. **Push to main branch** - Automatic deployment with SSL setup
3. **Point your domain to the EC2 IP** - DNS configuration

### Benefits of Automated Deployment

- ✅ Complete infrastructure setup (EC2, Security Groups, IAM)
- ✅ Automatic Let's Encrypt certificate generation
- ✅ Docker Compose with Nginx configuration
- ✅ Automatic certificate renewal setup
- ✅ Health checks and monitoring
- ✅ Management scripts for maintenance

## Manual Deployment

### Option 1: Production with Let's Encrypt

```bash
cd backend

# 1. Set up environment
cp .env.example .env
# Edit .env with your actual values

# 2. Start without SSL first (for certificate generation)
docker-compose up -d

# 3. Generate Let's Encrypt certificates
sudo ./setup-letsencrypt.sh api.yourdomain.com your-email@domain.com

# Service automatically restarts with HTTPS enabled
```

### Option 2: Development with Self-signed Certificates

```bash
cd backend

# 1. Generate self-signed certificates
mkdir -p certs
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout certs/server.key \
  -out certs/server.crt \
  -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"

# 2. Start services
docker-compose up -d

# 3. Test HTTPS (ignore self-signed certificate warning)
curl -k https://localhost/health
```

## Nginx Configuration Features

The `nginx.conf` provides:

- **SSL Termination**: Handles HTTPS encryption/decryption
- **HTTP to HTTPS Redirect**: Automatic security upgrade
- **Security Headers**: HSTS, XSS protection, content type sniffing protection
- **Reverse Proxy**: Routes traffic to Go application
- **Performance**: SSL session caching, HTTP/2 support

## Certificate Management

### Automatic Renewal

The `setup-letsencrypt.sh` script automatically configures certificate renewal:

```bash
# Renewal happens automatically via cron job
# Manual renewal for testing:
sudo /opt/secrets-service/renew-certs.sh

# Check renewal status
sudo crontab -l | grep certbot
```

### Manual Certificate Management

```bash
# Check certificate status
sudo certbot certificates

# Force renewal (if within 30 days of expiration)
sudo certbot renew --force-renewal

# Test renewal without actually renewing
sudo certbot renew --dry-run
```

## Frontend Updates Required

After enabling HTTPS on your backend, update your frontend configuration:

### 1. Update Environment Variables

```bash
# Production
VITE_SECRETS_SERVICE_URL=https://api.yourdomain.com

# Development (with self-signed certificates)
VITE_SECRETS_SERVICE_URL=https://localhost
```

### 2. Update CORS Configuration

In your `.env` file, update the allowed origins:

```bash
ALLOWED_ORIGIN=https://yourdomain.com,https://www.yourdomain.com
```

## Security Considerations

### Production Checklist

- [ ] Use certificates from a trusted CA (Let's Encrypt)
- [ ] Enable HSTS headers (handled by Nginx)
- [ ] Update CORS origins to use HTTPS URLs
- [ ] Remove HTTP access or redirect to HTTPS (handled by Nginx)
- [ ] Configure proper security groups (ports 80, 443, 22 only)
- [ ] Set up automatic certificate renewal (handled by script)
- [ ] Monitor certificate expiration
- [ ] Regular security updates for Nginx and system packages

### Security Headers Enabled

The Nginx configuration automatically adds:

- `Strict-Transport-Security`: Enforces HTTPS
- `X-Frame-Options`: Prevents clickjacking
- `X-Content-Type-Options`: Prevents MIME type sniffing
- `X-XSS-Protection`: Basic XSS protection

## Monitoring and Maintenance

### Health Checks

```bash
# Check service status
curl https://yourdomain.com/health

# Check certificate validity
echo | openssl s_client -servername yourdomain.com -connect yourdomain.com:443 2>/dev/null | openssl x509 -noout -dates

# Check Docker services
docker-compose ps
```

### Log Monitoring

```bash
# Application logs
docker-compose logs -f secrets-service

# Nginx logs
docker-compose logs -f nginx

# Certificate renewal logs
sudo tail -f /var/log/letsencrypt-renewal.log
```

## Troubleshooting

### Common Issues

1. **"Certificate not found" errors**

   ```bash
   # Check certificate files exist
   ls -la /opt/secrets-service/backend/certs/

   # Verify permissions
   sudo chown -R ec2-user:ec2-user /opt/secrets-service/backend/certs
   ```

2. **"Connection refused" on HTTPS**

   ```bash
   # Check Nginx is running
   docker-compose ps nginx

   # Check security group allows port 443
   # Verify DNS points to correct IP
   ```

3. **"Invalid certificate" warnings**

   ```bash
   # Check domain name matches certificate
   openssl x509 -in certs/server.crt -text -noout | grep DNS

   # Regenerate if needed
   sudo ./setup-letsencrypt.sh yourdomain.com your-email@domain.com
   ```

4. **Let's Encrypt rate limiting**
   ```bash
   # Check rate limits: https://letsencrypt.org/docs/rate-limits/
   # Use staging environment for testing:
   # certbot --staging --dry-run
   ```

## Development Tips

### Testing HTTPS Locally

```bash
# Add to /etc/hosts for testing with real domain names
127.0.0.1 api.localhost.dev

# Generate certificates for this domain
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout certs/server.key \
  -out certs/server.crt \
  -subj "/C=US/ST=State/L=City/O=Organization/CN=api.localhost.dev"

# Test with curl
curl -k https://api.localhost.dev/health
```

### Browser Certificate Acceptance

For development with self-signed certificates:

1. Visit `https://localhost` in browser
2. Click "Advanced" → "Proceed to localhost (unsafe)"
3. Certificate will be remembered for the session

## Migration from Other HTTPS Methods

If you previously used direct Go HTTPS or ALB, the new Nginx-only approach provides:

- **Better Performance**: Nginx handles SSL more efficiently
- **Better Security**: Professional-grade SSL configuration
- **Easier Management**: Centralized certificate handling
- **More Features**: Load balancing, rate limiting, security headers
- **Simpler Architecture**: Single HTTPS termination point
  # Verify certificate details
  openssl x509 -in /opt/certs/server.crt -text -noout
  ```

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
