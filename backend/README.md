# Secrets Service

A secure Go-based Backend for Frontend (BFF) service that manages API keys through environment variables and serves them securely to your frontend application.

## Features

- **Secure Authentication**: JWT-based authentication to protect API endpoints
- **Environment Variable Management**: Simple and secure API key storage using environment variables
- **Nginx Reverse Proxy**: HTTPS termination handled by Nginx for better performance and security
- **CORS Support**: Configured for your frontend domain
- **Containerized**: Docker and Docker Compose support with Nginx integration
- **Health Checks**: Built-in health monitoring
- **Production Ready**: Let's Encrypt integration via Nginx
- **Cloudflare Compatible**: Optimized for Cloudflare CDN and security features
- **Simplified Setup**: No external secret management service required

## Architecture

This service uses **Nginx reverse proxy** for HTTPS termination:

```
Frontend (Vite) → [HTTPS] → Cloudflare → [HTTPS] → Nginx → [HTTP] → Go Service → Environment Variables
                     ↓          ↓           ↓         ↓
                SSL/TLS    CDN+Security  SSL Term  Load Balancing
```

Benefits:

- API keys never exposed to the client
- Simple environment-based secret management
- Secure authentication layer
- **HTTPS encryption** handled efficiently by Nginx
- Better performance with Nginx handling static content and SSL termination
- CORS protection
- Easy deployment to any hosting platform

## Setup

### 1. Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` with your actual values:

```bash
# JWT Secret for token signing (change this to a secure random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Server Configuration
PORT=8080
ALLOWED_ORIGIN=https://ethanmerrill.com

# Authentication credentials for the secrets service
AUTH_USERNAME=admin
AUTH_PASSWORD=your_strong_password_here

# API Keys (required)
OPENAI_K=sk-your-openai-api-key-here

# Optional API Keys
FIREBASE_API_KEY=your-firebase-api-key-here
```

### 2. HTTPS Configuration (Production)

The service uses **Nginx reverse proxy** for HTTPS termination. The Go application runs as a simple HTTP service behind Nginx.

#### Architecture:

```
Internet → Nginx (HTTPS) → Go App (HTTP)
```

#### Setup Let's Encrypt SSL Certificates:

```bash
# On your EC2 instance
sudo ./setup-letsencrypt.sh api.yourdomain.com your-email@domain.com
```

The Nginx configuration automatically:

- Redirects HTTP to HTTPS
- Handles SSL certificate management
- Proxies requests to the Go application
- Adds security headers

### 3. Cloudflare Integration (Recommended)

For enhanced performance and security, integrate with Cloudflare:

#### Quick Setup:
```bash
# Interactive setup script
./setup-cloudflare.sh
```

#### Manual Setup:
1. **Configure DNS** in Cloudflare dashboard
2. **Set SSL/TLS mode** to "Full (strict)"
3. **Enable security features** (Bot Fight Mode, WAF)
4. **Update GitHub secrets** with your domain

See [CLOUDFLARE_INTEGRATION_GUIDE.md](./CLOUDFLARE_INTEGRATION_GUIDE.md) for detailed instructions.

### 4. API Key Management

The service reads API keys directly from environment variables:

- `OPENAI_K`: Your OpenAI API key (required)
- `FIREBASE_API_KEY`: Your Firebase API key (optional)
- Add more keys as needed by updating the Config struct and handlers

### 5. Running the Service

#### Using Docker Compose with Nginx (Recommended for Production)

#### Using Docker Compose with Nginx (Recommended for Production)

```bash
# Start both Go app and Nginx with SSL certificates
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

#### Local Development (HTTP only)

```bash
go mod tidy
go run main.go
```

The Go application will be available at `http://localhost:8080`

#### Production with Docker and Nginx

```bash
# Ensure certificates exist in ./certs/
# Start both Go app and Nginx with SSL certificates
docker-compose up -d
```

Access via:

- HTTP: `http://localhost` (redirects to HTTPS)
- HTTPS: `https://localhost` (with your certificates)

## API Endpoints

### Authentication

