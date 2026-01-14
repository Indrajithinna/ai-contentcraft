# Deployment Guide

This guide will help you deploy AI ContentCraft to various platforms.

## Prerequisites

- Node.js 18+ installed
- API keys configured
- Git repository set up

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

## Deployment Options

### 1. Vercel (Recommended)

Vercel offers the easiest deployment for Vite applications.

#### Steps:

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Add environment variables in Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add `API_KEY` and `ELEVEN_LABS_API_KEY`

#### Automatic Deployments:

Connect your GitHub repository to Vercel for automatic deployments on every push.

### 2. Netlify

#### Steps:

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login:
```bash
netlify login
```

3. Deploy:
```bash
netlify deploy --prod
```

4. Add environment variables:
```bash
netlify env:set API_KEY your_key
netlify env:set ELEVEN_LABS_API_KEY your_key
```

### 3. GitHub Pages

#### Steps:

1. Update `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/ai-contentcraft/',
  // ... rest of config
});
```

2. Build:
```bash
npm run build
```

3. Deploy using gh-pages:
```bash
npm install -g gh-pages
gh-pages -d dist
```

**Note**: GitHub Pages doesn't support environment variables. You'll need to use a different approach for API keys.

### 4. Docker

#### Dockerfile:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

#### Build and Run:

```bash
docker build -t ai-contentcraft .
docker run -p 3000:3000 -e API_KEY=your_key -e ELEVEN_LABS_API_KEY=your_key ai-contentcraft
```

### 5. AWS S3 + CloudFront

1. Build the project
2. Upload `dist/` to S3 bucket
3. Configure CloudFront distribution
4. Set up environment variables using Lambda@Edge

## Environment Variables

All platforms require these environment variables:

- `API_KEY` - Google Gemini API key
- `ELEVEN_LABS_API_KEY` - ElevenLabs API key

## Post-Deployment Checklist

- [ ] Verify all API keys are set correctly
- [ ] Test text generation
- [ ] Test image generation
- [ ] Test audio generation
- [ ] Check browser console for errors
- [ ] Verify HTTPS is enabled
- [ ] Test on mobile devices
- [ ] Monitor API usage

## Troubleshooting

### API Keys Not Working

- Ensure environment variables are set in your deployment platform
- Restart the deployment after adding variables
- Check variable names match exactly

### Build Fails

- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version`
- Review build logs for specific errors

### CORS Errors

- Ensure your API keys have the correct permissions
- Check if your deployment platform requires additional CORS configuration

## Performance Optimization

1. **Enable Compression**: Most platforms enable this by default
2. **CDN**: Use CloudFront or similar CDN for faster global access
3. **Caching**: Configure appropriate cache headers
4. **Image Optimization**: Images are generated on-demand, consider caching

## Monitoring

- Set up error tracking (e.g., Sentry)
- Monitor API usage in Google AI Studio
- Track ElevenLabs quota usage
- Set up uptime monitoring

## Scaling

For high-traffic applications:
- Use a CDN for static assets
- Implement request queuing for API calls
- Consider serverless functions for API proxying
- Monitor and optimize API costs

## Support

For deployment issues, check:
1. Platform-specific documentation
2. Build logs for errors
3. Browser console for runtime errors
4. API service status pages
