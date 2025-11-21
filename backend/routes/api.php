<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PatientController;

Route::post('/register', [AuthController::class, 'register'])->name('register');;
Route::post('/login', [AuthController::class, 'login'])->name('login');;
Route::middleware('auth:api')->group(function () {
    Route::get('/me', function () {
        return auth()->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);

    Route::post('/users', [UserController::class, 'store']); //store->create user
    Route::put('/users/{id}', [UserController::class, 'update']); //update-> me perditesu
    Route::get('/users', [UserController::class, 'index']);// index->nje liste te users
    Route::get('/users/{id}', [UserController::class, 'show']);  //show-> nje user te caktum
    Route::delete('/users/{id}', [UserController::class, 'destroy']); //destroy->me fshi

    Route::post('/patients', [PatientController::class, 'store']); 
    Route::put('/patients/{id}', [PatientController::class, 'update']);
    Route::get('/patients', [PatientController::class, 'index']);
    Route::get('/patients/{id}', [PatientController::class, 'show']);
    Route::delete('/patients/{id}', [PatientController::class, 'destroy']);
    
});
