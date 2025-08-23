# Deploy to Vercel

## Quick Deploy Steps:

1. **Go to your Vercel dashboard**: https://vercel.com/new?teamSlug=g1-1e265e65

2. **Import Git Repository**:
   - Connect your GitHub/GitLab account
   - Select this project repository
   - Or upload project folder directly

3. **Configure Build Settings**:
   - Framework Preset: **Other**
   - Build Command: `composer install --no-dev --optimize-autoloader && composer run vercel-build`
   - Output Directory: `public`
   - Install Command: `composer install --no-dev`

4. **Add Environment Variables**:
   ```
   APP_KEY=base64:YOUR_APP_KEY_HERE
   APP_ENV=production
   APP_DEBUG=false
   APP_URL=https://your-app.vercel.app
   LOG_CHANNEL=stderr
   SESSION_DRIVER=cookie
   ```

5. **Generate APP_KEY**:
   ```bash
   php artisan key:generate --show
   ```

6. **Deploy**: Click "Deploy" button

## Files Ready:
✅ `vercel.json` - Configuration
✅ `api/index.php` - Entry point  
✅ `.vercelignore` - Ignore rules
✅ `composer.json` - Build script added

Your Laravel app is ready for Vercel deployment!