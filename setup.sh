#!/bin/bash

echo "🚀 Setting up Campus Canteen Management System..."

# Backend Setup
echo "📦 Setting up Laravel backend..."
cd backend

# Install dependencies
composer install

# Environment setup
if [ ! -f .env ]; then
    cp .env.example .env
    php artisan key:generate
fi

# Create database file
touch database/database.sqlite

# Run migrations and seeders
php artisan migrate:fresh --seed

echo "✅ Backend setup complete!"

# Frontend Setup
echo "📦 Setting up React frontend..."
cd ../frontend

# Install dependencies
npm install

echo "✅ Frontend setup complete!"

cd ..

echo "🎉 Campus Canteen Management System is ready!"
echo ""
echo "To start the application:"
echo "1. Backend: cd backend && php artisan serve --port=8001"
echo "2. Frontend: cd frontend && npm start"
echo "3. Or use: ./start-dev.sh"
echo ""
echo "URLs:"
echo "- Student App: http://localhost:3000"
echo "- Admin Panel: http://localhost:3000/admin"
echo "- API: http://localhost:8001/api"