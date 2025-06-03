# GitHub Secrets Setup Guide

This guide explains how to set up the required GitHub secrets for automated deployment with HTTPS support using Nginx reverse proxy.

## Required GitHub Secrets

Navigate to your repository's **Settings > Secrets and variables > Actions** and add the following secrets:

### AWS Configuration

- `AWS_ACCESS_KEY_ID` - Your AWS access key ID
- `AWS_SECRET_ACCESS_KEY` - Your AWS secret access key
- `AWS_KEY_PAIR_NAME` - Name of your EC2 key pair (without .pem extension)

### Application Configuration

- `JWT_SECRET` - Secret key for JWT token signing (generate a strong random string)
- `AUTH_USERNAME` - Basic authentication username for protected endpoints
- `AUTH_PASSWORD` - Basic authentication password for protected endpoints
- `ALLOWED_ORIGINS` - CORS allowed origins (e.g., "https://ethanmerrill.com,https://www.ethanmerrill.com")

### API Keys

- `OPENAI_API_KEY` - Your OpenAI API key (optional, leave empty if not using)
- `FIREBASE_API_KEY` - Your Firebase API key (optional, leave empty if not using)

### HTTPS/Domain Configuration (New)

- `DOMAIN_NAME` - Your domain name for SSL certificate (e.g., "api.ethanmerrill.com")
- `SSL_EMAIL` - Email address for Let's Encrypt notifications (e.g., "your-email@example.com")

## Domain Setup Notes

### If you have a domain:

1. Set `DOMAIN_NAME` to your API subdomain (e.g., "api.yourdomain.com")
2. Set `SSL_EMAIL` to your email address for Let's Encrypt notifications
3. Point your domain's DNS A record to the EC2 instance's public IP after deployment
4. The application will be available at `https://your-domain.com`

### If you don't have a domain:

1. Leave `DOMAIN_NAME` and `SSL_EMAIL` empty ("")
2. The application will use self-signed certificates for development
3. The application will be available at `http://your-ec2-ip:8080`

## Architecture Overview

### HTTPS with Domain (Production)

```
Internet → CloudFlare/DNS → Nginx (443) → Go App (8080)
                           ↓
                    Let's Encrypt SSL
```

### HTTP without Domain (Development)

```
Internet → EC2 Security Group → Nginx (80→443) → Go App (8080)
                               ↓
                        Self-signed SSL
```

## Quick Setup Script

You can use this script to quickly set up your GitHub secrets:

```bash
#!/bin/bash
# Set your values here
export AWS_ACCESS_KEY_ID="your-access-key"
export AWS_SECRET_ACCESS_KEY="your-secret-key"
export AWS_KEY_PAIR_NAME="your-key-pair-name"
export JWT_SECRET=$(openssl rand -base64 32)
export AUTH_USERNAME="admin"
export AUTH_PASSWORD="your-secure-password"
export ALLOWED_ORIGINS="https://yourdomain.com"
export OPENAI_API_KEY="your-openai-key"
export FIREBASE_API_KEY="your-firebase-key"
export DOMAIN_NAME="api.yourdomain.com"
export SSL_EMAIL="your-email@example.com"

# Set GitHub secrets (requires GitHub CLI)
gh secret set AWS_ACCESS_KEY_ID -b"$AWS_ACCESS_KEY_ID"
gh secret set AWS_SECRET_ACCESS_KEY -b"$AWS_SECRET_ACCESS_KEY"
gh secret set AWS_KEY_PAIR_NAME -b"$AWS_KEY_PAIR_NAME"
gh secret set JWT_SECRET -b"$JWT_SECRET"
gh secret set AUTH_USERNAME -b"$AUTH_USERNAME"
gh secret set AUTH_PASSWORD -b"$AUTH_PASSWORD"
gh secret set ALLOWED_ORIGINS -b"$ALLOWED_ORIGINS"
gh secret set OPENAI_API_KEY -b"$OPENAI_API_KEY"
gh secret set FIREBASE_API_KEY -b"$FIREBASE_API_KEY"
gh secret set DOMAIN_NAME -b"$DOMAIN_NAME"
gh secret set SSL_EMAIL -b"$SSL_EMAIL"

echo "✅ GitHub secrets configured successfully!"
```

## Deployment Flow

1. **Push to main branch** - Triggers GitHub Actions workflow
2. **CloudFormation deployment** - Creates/updates AWS infrastructure
3. **EC2 instance setup** - Installs Docker, Docker Compose, Certbot
4. **SSL certificate generation** - Obtains Let's Encrypt certificate (if domain provided)
5. **Application startup** - Runs Go app + Nginx via Docker Compose
6. **Health check** - Verifies application is responding
7. **Success notification** - Provides access URLs and management commands

## Troubleshooting

### SSL Certificate Issues

- Ensure your domain DNS points to the EC2 instance before certificate generation
- Check that ports 80 and 443 are open in the security group
- Verify Let's Encrypt rate limits haven't been exceeded

### Application Access Issues

- Check security group rules allow traffic on ports 80 and 443
- Verify Docker containers are running: `docker-compose ps`
- Check application logs: `docker-compose logs`

### GitHub Actions Failures

- Verify all required secrets are set correctly
- Check AWS permissions for CloudFormation and EC2
- Review GitHub Actions logs for specific error messages

## Next Steps

1. Set up all GitHub secrets as described above
2. Push a commit to the main branch to trigger deployment
3. After deployment, update your frontend configuration to use the HTTPS endpoint
4. Set up monitoring and backup procedures as needed
