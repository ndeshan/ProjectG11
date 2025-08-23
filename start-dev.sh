#!/bin/bash

echo "Starting Laravel + React Development Environment..."

# Start Laravel backend
cd backend
php artisan serve --port=8001 &
LARAVEL_PID=$!

# Start React frontend
cd ../frontend
npm start &
REACT_PID=$!

echo "Laravel API: http://localhost:8001"
echo "React App: http://localhost:3000"
echo "Press Ctrl+C to stop both servers"

# Wait for Ctrl+C
trap "kill $LARAVEL_PID $REACT_PID; exit" INT
wait