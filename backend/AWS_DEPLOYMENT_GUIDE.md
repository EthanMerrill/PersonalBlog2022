# AWS EC2 Deployment Guide

This guide will help you deploy your Go Secrets Service to AWS EC2 using CloudFormation.

## Prerequisites

1. **AWS Account**: You need an AWS account with appropriate permissions
2. **AWS CLI**: Install and configure the AWS CLI
3. **EC2 Key Pair**: Create an EC2 key pair in your target AWS region

## Setup Instructions

### 1. Install AWS CLI

If you don't have AWS CLI installed:

```bash
# macOS
brew install awscli

# Or download from AWS
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
sudo installer -pkg AWSCLIV2.pkg -target /
```

### 2. Configure AWS CLI

```bash
aws configure
```

Enter your:

- AWS Access Key ID
- AWS Secret Access Key
- Default region (e.g., `us-east-1`)
- Default output format (e.g., `json`)

### 3. Create EC2 Key Pair

```bash
# Create a new key pair
aws ec2 create-key-pair --key-name my-secrets-service-key --query 'KeyMaterial' --output text > my-secrets-service-key.pem

# Set proper permissions
chmod 400 my-secrets-service-key.pem
```

## Deployment

### Option 1: Using the Deployment Script (Recommended)

```bash
cd backend
./deploy.sh my-stack-name my-secrets-service-key
```

The script will prompt you for:

- JWT Secret (minimum 16 characters)
- Auth Username (default: admin)
- Auth Password (minimum 8 characters)
- Allowed Origins (default: https://ethanmerrill.com)
- OpenAI API Key
- Firebase API Key (optional)

### Option 2: Manual CloudFormation Deployment

```bash
aws cloudformation deploy \
    --template-file cloudformation-template.yaml \
    --stack-name secrets-service-stack \
    --parameter-overrides \
        KeyPairName=my-secrets-service-key \
        JWTSecret=your-super-secret-jwt-key-here \
        AuthUsername=admin \
        AuthPassword=your-secure-password \
        AllowedOrigins=https://ethanmerrill.com \
        OpenAIAPIKey=your-openai-api-key \
        FirebaseAPIKey=your-firebase-api-key \
    --capabilities CAPABILITY_IAM
```

## What Gets Deployed

The CloudFormation template creates:

1. **VPC and Networking**:

   - VPC with public subnet
   - Internet Gateway
   - Route tables and security groups

2. **EC2 Instance** (t2.micro - Free Tier eligible):

   - Amazon Linux 2
   - Docker and Docker Compose installed
   - Your Go application containerized
   - CloudWatch logging configured

3. **Security**:

   - Security group allowing ports 22 (SSH), 80 (HTTP), 443 (HTTPS), and 8080 (app)
   - IAM role for CloudWatch logging

4. **Monitoring**:
   - CloudWatch log group for application logs
   - Health check endpoint at `/health`

## Post-Deployment

### Check Deployment Status

```bash
# Get stack outputs
aws cloudformation describe-stacks --stack-name secrets-service-stack --query 'Stacks[0].Outputs'

# SSH into the instance
ssh -i my-secrets-service-key.pem ec2-user@<PUBLIC_IP>

# Check application logs
sudo docker logs $(sudo docker ps -q)

# Check if service is running
curl http://<PUBLIC_IP>:8080/health
```

### Updating Your Application

1. **SSH into the instance**:

```bash
ssh -i my-secrets-service-key.pem ec2-user@<PUBLIC_IP>
```

2. **Update the application**:

```bash
cd /opt/secrets-service

# Copy your latest Go files to the instance
# You can use scp, git, or other methods

# Rebuild and restart
sudo docker-compose down
sudo docker-compose build --no-cache
sudo docker-compose up -d
```

### Setting up CI/CD (Optional)

For automated deployments, you can:

1. Set up a GitHub Actions workflow
2. Use AWS CodeDeploy
3. Configure a webhook to trigger deployments

## Costs

The resources created are designed to stay within the AWS Free Tier:

- **t2.micro EC2 instance**: 750 hours/month free
- **EBS storage**: 30 GB free
- **Data transfer**: 15 GB outbound free
- **CloudWatch logs**: 5 GB free

## Security Considerations

1. **Change default passwords**: The template uses parameters for secrets
2. **Restrict SSH access**: Consider limiting SSH to your IP
3. **Enable HTTPS**: Consider setting up SSL/TLS certificates
4. **Monitor logs**: Use CloudWatch for monitoring

## Troubleshooting

### Common Issues

1. **Stack creation fails**: Check CloudFormation events in AWS Console
2. **Application not responding**:

   - SSH into instance and check Docker logs
   - Verify security group rules
   - Check if Docker service is running

3. **Health check fails**:
   - Verify the application is listening on port 8080
   - Check Docker container status
   - Review application logs

### Useful Commands

```bash
# Check Docker status
sudo systemctl status docker

# View application logs
sudo docker logs -f $(sudo docker ps -q)

# Restart the application
cd /opt/secrets-service
sudo docker-compose restart

# Check disk space
df -h

# Check memory usage
free -m
```

## Cleanup

To delete all resources:

```bash
aws cloudformation delete-stack --stack-name secrets-service-stack
```

This will remove all AWS resources created by the template.

## Production Considerations

For production deployments, consider:

1. **Load Balancer**: Use Application Load Balancer for high availability
2. **Auto Scaling**: Set up Auto Scaling Groups
3. **RDS**: Use managed database instead of local storage
4. **SSL/TLS**: Set up HTTPS with ACM certificates
5. **Monitoring**: Enhanced monitoring with CloudWatch alarms
6. **Backup**: Regular snapshots and backups
7. **Multi-AZ**: Deploy across multiple availability zones
