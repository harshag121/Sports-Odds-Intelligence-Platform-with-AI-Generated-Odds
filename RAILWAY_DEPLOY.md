# Deploy on Railway (Simple - No Blueprint)

## FREE: $5/month credit (no CC on signup!)

---

## Step 1: Frontend on Vercel (1 minute)

1. Go to **https://vercel.com**
2. Sign up with GitHub
3. Click "Import Project"
4. Select your repo
5. **Root Directory**: `frontend`
6. **Build Command**: `npm run build`
7. **Output Directory**: `dist`
8. Add env: `VITE_API_URL=https://your-railway-backend.up.railway.app/api`
9. Deploy!

✅ Frontend live at: `https://your-app.vercel.app`

---

## Step 2: Backend on Railway

1. Go to **https://railway.app**
2. Sign up with **GitHub (no CC needed!)**
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repo
6. Select `backend` folder
7. **Environment Variable**:
   ```
   PYTHON_SERVICE_URL=https://your-ai-service.up.railway.app
   NODE_ENV=production
   PORT=3000
   ```
8. Deploy! Wait 2-3 min

✅ Backend live at: `https://your-railway-backend.up.railway.app`

---

## Step 3: AI Service on Railway

1. (In Railway) Click "New Project" again
2. Select your repo
3. Select `ai-service` folder
4. Remove `Dockerfile` if exists (Railway auto-detects Python)
5. **Environment**:
   ```
   PORT=8000
   ```
6. Deploy! Wait 2-3 min

✅ AI live at: `https://your-ai-service.up.railway.app`

---

## Done! Your URLs:
- Frontend: https://your-app.vercel.app
- Backend: https://your-railway-backend.up.railway.app
- AI: https://your-ai-service.up.railway.app

**Cost: $0** (using $5 Railway credit)

---

## If Railway Asks for CC

Railway gives $5 free credit. If it asks for CC:
1. Just skip/close that screen
2. You still get free tier ($5 credit)
3. No charge unless you exceed $5

