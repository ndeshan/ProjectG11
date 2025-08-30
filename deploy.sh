#!/bin/bash

echo "🚀 Deploying University of Ruhuna Digital Canteen to Firebase..."
echo

echo "📦 Building React frontend..."
cd frontend
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build completed successfully!"
echo

echo "🔥 Deploying to Firebase..."
cd ..
firebase deploy
if [ $? -ne 0 ]; then
    echo "❌ Deployment failed!"
    exit 1
fi

echo
echo "✅ Deployment completed successfully!"
echo "🌐 Live URL: https://hackethong1.web.app"
echo