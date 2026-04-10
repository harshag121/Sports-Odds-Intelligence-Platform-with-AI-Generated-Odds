# Deploy to Fly.io (Completely FREE!)

## ✅ Why Fly.io?
- **NO payment info needed**
- **3 free shared-cpu instances included**
- **Free PostgreSQL database** (if needed)
- **Free SSL/HTTPS**
- Automatic deployments from GitHub

---

## Quick Setup (5 minutes)

### Step 1: Install Fly CLI
```bash
# Windows (via PowerShell or WSL)
iwr https://fly.io/install.ps1 -useb | iex

# Or download: https://fly.io/docs/getting-started/installing-flyctl/
```

### Step 2: Sign Up (Free Account)
```bash
flyctl auth signup
# Choose: Email signup
# No credit card required!
```

### Step 3: Deploy All 3 Services

#### Service 1: AI Service (Python/FastAPI)
```bash
cd ai-service
flyctl launch --name sports-odds-ai
# When asked: 
#   - Region: Choose nearest (us-west, eu-west, etc)
#   - Postgres: No
#   - Deploy now: Yes

# Wait 2-3 minutes for deployment
```

#### Service 2: Backend API (Node/Express)
```bash
cd ../backend
flyctl launch --name sports-odds-api
# When asked:
#   - Region: Same as AI service
#   - Postgres: No
#   - Deploy now: Yes

# Set environment variable
flyctl secrets set PYTHON_SERVICE_URL=https://sports-odds-ai.fly.dev
```

#### Service 3: Frontend (React/Vite)
```bash
cd ../frontend
flyctl launch --name sports-odds-frontend
# When asked:
#   - Region: Same as others
#   - Postgres: No
#   - Deploy now: Yes

# Set environment variable
flyctl secrets set VITE_API_URL=https://sports-odds-api.fly.dev/api
```

### Step 4: Check Status
```bash
# View all your apps
flyctl apps list

# View logs
flyctl logs -a sports-odds-api
flyctl logs -a sports-odds-ai
flyctl logs -a sports-odds-frontend
```

---

## Your Live URLs

After deployment:
- **Frontend**: https://sports-odds-frontend.fly.dev
- **API**: https://sports-odds-api.fly.dev/api
- **AI Service**: https://sports-odds-ai.fly.dev

---

## Free Tier Limits

| Resource | Limit |
|----------|-------|
| Apps | Unlimited |
| Shared-CPU instances | 3 free |
| RAM per instance | 256MB |
| Storage | 3GB |
| Data transfer | 160GB/month |

✅ **Your app uses: 0 cost** 🎉

---

## Update & Redeploy

```bash
git add .
git commit -m "update"
git push origin main

# Then deploy (auto-redeploy via CI/CD or manual):
flyctl deploy -a sports-odds-frontend
flyctl deploy -a sports-odds-api
flyctl deploy -a sports-odds-ai
```

---

## Troubleshooting

**"Error: failed to authenticate"**
- Run: `flyctl auth signup` or `flyctl auth login`

**App won't start (502 error)**
- Check logs: `flyctl logs -a app-name`
- Restart: `flyctl restart -a app-name`

**Connection between services failing**
- Add environment secrets: `flyctl secrets set VAR_NAME=value`
- Redeploy: `flyctl deploy -a app-name`

---

## Next Steps (Optional)

- Add Prometheus monitoring: `flyctl open /metrics`
- Scale instances: `flyctl scale count 2` (uses free tier)
- Custom domain: `flyctl certs create` (requires domain)

