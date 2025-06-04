# Cloudflare Integration Guide

This guide explains how to configure your domain in Cloudflare to work with your AWS-hosted Secrets Service that uses Nginx reverse proxy for HTTPS.

## Current Architecture

```
Internet → Cloudflare → AWS EC2 (Nginx → Go App)
           ↓              ↓         ↓
    DNS + CDN + Security  SSL Term  HTTP API
```

## Cloudflare Configuration

### 1. DNS Setup

In your Cloudflare dashboard:

1. **Go to DNS Management**
2. **Add/Update A Record:**

   ```
   Type: A
   Name: api (or your preferred subdomain)
   Content: [YOUR_EC2_PUBLIC_IP]
   Proxy status: ✅ Proxied (orange cloud)
   TTL: Auto
   ```

3. **Verify DNS Propagation:**
   ```bash
   # Check DNS resolution
   nslookup api.yourdomain.com
   dig api.yourdomain.com
   ```

### 2. SSL/TLS Configuration

#### Option A: Cloudflare Managed SSL (Recommended)

1. **Go to SSL/TLS → Overview**
2. **Set SSL/TLS encryption mode to "Full (strict)"**

   - This ensures end-to-end encryption
   - Cloudflare will validate your Let's Encrypt certificate

3. **Enable "Always Use HTTPS"**
   - SSL/TLS → Edge Certificates
   - Turn on "Always Use HTTPS"

#### Option B: Cloudflare Origin Certificates (Alternative)

If you prefer Cloudflare-issued certificates:

1. **Go to SSL/TLS → Origin Server**
2. **Create Certificate**
3. **Download and replace your current certificates:**

   ```bash
   # Replace your current Let's Encrypt setup
   sudo cp cloudflare-origin.pem /opt/secrets-service/backend/certs/server.crt
   sudo cp cloudflare-origin.key /opt/secrets-service/backend/certs/server.key
   sudo chown ec2-user:ec2-user /opt/secrets-service/backend/certs/*
   sudo chmod 600 /opt/secrets-service/backend/certs/server.key
   sudo chmod 644 /opt/secrets-service/backend/certs/server.crt

   # Restart Nginx
   cd /opt/secrets-service/backend
   sudo docker-compose restart nginx
   ```

### 3. Performance & Security Settings

#### Page Rules

Create page rules for optimal performance:

1. **Go to Rules → Page Rules**
2. **Add rules:**
   ```
   URL Pattern: api.yourdomain.com/*
   Settings:
   - Browser Cache TTL: 4 hours
   - Security Level: Medium
   - SSL: Full (strict)
   ```

#### Security Headers

Cloudflare can add additional security headers:

1. **Go to Security → Settings**
2. **Enable these features:**
   - Security Level: Medium or High
   - Challenge Passage: 30 minutes
   - Browser Integrity Check: On

#### Firewall Rules (Optional)

Add firewall rules for additional protection:

1. **Go to Security → WAF**
2. **Create custom rules if needed**

### 4. Performance Optimization

#### Caching Rules

1. **Go to Rules → Page Rules**
2. **Create caching rules:**

   ```
   URL Pattern: api.yourdomain.com/health
   Settings: Cache Level: Bypass

   URL Pattern: api.yourdomain.com/api/*
   Settings: Cache Level: Bypass (for dynamic API responses)
   ```

#### Cloudflare Speed Settings

1. **Go to Speed → Optimization**
2. **Enable:**
   - Auto Minify: CSS, HTML, JavaScript
   - Brotli: On
   - HTTP/2: On

## Deployment with Cloudflare

### 1. Update GitHub Secrets

Add your domain to GitHub secrets if not already done:

```bash
# In your GitHub repository settings → Secrets and variables → Actions
DOMAIN_NAME=api.yourdomain.com
SSL_EMAIL=your-email@domain.com
```

### 2. Deploy Infrastructure

Your existing GitHub Actions workflow will work perfectly with Cloudflare:

```bash
# Push to main branch to trigger deployment
git add .
git commit -m "Configure for Cloudflare integration"
git push origin main
```

