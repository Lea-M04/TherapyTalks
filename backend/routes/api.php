<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


// Protected routes (JWT)
Route::middleware('auth:api')->group(function () {

    // current logged-in user
    Route::get('/me', function () {
        return auth()->user();
    });

    // JWT logout
    Route::post('/logout', [AuthController::class, 'logout']);

    // Refresh token
    Route::post('/refresh', [AuthController::class, 'refresh']);
});
