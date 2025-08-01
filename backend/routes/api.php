<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TimeEntryController;

Route::get('/time-entries', [TimeEntryController::class, 'index']);
Route::post('/time-entries', [TimeEntryController::class, 'store']);
Route::put('/time-entries/{id}', [TimeEntryController::class, 'update']);
Route::delete('/time-entries/{id}', [TimeEntryController::class, 'destroy']);
