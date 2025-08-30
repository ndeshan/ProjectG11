@echo off
echo 🚀 Deploying University of Ruhuna Digital Canteen to Firebase...
echo.

echo 📦 Building React frontend...
cd frontend
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Build failed!
    pause
    exit /b 1
)

echo ✅ Build completed successfully!
echo.

echo 🔥 Deploying to Firebase...
cd ..
call firebase deploy
if %errorlevel% neq 0 (
    echo ❌ Deployment failed!
    pause
    exit /b 1
)

echo.
echo ✅ Deployment completed successfully!
echo 🌐 Live URL: https://hackethong1.web.app
echo.
pause