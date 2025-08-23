# 🚀 FREE Deployment Guide - Vercel + Supabase

## Step 1: Setup Supabase (100% FREE)

1. **Go to [supabase.com](https://supabase.com)**
2. **Sign up with GitHub**
3. **Create new project**
   - Project name: `sri-lankan-campus-canteen`
   - Database password: (generate strong password)
4. **Copy your credentials:**
   - Project URL: `https://xxx.supabase.co`
   - Anon key: `eyJhbGc...`

## Step 2: Setup Database

1. **Go to SQL Editor in Supabase**
2. **Copy and paste the entire content from `supabase-schema.sql`**
3. **Run the SQL** - This creates all tables and sample data

## Step 3: Setup Vercel (100% FREE)

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign up with GitHub**
3. **Import your GitHub repository**
4. **Configure build settings:**
   - Framework: `Create React App`
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`

## Step 4: Add Environment Variables in Vercel

1. **Go to Project Settings → Environment Variables**
2. **Add these variables:**
   ```
   REACT_APP_SUPABASE_URL = https://your-project.supabase.co
   REACT_APP_SUPABASE_ANON_KEY = your-anon-key
   ```

## Step 5: Deploy

1. **Push code to GitHub**
2. **Vercel auto-deploys**
3. **Your site is live!**

## 🎉 Expected Result

- **Frontend URL:** `https://your-project.vercel.app`
- **Database:** Supabase PostgreSQL
- **Cost:** $0 forever
- **Features:** All working (menu, orders, queue status)

## 📱 Test Your Deployment

1. Visit your Vercel URL
2. Browse Sri Lankan menu items
3. Place test orders
4. Check queue status
5. Access admin panel at `/admin`

## 🔧 Troubleshooting

- **Build fails:** Check `frontend/package.json` dependencies
- **API errors:** Verify Supabase environment variables
- **Database empty:** Re-run the SQL schema

## 💡 Pro Tips

- **Custom domain:** Add in Vercel settings (FREE)
- **Analytics:** Enable Vercel Analytics (FREE)
- **Performance:** Vercel provides global CDN automatically

Your Sri Lankan Campus Canteen is now live and serving students worldwide! 🇱🇰🍛