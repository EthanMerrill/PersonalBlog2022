# AWS Lightsail Migration Guide

This project has been migrated from AWS CloudFormation (EC2) to AWS Lightsail for simplified deployment and reduced costs.

## What Changed

### Before (CloudFormation + EC2)

- Used CloudFormation templates for infrastructure as code
- Deployed to regular EC2 instances
- More complex setup with security groups, IAM roles, etc.
- Higher cost (~$8-10/month for t2.micro)

### After (Lightsail)

- Simplified deployment with Lightsail instances
- Much simpler configuration
- Lower cost (~$3.50/month for nano instance, $5/month for micro)
- Easier management and monitoring

## New Deployment Process

### Local Deployment

```bash
# Set required environment variables
export KEY_PAIR_NAME="your-key-pair-name"
export JWT_SECRET="your-jwt-secret"
export AUTH_USERNAME="your-username"
export AUTH_PASSWORD="your-password"

# Optional environment variables
export AWS_REGION="us-east-1"
export BUNDLE_ID="nano_2_0"  # or micro_2_0 for more resources
export ALLOWED_ORIGINS="*"
export OPENAI_API_KEY="your-openai-key"
export FIREBASE_API_KEY="your-firebase-key"
export GITHUB_REPO="https://github.com/your-username/your-repo.git"

# Deploy
cd backend
./deploy-lightsail.sh
```

### GitHub Actions Deployment

The GitHub Actions workflow has been updated to use Lightsail. You need to set these secrets:

**Required Secrets:**

- `AWS_ACCESS_KEY_ID` - Your AWS access key
- `AWS_SECRET_ACCESS_KEY` - Your AWS secret key
- `AWS_KEY_PAIR_NAME` - Name of your AWS key pair
- `AWS_PRIVATE_KEY` - Content of your .pem file (private key)
- `JWT_SECRET` - JWT secret for authentication
- `AUTH_USERNAME` - Basic auth username
- `AUTH_PASSWORD` - Basic auth password

**Optional Secrets:**

- `ALLOWED_ORIGINS` - CORS allowed origins (default: \*)
- `OPENAI_API_KEY` - OpenAI API key
- `FIREBASE_API_KEY` - Firebase API key

## Lightsail Instance Types

| Bundle ID | vCPUs | RAM   | Storage | Transfer | Price/Month |
| --------- | ----- | ----- | ------- | -------- | ----------- |
| nano_2_0  | 1     | 512MB | 20GB    | 1TB      | $3.50       |
| micro_2_0 | 1     | 1GB   | 40GB    | 2TB      | $5.00       |
| small_2_0 | 1     | 2GB   | 60GB    | 3TB      | $10.00      |

## Management Commands

Once deployed, you can manage your application using these commands:

```bash
# SSH into the instance
ssh -i your-key.pem ec2-user@YOUR_INSTANCE_IP

# Check application status
sudo /opt/secrets-service/status.sh

# View application logs
sudo /opt/secrets-service/logs.sh

# Restart application (pulls latest code)
sudo /opt/secrets-service/restart.sh

# Start application
sudo /opt/secrets-service/start.sh

# Stop application
sudo /opt/secrets-service/stop.sh
```

## Monitoring and Troubleshooting

### Lightsail Console

- Go to AWS Lightsail console
- View instance metrics, networking, and snapshots
- Create snapshots for backups
- Monitor CPU, network, and storage usage

### Application Health

- Health check endpoint: `http://YOUR_INSTANCE_IP:8080/health`
- Application logs: `sudo /opt/secrets-service/logs.sh`
- Docker status: `sudo docker-compose ps` (from `/opt/secrets-service/backend`)

### Common Issues

1. **Application not responding**: Check if Docker containers are running
2. **Build failures**: Check the logs during deployment
3. **Environment variables**: Ensure all required secrets are set
4. **Firewall issues**: Lightsail automatically configures ports 22 and 8080

## Cost Comparison

### Before (CloudFormation + EC2)

- t2.micro instance: ~$8.50/month
- EBS storage: ~$0.80/month
- Data transfer: varies
- **Total: ~$9-12/month**

### After (Lightsail)

- nano_2_0 instance: $3.50/month (includes storage and 1TB transfer)
- micro_2_0 instance: $5.00/month (includes storage and 2TB transfer)
- **Total: $3.50-5.00/month**

## Migration Benefits

1. **Cost Reduction**: 50-70% cost savings
2. **Simplified Management**: No need to manage security groups, IAM roles, etc.
3. **Predictable Pricing**: All-inclusive pricing with no surprises
4. **Easy Scaling**: Simple instance type upgrades
5. **Integrated Monitoring**: Built-in metrics and monitoring
6. **Automatic Backups**: Easy snapshot creation and restoration

## Rollback Plan

If you need to rollback to CloudFormation:

1. Keep the old `deploy.sh` and `cloudformation-template-docker.yaml` files
2. Revert the GitHub Actions workflow
3. Delete the Lightsail instance
4. Deploy using the old CloudFormation method

## Next Steps

1. Test the new deployment in a staging environment
2. Update documentation and runbooks
3. Consider setting up automated snapshots for backups
4. Monitor costs and performance after migration