### 3. Point Domain to EC2

After deployment completes:

1. **Get EC2 IP from CloudFormation outputs**
2. **Update Cloudflare DNS A record** with the new IP
3. **Wait for DNS propagation** (usually 2-5 minutes with Cloudflare)

## Cloudflare-Specific Configuration

### Update Nginx for Cloudflare Real IP

Your current Nginx config is good, but you can optimize it for Cloudflare:

#### Real IP Restoration

Add these directives to get real visitor IPs:

```nginx
# Add to nginx.conf inside http block
real_ip_header CF-Connecting-IP;
set_real_ip_from 103.21.244.0/22;
set_real_ip_from 103.22.200.0/22;
# ... other Cloudflare IP ranges
```

#### Rate Limiting (Optional)

```nginx
# Add rate limiting
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;

# In server block
limit_req zone=api burst=20 nodelay;
```

## Benefits of Cloudflare Integration

### Security Benefits

- **DDoS Protection**: Automatic DDoS mitigation
- **Web Application Firewall**: Blocks malicious requests
- **Bot Management**: Filters out malicious bots
- **SSL/TLS**: Additional SSL layer with automatic certificate management

### Performance Benefits

- **Global CDN**: Content delivered from edge locations
- **HTTP/2 & HTTP/3**: Modern protocol support
- **Compression**: Automatic Gzip/Brotli compression
- **Caching**: Smart caching for static content

### Reliability Benefits

- **Load Balancing**: Distribute traffic across servers
- **Failover**: Automatic failover capabilities
- **Uptime Monitoring**: Monitor service availability

## Monitoring & Troubleshooting

### Cloudflare Analytics

Monitor your API usage:

1. **Go to Analytics & Logs**
2. **View metrics:**
   - Requests and bandwidth
   - Threat mitigation
   - Performance insights

### SSL/TLS Verification

```bash
# Test SSL chain
openssl s_client -connect api.yourdomain.com:443 -servername api.yourdomain.com

# Check certificate details
curl -vI https://api.yourdomain.com/health
```

### Common Issues & Solutions

#### Issue: SSL/TLS Errors

**Solution:** Ensure SSL mode is "Full (strict)" in Cloudflare

#### Issue: 525 SSL Handshake Failed

**Solution:** Check that your origin server has valid SSL certificate

#### Issue: Real IP not showing in logs

**Solution:** Configure real_ip module in Nginx (see above)

#### Issue: CORS errors with Cloudflare

**Solution:** Verify CORS headers are set by your Go application, not overridden by Cloudflare

## Testing Your Setup

### 1. Basic Connectivity

```bash
# Test direct connection
curl -I https://api.yourdomain.com/health

# Test with verbose output
curl -v https://api.yourdomain.com/health
```

### 2. SSL Certificate Verification

```bash
# Check certificate chain
curl -I https://api.yourdomain.com/health 2>&1 | grep -i "subject\|issuer"

# Test with SSL Labs
# Visit: https://www.ssllabs.com/ssltest/analyze.html?d=api.yourdomain.com
```

### 3. Header Verification

```bash
# Check security headers
curl -I https://api.yourdomain.com/health | grep -E "(CF-|Security|Strict-Transport)"

# Check CORS headers
curl -H "Origin: https://yourdomain.com" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: X-Requested-With" \
     -X OPTIONS \
     https://api.yourdomain.com/api/health
```

## Next Steps

1. ✅ **Configure Cloudflare DNS** with your EC2 IP
2. ✅ **Set SSL/TLS to Full (strict)**
3. ✅ **Enable security features** as needed
4. ✅ **Test your API endpoints**
5. ✅ **Monitor performance** in Cloudflare Analytics
6. ✅ **Update frontend** to use your new domain

## Support

- **Cloudflare Documentation**: https://developers.cloudflare.com/
- **SSL/TLS Guide**: https://developers.cloudflare.com/ssl/
- **API Documentation**: https://developers.cloudflare.com/api/

Your current setup with Nginx reverse proxy is perfectly compatible with Cloudflare and will provide excellent performance and security!
