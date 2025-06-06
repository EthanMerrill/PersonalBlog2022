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
OPENAI_API_KEY=sk-your-openai-api-key-here

# Optional API Keys
FIREBASE_API_KEY=your-firebase-api-key-here
```

### 2. API Key Management

The service reads API keys directly from environment variables:

- `OPENAI_API_KEY`: Your OpenAI API key (required)
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

### Recommended Hosting Options:

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