```bash
POST /auth
Content-Type: application/json

{
  "username": "admin",
  "password": "your_password"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Get OpenAI API Key

```bash
GET /api/secrets/openai
Authorization: Bearer <jwt_token>

Response:
{
  "secret": "sk-..."
}
```

### Get Other Secrets

```bash
GET /api/secrets/{secretName}
Authorization: Bearer <jwt_token>

Available secretName values: openai, firebase
```

### Health Check

```bash
GET /health

Response:
{
  "status": "healthy"
}
```

## Frontend Integration

Here's how to integrate this service with your Vite frontend:

```typescript
// services/secretsService.ts
class SecretsService {
  private baseUrl = "http://localhost:8080"; // or your deployed URL
  private token: string | null = null;

  async authenticate(username: string, password: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/auth`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({username, password}),
    });

    const data = await response.json();
    if (data.token) {
      this.token = data.token;
      localStorage.setItem("secrets_token", this.token);
    }
  }

  async getOpenAIKey(): Promise<string> {
    if (!this.token) {
      this.token = localStorage.getItem("secrets_token");
    }

    const response = await fetch(`${this.baseUrl}/api/secrets/openai`, {
      headers: {Authorization: `Bearer ${this.token}`},
    });

    const data = await response.json();
    return data.secret;
  }
}

export const secretsService = new SecretsService();
```

## Security Considerations

### Authentication Decision: JWT vs OAuth

For your portfolio application, I've implemented **JWT-based authentication** rather than full OAuth because:

1. **Single User**: This appears to be a personal portfolio with one admin user
2. **Simplicity**: JWT provides sufficient security without OAuth complexity
3. **No Third-party Users**: You don't need to manage multiple user accounts
4. **Resource Efficiency**: Lighter weight than OAuth flows

### When to Consider OAuth:

- Multiple users need access
- Integration with third-party identity providers (Google, GitHub, etc.)
- More complex authorization requirements
- Audit trails for multiple users

### Current Security Features:

- JWT tokens with expiration
- CORS protection
- Allowlist of accessible secrets
- Environment-based configuration
- HTTPS enforcement (in production)

## Production Deployment

### Automated Deployment with GitHub Actions

This service is configured for **automated deployment to AWS EC2** using GitHub Actions and CloudFormation.

#### Setup Steps:

1. **Configure GitHub Secrets** (see [GITHUB_SECRETS_SETUP.md](./GITHUB_SECRETS_SETUP.md))

   - AWS credentials and key pair
   - Application configuration (JWT secret, auth credentials)
   - Domain configuration (for HTTPS with Let's Encrypt)

2. **Push to Main Branch**

   - GitHub Actions automatically deploys to AWS
   - Creates EC2 instance with Docker and Nginx
   - Sets up Let's Encrypt SSL certificates (if domain provided)
   - Configures automatic certificate renewal

3. **Access Your Service**
   - With domain: `https://your-domain.com`
   - Without domain: `http://ec2-ip:8080`

#### Architecture in Production:

```
GitHub → AWS CloudFormation → EC2 Instance → Cloudflare (Optional)
                               ├── Docker Compose          ↓
                               │   ├── Go Application      CDN + Security
                               │   └── Nginx (HTTPS)       ↓
                               └── Let's Encrypt SSL       Performance
```

### Alternative Hosting Options:

1. **Railway**: Easy Go app deployment
2. **Fly.io**: Docker-based deployment
3. **Google Cloud Run**: Serverless containers
4. **DigitalOcean App Platform**: Simple container hosting

### Production Checklist:

- [ ] Configure GitHub secrets correctly
- [ ] Set up domain DNS (if using HTTPS)
- [ ] Use strong JWT secret (32+ characters)
- [ ] Use strong authentication password
- [ ] Enable HTTPS with Let's Encrypt
- [ ] Set proper CORS origins
- [ ] Monitor logs and health checks
- [ ] Consider rate limiting (add middleware)
- [ ] Regular API key rotation

## Monitoring

The service includes:

- Health check endpoint (`/health`)
- Structured logging
- Docker health checks

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
