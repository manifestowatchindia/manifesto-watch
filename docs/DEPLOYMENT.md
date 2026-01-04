# Deployment Guide

This guide covers deploying Manifesto Watch to Vercel or Netlify.

## Prerequisites

- Node.js 16+ installed locally
- Git repository connected to GitHub
- Backend API running (required for full functionality)

---

## 🚀 Deploy to Vercel (Recommended)

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/manifestowatchindia/manifesto-watch)

### Manual Deployment

#### 1. Install Vercel CLI

```bash
npm install -g vercel
```

#### 2. Login to Vercel

```bash
vercel login
```

#### 3. Deploy from Project Directory

```bash
cd manifesto-watch
vercel
```

Follow the prompts:
- **Set up and deploy?** Yes
- **Which scope?** Select your account
- **Link to existing project?** No (for first deployment)
- **Project name?** manifesto-watch (or your preferred name)
- **Directory with code?** ./ (press Enter)
- **Want to override settings?** No

#### 4. Configure Environment Variables

In Vercel dashboard or via CLI:

```bash
vercel env add REACT_APP_API_BASE_URL
```

**Environment Variables:**
- `REACT_APP_API_BASE_URL` - Your backend API URL (e.g., `https://api.manifestowatch.in`)

Or add via Vercel Dashboard:
1. Go to Project Settings → Environment Variables
2. Add `REACT_APP_API_BASE_URL` = `https://your-backend-url.com`
3. Redeploy: `vercel --prod`

#### 5. Deploy to Production

```bash
vercel --prod
```

### Build Settings (Vercel)

- **Framework Preset:** Create React App
- **Build Command:** `npm run build`
- **Output Directory:** `build`
- **Install Command:** `npm install`
- **Node Version:** 16.x or higher

### Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain (e.g., `www.manifestowatch.in`)
3. Follow DNS configuration instructions
4. Vercel will automatically provision SSL

---

## 🌐 Deploy to Netlify

### Quick Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/manifestowatchindia/manifesto-watch)

### Manual Deployment

#### 1. Install Netlify CLI

```bash
npm install -g netlify-cli
```

#### 2. Login to Netlify

```bash
netlify login
```

#### 3. Initialize Site

```bash
cd manifesto-watch
netlify init
```

Follow the prompts:
- **Create & configure a new site?** Yes
- **Team:** Select your team
- **Site name:** manifesto-watch (or preferred name)
- **Build command:** `npm run build`
- **Deploy directory:** `build`

#### 4. Configure Environment Variables

Create `netlify.toml` in project root:

```toml
[build]
  command = "npm run build"
  publish = "build"

[build.environment]
  NODE_VERSION = "16"
  REACT_APP_API_BASE_URL = "https://your-backend-url.com"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Or set via CLI:

```bash
netlify env:set REACT_APP_API_BASE_URL https://your-backend-url.com
```

Or via Netlify Dashboard:
1. Site Settings → Build & Deploy → Environment
2. Add `REACT_APP_API_BASE_URL`

#### 5. Deploy

```bash
netlify deploy --prod
```

### Build Settings (Netlify)

- **Base directory:** (leave empty)
- **Build command:** `npm run build`
- **Publish directory:** `build`
- **Node version:** 16 or higher

### Custom Domain (Optional)

1. Go to Site Settings → Domain Management
2. Add custom domain
3. Configure DNS records
4. SSL certificate auto-provisioned

---

## 🔧 Environment Configuration

### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_BASE_URL` | Backend API base URL | `https://api.manifestowatch.in` |

### Development vs Production

**Development (`.env.development`):**
```env
REACT_APP_API_BASE_URL=http://127.0.0.1:8000
```

**Production (Set in deployment platform):**
```env
REACT_APP_API_BASE_URL=https://api.manifestowatch.in
```

---

## ⚠️ Important Notes

### Backend Dependency

This frontend **requires** a running backend API. Ensure your backend is deployed and accessible before deploying the frontend.

**Backend deployment options:**
- Railway
- Render
- DigitalOcean App Platform
- AWS ECS/EC2
- Google Cloud Run
- Azure App Service

### CORS Configuration

Your backend must allow CORS from your frontend domain:

```python
# FastAPI backend example
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://manifestowatch.in",
        "https://www.manifestowatch.in",
        "https://manifesto-watch.vercel.app"  # Vercel preview URLs
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 🚦 Post-Deployment Checklist

- [ ] Frontend deployed successfully
- [ ] Backend API accessible from frontend
- [ ] Environment variables configured
- [ ] CORS properly set up
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Test all routes work
- [ ] Test API integration (promises loading)
- [ ] Check SEO meta tags
- [ ] Verify sitemap.xml accessible
- [ ] Verify robots.txt accessible
- [ ] Test on mobile devices
- [ ] Monitor for errors in deployment logs

---

## 📊 Monitoring & Logs

### Vercel

```bash
# View deployment logs
vercel logs

# View production logs
vercel logs --prod
```

Dashboard: https://vercel.com/dashboard

### Netlify

```bash
# View build logs in dashboard
netlify open
```

Dashboard: https://app.netlify.com

---

## 🔄 Continuous Deployment

### GitHub Integration

Both Vercel and Netlify support automatic deployments:

1. **Connect GitHub Repository**
   - Vercel: Dashboard → Import Project
   - Netlify: Dashboard → New Site from Git

2. **Configure Branch**
   - Production branch: `production` or `main`
   - Preview branches: All other branches

3. **Auto-Deploy**
   - Every push to production branch → auto-deploy to production
   - Every PR → deploy preview URL

---

## 🐛 Troubleshooting

### Build Fails

**Issue:** Build command fails  
**Solution:** Check Node version, run `npm install` locally first

### API Connection Fails

**Issue:** Frontend can't reach backend  
**Solution:** 
1. Verify `REACT_APP_API_BASE_URL` is set
2. Check backend CORS configuration
3. Ensure backend is running and accessible

### Routing Issues (404 on Refresh)

**Issue:** Page refresh gives 404  
**Solution:** Ensure SPA redirects are configured (both platforms handle this automatically for CRA)

### Environment Variables Not Working

**Issue:** `process.env.REACT_APP_*` is undefined  
**Solution:**
1. Variable must start with `REACT_APP_`
2. Rebuild after adding variables
3. Clear build cache and redeploy

---

## 📱 Performance Optimization

### Vercel

- Automatic image optimization
- Edge caching enabled by default
- Brotli compression

### Netlify

- Asset optimization (enable in Build & Deploy settings)
- Split testing (A/B testing)
- Form handling

---

## 💰 Cost Estimates

### Vercel

- **Free Tier:** 
  - 100GB bandwidth
  - Unlimited deployments
  - Perfect for this project

### Netlify

- **Free Tier:**
  - 100GB bandwidth
  - 300 build minutes/month
  - Perfect for this project

---

## 🆘 Support

- **Vercel Docs:** https://vercel.com/docs
- **Netlify Docs:** https://docs.netlify.com
- **Project Issues:** https://github.com/manifestowatchindia/manifesto-watch/issues
