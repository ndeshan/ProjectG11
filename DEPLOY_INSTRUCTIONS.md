# Complete Vercel Deployment Guide

## 🚀 Ready to Deploy - All Files Configured!

### Step 1: Go to Vercel
Visit: https://vercel.com/new?teamSlug=g1-1e265e65

### Step 2: Upload Project
- Click "Browse" or drag your ProjectG1 folder
- Or connect GitHub and select this repository

### Step 3: Configure Settings
- **Framework Preset**: Other
- **Build Command**: `composer install --no-dev --optimize-autoloader && composer run vercel-build`
- **Output Directory**: `public`
- **Install Command**: `composer install --no-dev`

### Step 4: Add Environment Variables
```
APP_KEY=base64:h83CiPrjZJYsCvyKqxqny49xtncEPkZBuuyx2FXtKSo=
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-project-name.vercel.app
LOG_CHANNEL=stderr
SESSION_DRIVER=cookie
DB_CONNECTION=sqlite
```

### Step 5: Deploy
Click "Deploy" button

## ✅ Files Already Created:
- `vercel.json` - Vercel configuration
- `api/index.php` - Entry point for serverless
- `.vercelignore` - Deployment exclusions
- `composer.json` - Updated with build script

## 🎯 Your Laravel app will be live in 2-3 minutes!

**Note**: Replace `your-project-name` in APP_URL with your actual Vercel domain after deployment.