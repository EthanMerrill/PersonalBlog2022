# GitHub Actions CI/CD Setup Guide

This guide explains how to set up automated deployment to AWS when you push to GitHub.

## 📋 Prerequisites

1. **GitHub Repository**: Your code must be pushed to GitHub
2. **AWS Account**: With appropriate permissions for CloudFormation, EC2, IAM
3. **AWS Key Pair**: Must exist in your AWS account for EC2 access

## 🔧 Setup Steps

### 1. Configure GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions → New repository secret

Add the following secrets:

| Secret Name             | Description                  | Example Value                                           |
| ----------------------- | ---------------------------- | ------------------------------------------------------- |
| `AWS_ACCESS_KEY_ID`     | AWS Access Key ID            | `AKIA...`                                               |
| `AWS_SECRET_ACCESS_KEY` | AWS Secret Access Key        | `wJalrXUtnFEMI/K7MDENG/bPxRfiCYzEXAMPLEKEY`             |
| `AWS_KEY_PAIR_NAME`     | Name of your EC2 Key Pair    | `my-secrets-service-key`                                |
| `JWT_SECRET`            | JWT Secret (min 16 chars)    | `my-super-secure-jwt-secret-key-2024`                   |
| `AUTH_USERNAME`         | Admin username               | `admin`                                                 |
| `AUTH_PASSWORD`         | Admin password (min 8 chars) | `SecureAdminPass123!`                                   |
| `ALLOWED_ORIGINS`       | CORS allowed origins         | `https://ethanmerrill.com,https://www.ethanmerrill.com` |
| `OPENAI_API_KEY`        | OpenAI API Key               | `sk-...`                                                |
| `FIREBASE_API_KEY`      | Firebase API Key (optional)  | `AIza...`                                               |

### 2. Create AWS IAM User for GitHub Actions

Create an IAM user with the following permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["cloudformation:*", "ec2:*", "iam:*", "logs:*", "sts:GetCallerIdentity"],
      "Resource": "*"
    }
  ]
}
```

**⚠️ Security Note**: For production, create more restrictive policies limiting access to specific resources.

### 3. Workflow Configuration

The workflow (`.github/workflows/deploy.yml`) will:

- ✅ **Trigger on**: Pushes to `main` branch that modify `backend/**` files
- 🧪 **Test**: Run Go tests and build the application
- 🚀 **Deploy**: Deploy using CloudFormation if tests pass
- 🔍 **Verify**: Run health checks on the deployed application
- 📊 **Report**: Create deployment summary with links and commands

## 🚀 How It Works

### Automatic Deployment

```bash
# Any push to main with backend changes triggers deployment
git add .
git commit -m "Update backend service"
git push origin main
```

### Manual Deployment

You can also trigger deployment manually:

1. Go to GitHub → Actions → "Deploy Secrets Service to AWS"
2. Click "Run workflow"
3. Choose branch and click "Run workflow"

### Deployment Process

1. **Code Testing** (2-3 minutes)

   - Sets up Go environment
   - Downloads dependencies
   - Runs tests
   - Builds application

2. **AWS Deployment** (10-15 minutes)

   - Configures AWS credentials
   - Deploys CloudFormation stack
   - Waits for EC2 instance setup
   - Verifies application health

3. **Verification** (1-2 minutes)
   - Tests health endpoint
   - Validates deployment
   - Creates summary report

## 📊 Monitoring Deployments

### GitHub Actions Dashboard

- View deployment status in the "Actions" tab
- See detailed logs for each step
- Get deployment summary with URLs and commands

### AWS Resources Created

- **VPC**: New VPC with public subnet
- **Security Group**: Allows HTTP (80, 8080), HTTPS (443), SSH (22)
- **EC2 Instance**: t2.micro (free tier eligible)
- **Elastic IP**: Static IP address
- **CloudWatch Logs**: Application logs

### Application URLs

After deployment, you'll get:

- **Application**: `http://[PUBLIC_IP]:8080`
- **Health Check**: `http://[PUBLIC_IP]:8080/health`
- **SSH Access**: `ssh -i [KEY].pem ec2-user@[PUBLIC_IP]`

## 🛠 Management Commands

SSH into your instance and use these commands:

```bash
# Check application status
sudo /opt/secrets-service/status.sh

# View application logs
sudo /opt/secrets-service/logs.sh

# Restart application
sudo /opt/secrets-service/restart.sh

# Manual Docker commands
cd /opt/secrets-service/repo/backend
sudo docker-compose ps              # Show containers
sudo docker-compose logs -f         # Follow logs
sudo docker-compose restart         # Restart services
```

## 🔒 Security Best Practices

1. **Secrets Management**: Never commit secrets to repository
2. **Branch Protection**: Enable branch protection rules for main
3. **Environment Separation**: Use different stacks for staging/production
4. **IP Restrictions**: Consider restricting SSH access to specific IPs
5. **Regular Updates**: Keep dependencies and base images updated

## 🐛 Troubleshooting

### Common Issues

**Deployment Fails**

- Check GitHub Actions logs for specific error
- Verify all secrets are set correctly
- Ensure AWS credentials have proper permissions

**Application Not Responding**

- SSH to instance: `ssh -i [key].pem ec2-user@[PUBLIC_IP]`
- Check logs: `sudo /opt/secrets-service/logs.sh`
- Check Docker status: `sudo docker ps`

**Stack Already Exists Error**

- CloudFormation will update existing stack
- If stuck, delete stack in AWS Console and redeploy

### Health Check Failures

```bash
# Check if application is running
curl http://[PUBLIC_IP]:8080/health

# Check container status
sudo docker ps

# View application logs
sudo docker logs [container_id]

# Restart if needed
sudo /opt/secrets-service/restart.sh
```

## 📝 Customization

### Different Environments

To deploy to different environments (staging, production):

1. Create separate workflow files
2. Use different stack names
3. Set different environment-specific secrets

### Notifications

Add notification steps to the workflow:

```yaml
- name: Slack Notification
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

### Blue-Green Deployment

For zero-downtime deployments, consider:

- Using multiple instances behind a load balancer
- Implementing health checks before traffic switching
- Using AWS CodeDeploy for advanced deployment strategies

## 🎯 Next Steps

1. Set up the GitHub secrets
2. Push a change to the `backend` directory
3. Monitor the deployment in GitHub Actions
4. Test the deployed application
5. Set up monitoring and alerting
6. Consider adding staging environment
