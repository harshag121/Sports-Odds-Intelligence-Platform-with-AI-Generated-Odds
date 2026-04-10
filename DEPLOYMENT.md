# Deployment Guide - Render.com

## Quick Deploy (Free Tier)

### Step 1: Push to GitHub
```bash
git add -A
git commit -m "Ready for Render deployment"
git push origin main
```

### Step 2: Connect to Render
1. Go to https://render.com
2. Sign up / Log in with GitHub
3. Use "Deploy from Git" → "Web Service"
4. Connect your GitHub repo

### Step 3: Deploy Each Service

#### Option A: Auto-Deploy with YAML (Recommended)
Render supports `render.yaml` - just push and it deploys all 3 services!

1. Dashboard → "New +" → "Blueprint"
2. Select your GitHub repo
3. Render auto-detects `render.yaml` and deploys all services

#### Option B: Manual Deploy (3 steps)

**Service 1: Frontend (Static)**
- Service Name: `sports-odds-frontend`
- Build Command: `cd frontend && npm install && npm run build`
- Publish Directory: `frontend/dist`
- Environment: `VITE_API_URL=https://sports-odds-api.onrender.com/api`

**Service 2: Backend API**
- Service Name: `sports-odds-api`
- Runtime: Node
- Build Command: `cd backend && npm install && npm run build`
- Start Command: `node dist/server.js`
- Environment Variables:
  ```
  PORT=3000
  PYTHON_SERVICE_URL=https://sports-odds-ai.onrender.com
  NODE_ENV=production
  JWT_SECRET=your-secure-secret-key
  JWT_REFRESH_SECRET=your-secure-refresh-key
  FRONTEND_URL=https://sports-odds-frontend.onrender.com
  ```

**Service 3: AI Service (Python)**
- Service Name: `sports-odds-ai`
- Runtime: Python 3.11
- Build Command: `pip install -r ai-service/requirements.txt`
- Start Command: `cd ai-service && uvicorn app.main:app --host 0.0.0.0 --port 8000`
- Environment: `PORT=8000`

### Step 4: Wait for Deployment
All 3 services should be "Live" in 5-10 minutes

✅ Frontend: `https://sports-odds-frontend.onrender.com`
✅ API: `https://sports-odds-api.onrender.com/api`
✅ AI Service: `https://sports-odds-ai.onrender.com`

---

## Free Tier Limitations

| Feature | Limit |
|---------|-------|
| Services | 2 free web + unlimited static |
| RAM | 512MB per service |
| CPU | 0.1 vCPU |
| Auto-sleep | ✅ After 15 min inactivity |
| Deployments | Unlimited |
| Build time | 30 min max |

**Cold Start Issue:** First request takes 30-50s (service spinning up)
**Solution:** Upgrade to paid ($7/month) or use Railway ($5/month credit)

---

## Environment Variables to Change

Before going to production, update:

```bash
JWT_SECRET=              # Generate: openssl rand -hex 32
JWT_REFRESH_SECRET=      # Generate: openssl rand -hex 32
FRONTEND_URL=            # Your actual frontend domain
PYTHON_SERVICE_URL=      # Your actual AI service domain
```

## Monitoring

Check logs:
1. Render Dashboard → Service → Logs tab
2. Look for startup messages

Check status:
- All 3 services should show "Live" ✅

## Rollback

If something breaks:
1. Render Dashboard → Service → "Manual Deploy"
2. Select previous commit
3. Deploy

---

## Issues & Troubleshooting

**Frontend shows "Cannot connect to API"**
- Wait 2 min (services might still spinning up)
- Check VITE_API_URL in Render dashboard
- Verify Backend service is running

**AI Service returning 502 error**
- Restart service in Render dashboard
- Check Python dependencies in requirements.txt

**Build failing**
- Check build logs in Render dashboard  
- Verify package.json and requirements.txt exist
- Ensure Node/Python versions are compatible

