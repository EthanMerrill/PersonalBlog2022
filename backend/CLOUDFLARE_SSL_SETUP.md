# Cloudflare SSL Certificate Integration

This guide explains how to set up Cloudflare Origin Certificates for your deployment, providing secure HTTPS connections through Cloudflare's SSL/TLS service.

## Overview

The system supports three SSL certificate modes:

1. **Cloudflare Origin Certificates** (Recommended for production)
2. **Self-signed certificates** (Development/fallback)
3. **Existing certificates** (Custom certificates)

## Cloudflare SSL Setup

### Prerequisites

1. **Domain managed by Cloudflare**: Your domain must be added to Cloudflare and use Cloudflare nameservers
2. **Cloudflare API Token**: Create an API token with the following permissions:
   - Zone:Read (for all zones or specific zone)
   - SSL and Certificates:Edit (for certificate management)

### Creating a Cloudflare API Token

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens)
2. Click "Create Token"
3. Use "Custom token" template
4. Configure permissions:
   - **Zone:Read** - Include all zones or specific zone
   - **SSL and Certificates:Edit** - Include all zones or specific zone
5. Set client IP address filtering (optional but recommended)
6. Create token and copy the value

### GitHub Secrets Configuration

Add these secrets to your GitHub repository:

```
Repository → Settings → Secrets and variables → Actions → New repository secret
```

**Required Secrets:**

- `DOMAIN`: Your domain name (e.g., `api.yourdomain.com`)
- `CLOUDFLARE_API_TOKEN`: The API token you created above

**Example Values:**

```
DOMAIN=api.yourdomain.com
CLOUDFLARE_API_TOKEN=your_cloudflare_api_token_here
```

### SSL Mode Selection

In GitHub Actions, you can choose the SSL mode:

1. **Manual Deployment**:

   - Go to Actions → "Deploy Secrets Service with Nginx Reverse Proxy to AWS"
   - Click "Run workflow"
   - Select SSL Certificate Mode: `cloudflare`

2. **Automatic Deployment**:
   - The workflow defaults to `cloudflare` mode if both `DOMAIN` and `CLOUDFLARE_API_TOKEN` secrets are provided
   - Falls back to `self-signed` if either secret is missing

## How It Works

### Certificate Provisioning Process

1. **API Validation**: Validates the Cloudflare API token
2. **Zone Lookup**: Finds the Cloudflare zone ID for your domain
3. **CSR Generation**: Creates a Certificate Signing Request with:
   - Primary domain (e.g., `api.yourdomain.com`)
   - Wildcard subdomain (e.g., `*.yourdomain.com`)
   - RSA 2048-bit key
4. **Certificate Request**: Requests an Origin Certificate from Cloudflare API
5. **Certificate Installation**: Saves the certificate and private key to the proper locations
6. **Nginx Configuration**: Automatically configures nginx with SSL settings

### Certificate Details

- **Type**: Cloudflare Origin Certificate
- **Validity**: 15 years (5475 days)
- **Key Size**: RSA 2048-bit
- **Coverage**: Primary domain + wildcard subdomain
- **Format**: PEM encoded

### File Locations

```
backend/ssl/
├── certs/
│   └── fullchain.pem          # Cloudflare Origin Certificate
└── private/
    └── privkey.pem            # Private key (RSA 2048-bit)
```

## Manual SSL Management

### Local Testing

```bash
# Test Cloudflare SSL setup locally
cd backend
./ssl-setup.sh cloudflare api.yourdomain.com your_api_token

# Check certificate status
./ssl-setup.sh status

# Validate certificates
./ssl-setup.sh validate
```

### Server Management

```bash
# SSH into your server
ssh -i your-key.pem ec2-user@your-server-ip

# Navigate to the application directory
cd /opt/secrets-service/backend

# Check SSL status
./ssl-setup.sh status

# Renew certificate (if needed)
./ssl-setup.sh renew

# Check certificate expiration
./ssl-setup.sh check
```

## Automatic Renewal

The system includes intelligent certificate renewal:

1. **Detection**: Automatically detects Cloudflare certificates vs self-signed
2. **Cloudflare Renewal**: Uses stored environment variables to renew via API
3. **Fallback**: Falls back to self-signed if Cloudflare renewal fails
4. **Backup**: Creates backups of existing certificates before renewal

### Environment Variables for Renewal

The system reads these from the `.env` file on the server:

```bash
DOMAIN=api.yourdomain.com
CLOUDFLARE_API_TOKEN=your_token_here
```

## Security Considerations

### Cloudflare Origin Certificates

