<?php

use App\Http\Controllers\Api\CanteenController;
use App\Http\Controllers\Api\MenuController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\AdminController;
use Illuminate\Support\Facades\Route;

// Canteens
Route::get('/canteens', [CanteenController::class, 'index']);
Route::get('/canteens/{id}', [CanteenController::class, 'show']);
Route::get('/canteens/{id}/queue-status', [CanteenController::class, 'getQueueStatus']);

// Menu
Route::get('/menu', [MenuController::class, 'index']);
Route::get('/menu/favorites', [MenuController::class, 'getFavorites']);
Route::get('/canteens/{canteenId}/menu/{category}', [MenuController::class, 'getByCategory']);

// Orders
Route::get('/orders', [OrderController::class, 'index']);
Route::post('/orders', [OrderController::class, 'store']);
Route::get('/orders/{id}', [OrderController::class, 'show']);
Route::patch('/orders/{id}/status', [OrderController::class, 'updateStatus']);

// Admin Routes
Route::prefix('admin')->group(function () {
    Route::get('/dashboard/{canteenId}', [AdminController::class, 'getDashboard']);
    Route::post('/canteens/{canteenId}/queue-status', [AdminController::class, 'updateQueueStatus']);
    Route::get('/canteens/{canteenId}/orders-today', [AdminController::class, 'getOrdersToday']);
});