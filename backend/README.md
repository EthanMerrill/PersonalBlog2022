# Secrets Service

A secure Go-based Backend for Frontend (BFF) service that manages API keys through environment variables and serves them securely to your frontend application.

## Features

- **Secure Authentication**: JWT-based authentication to protect API endpoints
- **Environment Variable Management**: Simple and secure API key storage using environment variables
- **CORS Support**: Configured for your frontend domain
- **Containerized**: Docker and Docker Compose support
- **Health Checks**: Built-in health monitoring
- **Simplified Setup**: No external secret management service required

## Architecture

This service follows the Backend for Frontend (BFF) pattern:

```
Frontend (Vite) → Secrets Service (Go) → Environment Variables
```

Benefits:

- API keys never exposed to the client
- Simple environment-based secret management
- Secure authentication layer
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

### 2. API Key Management

The service reads API keys directly from environment variables:

- `OPENAI_K`: Your OpenAI API key (required)
- `FIREBASE_API_KEY`: Your Firebase API key (optional)
- Add more keys as needed by updating the Config struct and handlers

### 3. Running the Service

#### Using Docker Compose (Recommended)

```bash
docker-compose up -d
```

#### Using Docker

```bash
docker build -t secrets-service .
docker run -p 8080:8080 --env-file .env secrets-service
```

#### Local Development

```bash
go mod tidy
go run main.go
```

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

### AWS Lightsail Container Service (Recommended)

This project is configured for easy deployment to AWS Lightsail Container Service, offering:

- **Cost-effective**: Starting at $7/month (nano container)
- **Fully managed**: No servers to manage, automatic scaling and load balancing
- **No SSH required**: Deploy and manage entirely through AWS APIs
- **Built-in HTTPS**: Automatic SSL certificates and custom domains
- **Container-native**: Perfect for Docker-based applications

#### GitHub Actions Deployment (Automated)

1. **Set up GitHub Secrets** (use the helper script):

   ```bash
   ./setup-lightsail-secrets.sh
   ```

   Or manually add these secrets in your GitHub repository:

   - `AWS_ACCESS_KEY_ID` - Your AWS access key
   - `AWS_SECRET_ACCESS_KEY` - Your AWS secret key
   - `JWT_SECRET` - JWT secret for authentication
   - `AUTH_USERNAME` - Basic auth username
   - `AUTH_PASSWORD` - Basic auth password
   - `ALLOWED_ORIGINS` (optional) - CORS allowed origins
   - `OPENAI_API_KEY` (optional) - OpenAI API key
   - `FIREBASE_API_KEY` (optional) - Firebase API key

2. **Deploy**: Push to main branch or use workflow dispatch
   ```bash
   git push origin main
   ```

#### Manual Deployment

**Prerequisites:**

- AWS CLI installed and configured
- Docker installed and running
- Python 3 (for JSON processing)

```bash
# Generate a secure JWT secret
export JWT_SECRET="$(openssl rand -base64 32)"
export AUTH_USERNAME="admin"
export AUTH_PASSWORD="your-strong-password"

# Optional: Configure container size and scale
export POWER="nano"    # nano, micro, small, medium, large, xlarge
export SCALE="1"       # Number of container replicas

# Optional: Add API keys
export ALLOWED_ORIGINS="https://yourdomain.com"
export OPENAI_API_KEY="sk-your-openai-key"
export FIREBASE_API_KEY="your-firebase-key"

# Deploy to Lightsail Container Service
./deploy-container.sh
```

#### Container Management

After deployment, manage your application:

```bash
# View service status
aws lightsail get-container-services --service-name secrets-service --region us-east-1

# View container logs
aws lightsail get-container-log --service-name secrets-service --container-name secrets-service --region us-east-1

# Scale horizontally (more replicas)
aws lightsail update-container-service --service-name secrets-service --scale 2 --region us-east-1

# Scale vertically (more power)
aws lightsail update-container-service --service-name secrets-service --power micro --region us-east-1
```

#### Container Service Pricing

| Power  | vCPU | RAM   | Price/Month |
| ------ | ---- | ----- | ----------- |
| nano   | 0.25 | 512MB | $7/month    |
| micro  | 0.5  | 1GB   | $10/month   |
| small  | 1    | 2GB   | $20/month   |
| medium | 2    | 4GB   | $40/month   |

_Pricing includes container hosting, load balancing, and data transfer_

### Legacy Deployment Options

For comparison, the old instance-based deployment is still available:

- **Lightsail Instances**: `./deploy-lightsail.sh` (requires SSH key pairs)
- **CloudFormation**: See `LIGHTSAIL_MIGRATION.md` for migration details

### Alternative Hosting Options:

1. **Railway**: Easy Go app deployment
2. **Fly.io**: Docker-based deployment
3. **Google Cloud Run**: Serverless containers
4. **DigitalOcean App Platform**: Simple container hosting

### Production Checklist:

- [ ] Use strong JWT secret (32+ characters)
- [ ] Use strong authentication password
- [ ] Enable HTTPS
- [ ] Set proper CORS origins
- [ ] Monitor logs and health checks
- [ ] Secure environment variable storage
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