- **End-to-End Encryption**: Encrypted connection from Cloudflare to your server
- **Cloudflare Validation**: Only works with Cloudflare proxy (orange cloud)
- **Long Validity**: 15-year certificates reduce renewal overhead
- **Automatic Validation**: Cloudflare handles domain validation

### Network Configuration

```
Client → Cloudflare (Universal SSL) → Your Server (Origin Certificate)
   HTTPS                   HTTPS              HTTPS
```

1. **Client to Cloudflare**: Universal SSL certificate (managed by Cloudflare)
2. **Cloudflare to Server**: Origin Certificate (managed by your deployment)

### Required Cloudflare Settings

1. **SSL/TLS Mode**: Set to "Full (strict)" for maximum security
2. **Proxy Status**: Domain must be proxied through Cloudflare (orange cloud)
3. **Origin Certificate**: Installed on your server (handled automatically)

## Troubleshooting

### Common Issues

1. **"Zone not found"**:

   - Verify domain is added to Cloudflare
   - Check domain spelling in `DOMAIN` secret
   - Ensure API token has Zone:Read permission

2. **"Invalid API token"**:

   - Verify token is copied correctly (no extra spaces)
   - Check token permissions include Zone:Read and SSL:Edit
   - Ensure token hasn't expired

3. **"Certificate validation failed"**:

   - Check nginx configuration
   - Verify certificate file permissions
   - Review nginx error logs

4. **HTTPS not working**:
   - Ensure Cloudflare SSL/TLS is set to "Full (strict)"
   - Verify domain is proxied (orange cloud)
   - Check firewall allows port 443

### Debug Commands

```bash
# Check certificate details
openssl x509 -in ./ssl/certs/fullchain.pem -text -noout

# Test nginx configuration
nginx -t

# Check nginx status
systemctl status nginx

# View nginx error logs
tail -f ./logs/nginx/error.log

# Test HTTPS locally
curl -k https://localhost/health
```

### Manual Certificate Recovery

If automatic setup fails, you can install certificates manually:

```bash
# If you have existing certificate files
./ssl-setup.sh install /path/to/cert.pem /path/to/key.pem

# Generate self-signed as fallback
./ssl-setup.sh self-signed your-domain.com
```

## Production Deployment Workflow

### Complete Deployment Process

1. **GitHub Secrets**: Configure `DOMAIN` and `CLOUDFLARE_API_TOKEN`
2. **Push Changes**: Push to main branch or trigger manual deployment
3. **Automatic Provisioning**:
   - CloudFormation creates EC2 instance
   - Environment variables are set
   - SSL certificates are automatically provisioned
   - Nginx is configured with HTTPS
4. **Verification**: Check deployment outputs for HTTPS URLs

### Deployment Outputs

After successful deployment, you'll see:

```
🔗 Application URLs
- HTTP: http://your-ec2-ip
- HTTPS: https://your-ec2-ip
- Domain: https://api.yourdomain.com (if configured)

🔧 Infrastructure Components
- ✅ Nginx Reverse Proxy - Running on ports 80/443
- ✅ Go Backend Service - Running on port 8080 (internal)
- ✅ SSL Certificates - cloudflare mode
```

### Health Checks

- **HTTP Health**: `http://your-domain/health`
- **HTTPS Health**: `https://your-domain/health`
- **API Endpoints**: `https://your-domain/api/secrets/openai`

## Migration from Self-Signed

If you're upgrading from self-signed certificates:

1. **Update GitHub Secrets**: Add `DOMAIN` and `CLOUDFLARE_API_TOKEN`
2. **Redeploy**: Trigger a new deployment or run renewal
3. **Verification**: The system will automatically detect and migrate

The deployment system gracefully handles the transition and maintains service availability.

## Support

For additional support:

1. **Check Logs**: Review nginx and application logs
2. **GitHub Issues**: File issues in the repository
3. **Cloudflare Docs**: [Origin Certificate documentation](https://developers.cloudflare.com/ssl/origin-configuration/origin-ca/)

## Summary

This Cloudflare SSL integration provides:

- ✅ **Automatic Certificate Provisioning**: No manual intervention required
- ✅ **Production-Ready Security**: End-to-end encryption with Cloudflare
- ✅ **Intelligent Fallbacks**: Self-signed certificates if Cloudflare fails
- ✅ **Easy Deployment**: GitHub Actions with secret-based configuration
- ✅ **Comprehensive Management**: Status, validation, and renewal commands
- ✅ **Long-Term Reliability**: 15-year certificate validity with automatic renewal
