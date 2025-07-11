<?php

use App\Http\Controllers\Api\V1\ArticleController;
use App\Http\Controllers\Api\V1\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthController;

Route::prefix('v1')->group(function () {
    Route::post('/signup', [AuthController::class, 'signup']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);

        // Note: Considering API's for admin users i am using resource based routes. 
        // It can be more specific instead of resource routes if needed
        Route::apiResource('articles', ArticleController::class); 

        Route::get('/users/profile', [UserController::class, 'show']);
        Route::patch('/users/profile', [UserController::class, 'update']);
        Route::patch('/users/settings', [UserController::class, 'settings']);
    });

    Route::get('/user', function (Request $request) {
        return $request->user();
    })->middleware('auth:sanctum');
});
