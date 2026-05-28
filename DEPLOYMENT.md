# 🚀 Sena MERN Application - Complete Vercel Deployment Guide

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Pre-Deployment Checklist](#pre-deployment-checklist)
3. [MongoDB Atlas Setup](#mongodb-atlas-setup)
4. [Environment Variables Configuration](#environment-variables-configuration)
5. [Step-by-Step Deployment via Vercel Dashboard](#step-by-step-deployment-via-vercel-dashboard)
6. [Alternative: Deployment via Vercel CLI](#alternative-deployment-via-vercel-cli)
7. [Post-Deployment Verification](#post-deployment-verification)
8. [Troubleshooting Common Issues](#troubleshooting-common-issues)
9. [Production Hardening Checklist](#production-hardening-checklist)

---

## Architecture Overview

### Deployment Model: Combined Monorepo
```
┌─────────────────────────────────────────┐
│       Vercel Project (Single)           │
├──────────────────────────────────────────┤
│  Frontend Layer (sena-client/dist)       │ → Static Site (dist folder)
│  ✓ Vite-built React + TailwindCSS        │
├──────────────────────────────────────────┤
│  Backend Layer (api/index.js)            │ → Serverless Functions
│  ✓ Express.js with MongoDB               │   (/api/* routes)
└──────────────────────────────────────────┘
        ↓ (rewrite rules)
    MongoDB Atlas (external)
```

### File Structure Post-Configuration
```
sena-webprog/
├── api/
│   └── index.js                 ← NEW: Vercel Serverless handler
├── sena-client/
│   ├── dist/                    ← Frontend build output
│   ├── src/
│   ├── vite.config.js
│   └── package.json
├── sena-server/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── .env.example             ← NEW: Template for env vars
│   ├── index.js
│   └── package.json
├── vercel.json                  ← NEW: Deployment config
├── package.json                 ← UPDATED: Monorepo scripts
└── .gitignore                   ✓ Already has .env
```

---

## Pre-Deployment Checklist

- [ ] Install Node.js 20.x locally
- [ ] Clone repository and run: `npm install && npm install --workspace=sena-server && npm install --workspace=sena-client`
- [ ] Create MongoDB Atlas cluster (see next section)
- [ ] Verify `.env` files are in `.gitignore` (already configured ✓)
- [ ] Test locally: `npm run dev` (should run both client + server)
- [ ] Build frontend: `cd sena-client && npm run build` → confirms `dist/` folder exists
- [ ] Commit all changes: `git add . && git commit -m "Setup Vercel deployment"`
- [ ] Push to GitHub: `git push origin main`

---

## MongoDB Atlas Setup

### 1. Create/Access MongoDB Atlas Cluster

1. Go to [MongoDB Atlas Console](https://cloud.mongodb.com)
2. Sign in or create an account
3. Create a new project (or use existing)
4. Build a cluster:
   - **Tier**: Free (M0) for testing
   - **Region**: Closest to your target users
   - **Cloud Provider**: AWS (default)

### 2. Create Database User
1. Navigate to **Database Access** → **Add New Database User**
   - **Username**: `vercel_user` (or similar)
   - **Password**: Generate secure password (copy it!)
   - **Built-in Role**: `readWriteAnyDatabase`

### 3. Configure Network Access (Critical for Vercel)
1. Go to **Network Access** → **Add IP Address**
2. **Problem**: Vercel uses dynamic IPs, so standard IP whitelisting won't work
3. **Solution**: Allow all IPs (security: use strong password + IP list for other clusters)
   - Click **Add Entry**
   - Enter: `0.0.0.0/0` (Allow from anywhere)
   - Confirm

### 4. Get Connection String
1. **Clusters** → Click **Connect**
2. Select **Drivers** → Copy connection string
3. Format will be: `mongodb+srv://vercel_user:PASSWORD@cluster0.xxx.mongodb.net/databaseName?retryWrites=true&w=majority`
4. **Replace**: `<password>` with the actual password from Step 2
5. **Set DB name**: Change `databaseName` to your actual database (e.g., `senaDB`)

**Final URL example**:
```
mongodb+srv://vercel_user:Secure123Pass@cluster0.abc123.mongodb.net/senaDB?retryWrites=true&w=majority&appName=Cluster0
```

---

## Environment Variables Configuration

### Vercel Dashboard Setup
You'll set these **after** connecting your GitHub repo (Step 3.2 below).

| Variable | Value | Where to Get It |
|----------|-------|-----------------|
| `MONGO_URI` | `mongodb+srv://vercel_user:PASSWORD@cluster.mongodb.net/senaDB?...` | MongoDB Atlas (see above) |
| `JWT_SECRET` | `your-secure-random-string` | Generate: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `NODE_ENV` | `production` | Fixed value |
| `ALLOWED_ORIGINS` | `https://your-domain.vercel.app` | Your Vercel deployment domain |

### For Local Development
1. Create `.env` files (not in git):
   - `sena-server/.env`: Contains server variables
   - `sena-client/.env`: Contains `VITE_API_URL=http://localhost:8000/api`

---

## Step-by-Step Deployment via Vercel Dashboard

### Step 1: Create Vercel Account & Connect GitHub
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Sign up or log in (recommend GitHub signup)
3. Click **Add New** → **Project**
4. **Import Git Repository**:
   - Click **GitHub** (if not connected, authorize Vercel)
   - Select your `sena_webprog` repository
   - Click **Import**

### Step 2: Configure Project Settings
**Framework Preset**: Select **Other** (monorepo)

**Build & Development Settings**:

| Setting | Value |
|---------|-------|
| **Root Directory** | `.` (root, not a subdirectory) |
| **Build Command** | `npm run build --workspace=sena-client` |
| **Output Directory** | `sena-client/dist` |
| **Install Command** | `npm install` |

### Step 3: Add Environment Variables
1. Scroll down to **Environment Variables**
2. Add each variable from the table above:
   - Key: `MONGO_URI`
   - Value: Your MongoDB Atlas connection string
   - **Repeat for**: `JWT_SECRET`, `NODE_ENV`, `ALLOWED_ORIGINS`

3. **Important**: Select **Production** for each variable

### Step 4: Deploy
1. Click **Deploy**
2. Wait for the build to complete (~2-3 minutes)
3. Vercel will show you a deployment URL: `https://sena-webprog.vercel.app`

### Step 5: Verify Deployment
1. Visit your deployment URL
2. You should see the React frontend
3. Open DevTools → **Network** tab
4. Trigger a login/API call
5. Verify API request goes to `https://your-domain.vercel.app/api/users` ✓

---

## Alternative: Deployment via Vercel CLI

### Prerequisites
```bash
npm install -g vercel
```

### Deploy
```bash
# 1. Authenticate with Vercel
vercel login

# 2. Navigate to project root
cd sena_webprog

# 3. Deploy to production
vercel --prod

# When prompted:
# - Link to existing project? → Yes (if exists) or No (first time)
# - Build command? → npm run build --workspace=sena-client
# - Output directory? → sena-client/dist
# - Include source files? → No
```

### Set Environment Variables via CLI
```bash
vercel env add MONGO_URI
# Paste your MongoDB connection string

vercel env add JWT_SECRET
# Paste your JWT secret

vercel env add ALLOWED_ORIGINS
# Enter: https://your-domain.vercel.app
```

Then redeploy:
```bash
vercel --prod
```

---

## Post-Deployment Verification

### 1. Check Deployment Status
- Vercel Dashboard → Your Project → **Deployments** tab
- Look for a green checkmark next to the latest deployment

### 2. Test Frontend
```bash
curl https://your-domain.vercel.app
# Should return HTML (React app)
```

### 3. Test Backend Health Check
```bash
curl https://your-domain.vercel.app/api/health
# Should return: {"status":"OK"}
```

### 4. Test Full API Flow
- Open browser: `https://your-domain.vercel.app`
- Log in with test credentials
- Monitor Network tab for API calls
- All requests should show `Status: 200` ✓

### 5. Check Vercel Logs
1. Vercel Dashboard → Project → **Deployments**
2. Click the latest deployment
3. **Functions** tab → Click `api`
4. View logs for any errors

---

## Troubleshooting Common Issues

### Issue 1: "Cannot GET /" (Frontend Not Serving)

**Cause**: Build output directory incorrect

**Fix**:
```bash
# Verify build output
ls sena-client/dist/index.html

# Rebuild if missing
cd sena-client && npm run build && cd ..

# Commit and push
git add sena-client/dist && git commit -m "rebuild" && git push
```

Update vercel.json:
```json
{
  "builds": [{
    "src": "sena-client/package.json",
    "use": "@vercel/static-build",
    "config": { "distDir": "sena-client/dist" }
  }]
}
```

---

### Issue 2: API Calls Return CORS Errors

**Cause**: `ALLOWED_ORIGINS` env var not set, or frontend pointing to wrong URL

**Fix**:

1. Verify environment variables in Vercel Dashboard:
```bash
vercel env list
# Should show MONGO_URI, JWT_SECRET, ALLOWED_ORIGINS
```

2. Check frontend .env (for production):
   - Client should use: `VITE_API_URL=https://your-domain.vercel.app/api`
   - Rebuild: `cd sena-client && npm run build`

3. Verify vercel.json routes:
```json
{
  "routes": [
    { "src": "/api/(.*)", "dest": "api/index.js" },
    { "src": "/(.*)", "dest": "sena-client/dist/$1" }
  ]
}
```

---

### Issue 3: MongoDB Connection Timeout

**Cause**: IP whitelisting not configured, or wrong connection string

**Fix**:

1. Verify MongoDB Atlas Network Access:
   - Go to **Network Access** → Check if `0.0.0.0/0` is whitelisted
   - If not: **Add IP Address** → `0.0.0.0/0`

2. Test connection string locally:
```bash
# In sena-server/.env, set MONGO_URI and run:
node -e "require('./config/db')()"
# Should log: "Connected to MongoDB"
```

3. Check Vercel logs for error details:
   - Dashboard → Deployments → Latest → Functions → api → Logs

---

### Issue 4: "Function Timeout" (>10 seconds)

**Cause**: Long-running operations exceed Vercel's 10-second limit (pro plans: 60s)

**Solutions**:
- **Optimize queries**: Add MongoDB indexes
- **Upgrade plan**: Vercel Pro for longer timeouts
- **Implement caching**: Use Redis/in-memory cache
- **Async jobs**: Move heavy operations to background tasks

**Check**:
```bash
# Add logging to identify slow endpoints
console.time('query-users');
const users = await User.find();
console.timeEnd('query-users');
```

---

### Issue 5: 502 / 500 Errors on API Calls

**Cause**: Unhandled errors in Express routes

**Debug**:
1. Vercel Dashboard → Deployments → Functions → api → Logs
2. Check for error stack traces
3. Review MongoDB error: `MongooseError`, `ValidationError`, etc.

**Add Error Logging**:
In `api/index.js`:
```javascript
app.use((err, req, res, next) => {
  console.error('[API Error]', new Date(), err);
  res.status(500).json({ 
    message: 'Server Error',
    ...(process.env.NODE_ENV === 'development' && { error: err.message })
  });
});
```

---

## Production Hardening Checklist

### 1. Security Best Practices

- [ ] **Environment Variables**
  - [ ] `JWT_SECRET` is strong (32+ chars, random)
  - [ ] `MONGO_URI` password is secure
  - [ ] All secrets are in Vercel, NOT in code

- [ ] **CORS Configuration** (api/index.js)
  ```javascript
  const corsOptions = {
    origin: process.env.ALLOWED_ORIGINS || 'https://yourdomain.vercel.app',
    credentials: true,
  };
  ```

- [ ] **Rate Limiting** (prevent brute force)
  ```bash
  npm install express-rate-limit
  ```
  Add to api/index.js:
  ```javascript
  const rateLimit = require('express-rate-limit');
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  });
  app.use('/api/users/login', limiter);
  ```

- [ ] **Input Validation**
  - Use `joi` or `zod` to validate all incoming data
  - Example: `npm install joi`

### 2. Database Security

- [ ] MongoDB Atlas:
  - [ ] Enable **IP Whitelisting** (if possible; Vercel requires 0.0.0.0/0)
  - [ ] Use **Database User** with minimal permissions
  - [ ] Enable **Encryption at Rest** (Pro tier)
  - [ ] Regular backups enabled

- [ ] Mongoose:
  - [ ] Add `.select('-password')` when fetching users
  - [ ] Hash passwords before saving: `bcryptjs`

### 3. API Security

- [ ] **JWT Verification**
  ```javascript
  const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token' });
    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch {
      res.status(401).json({ message: 'Invalid token' });
    }
  };
  ```

- [ ] **Protected Routes**
  ```javascript
  router.get('/profile', verifyToken, (req, res) => {
    // Only accessible with valid JWT
  });
  ```

### 4. Monitoring & Logging

- [ ] **Vercel Analytics**
  - Enable in Vercel Dashboard → Settings → Analytics
  - Monitor: Request latency, error rates, cold starts

- [ ] **Error Tracking** (optional but recommended)
  - Integrate Sentry: `npm install @sentry/node`
  - Or Rollbar, LogRocket, etc.

- [ ] **Custom Logging**
  ```javascript
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  ```

### 5. Performance Optimization

- [ ] **Database Indexing**
  ```javascript
  // In models/User.js
  UserSchema.index({ email: 1 }); // Speed up email lookups
  ```

- [ ] **API Response Compression**
  ```bash
  npm install compression
  ```
  ```javascript
  const compression = require('compression');
  app.use(compression());
  ```

- [ ] **Caching**
  - Cache static assets (Vercel does this automatically)
  - Cache API responses where appropriate

### 6. Deployment Hygiene

- [ ] **No Sensitive Data in Git**
  - Run: `git log --all --full-history -- sena-server/.env`
  - If found: `git filter-branch --force --index-filter 'git rm -r --cached --ignore-unmatch sena-server/.env' --prune-empty --tag-name-filter cat -- --all`

- [ ] **Staging Environment**
  - Create a staging branch: `git checkout -b staging`
  - Deploy staging to Vercel (separate project)
  - Test before merging to main

- [ ] **Rollback Plan**
  - Keep previous deployments: Vercel keeps last 24 hours
  - Use `vercel rollback` if needed
  - Test rollback procedure before going live

---

## Quick Reference: Key Files

| File | Purpose |
|------|---------|
| `vercel.json` | Routing rules, build config, env vars |
| `api/index.js` | Express app export for serverless |
| `sena-client/vite.config.js` | Frontend build config |
| `sena-server/index.js` | Original server (keep for local dev) |
| `.env` | Local secrets (NOT in git) |
| `sena-server/.env.example` | Template for env vars |

---

## Post-Deployment: Domain & Custom URLs

1. **Free Vercel Domain**: `https://projectname.vercel.app`
2. **Custom Domain**:
   - Vercel Dashboard → Settings → Domains
   - Add your domain (e.g., `app.example.com`)
   - Update DNS records per Vercel instructions
   - Update `ALLOWED_ORIGINS` env var

---

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Atlas Guide**: https://docs.atlas.mongodb.com/
- **Express.js Guide**: https://expressjs.com/
- **Serverless Best Practices**: https://vercel.com/docs/functions/serverless-functions

---

**Last Updated**: May 2026 | **Status**: Ready for Production ✅
