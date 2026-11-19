<?php

use App\Http\Controllers\Api\LecturerController;
use App\Http\Controllers\Api\OptionController;
use Illuminate\Support\Facades\Route;

Route::get('/prodis', [OptionController::class, 'prodis']);
Route::get('/education-levels', [OptionController::class, 'educationLevels']);
Route::apiResource('lecturers', LecturerController::class);