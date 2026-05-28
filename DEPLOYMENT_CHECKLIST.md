# 🚀 Deployment Checklist - Sena MERN Application

## Phase 1: Pre-Deployment Setup (Local)
- [ ] Verify Node.js version: `node --version` (need 20.x+)
- [ ] Install dependencies: `npm install && npm install --workspace=sena-server && npm install --workspace=sena-client`
- [ ] Test locally: `npm run dev` (should run both client on 5173 + server on 8000)
- [ ] Verify frontend builds: `cd sena-client && npm run build` (creates `dist/` folder)
- [ ] Check MongoDB Atlas credentials are correct in `sena-server/.env`
- [ ] Test API endpoints locally via Postman or `curl`
- [ ] Commit changes: `git add . && git commit -m "Setup Vercel deployment configuration"`
- [ ] Push to GitHub: `git push origin main`

## Phase 2: MongoDB Atlas Setup (5-10 minutes)
- [ ] Create free MongoDB cluster (https://cloud.mongodb.com)
- [ ] Create database user: `vercel_user`
- [ ] Whitelist IP: `0.0.0.0/0` (Vercel requires this)
- [ ] Get connection string from Atlas
- [ ] Format it correctly: `mongodb+srv://user:password@cluster.mongodb.net/dbname?...`
- [ ] Test locally with this connection string
- [ ] Save connection string (you'll need it for Vercel)

## Phase 3: Vercel Deployment (Via Dashboard) - Recommended for First-Time
- [ ] Create Vercel account: https://vercel.com
- [ ] Authorize GitHub
- [ ] Import project: sena_webprog
- [ ] **Root Directory**: `.` (leave blank)
- [ ] **Build Command**: `npm run build --workspace=sena-client`
- [ ] **Output Directory**: `sena-client/dist`
- [ ] Add Environment Variables:
  - [ ] `MONGO_URI` = your MongoDB connection string
  - [ ] `JWT_SECRET` = generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
  - [ ] `NODE_ENV` = `production`
  - [ ] `ALLOWED_ORIGINS` = `https://your-domain.vercel.app` (will show after deploy)
- [ ] Deploy
- [ ] Wait for deployment to complete (~2-3 minutes)

## Phase 4: Post-Deployment Verification
- [ ] Visit your Vercel deployment URL
- [ ] Frontend loads (see React app)
- [ ] Test API: Open DevTools → Network tab
- [ ] Perform login or API action
- [ ] Verify API calls go to `https://your-domain.vercel.app/api/*`
- [ ] Check Vercel logs for errors: Dashboard → Deployments → Latest → Functions → api
- [ ] Test `/api/health` endpoint: should return `{"status":"OK"}`

## Phase 5: Production Hardening
- [ ] [ ] Add rate limiting to login endpoint
- [ ] [ ] Implement password hashing verification in login
- [ ] [ ] Add JWT verification middleware to protected routes
- [ ] [ ] Enable HTTPS (Vercel does this automatically)
- [ ] [ ] Set up error logging (Sentry or similar)
- [ ] [ ] Add request logging to API routes
- [ ] [ ] Review and test all authentication flows
- [ ] [ ] Check MongoDB backups are enabled
- [ ] [ ] Document all environment variables
- [ ] [ ] Create README for future deployments

## Phase 6: Ongoing Maintenance
- [ ] [ ] Monitor Vercel analytics (latency, error rates)
- [ ] [ ] Set up alerts for deployment failures
- [ ] [ ] Regular security audits: `npm audit`
- [ ] [ ] Update dependencies monthly: `npm outdated`
- [ ] [ ] Test rollback procedure: `vercel rollback`
- [ ] [ ] Document any custom configurations

---

## If Something Goes Wrong

| Error | Check First |
|-------|-------------|
| "Cannot GET /" | Frontend build output exists: `ls sena-client/dist/index.html` |
| CORS errors | Verify `ALLOWED_ORIGINS` env var in Vercel Dashboard |
| Database timeout | Check MongoDB IP whitelist: `0.0.0.0/0` enabled |
| API 502 error | View Vercel logs: Deployments → Functions → api → Logs |
| Function timeout | Your query is too slow; add MongoDB indexes |

**See DEPLOYMENT.md for detailed troubleshooting**

---

## Quick Commands

```bash
# Build frontend
cd sena-client && npm run build

# Deploy via CLI
npm install -g vercel
vercel --prod

# View logs
vercel logs <function-name>

# Rollback if needed
vercel rollback
```

---

**Status**: Ready for deployment ✅
**Estimated Time**: 20-30 minutes total
**Support**: See DEPLOYMENT.md for troubleshooting
