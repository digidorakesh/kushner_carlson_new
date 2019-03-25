<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Digi\Dashboard\Http\Controllers\ReminderController;

/*
|--------------------------------------------------------------------------
| Tool API Routes
|--------------------------------------------------------------------------
|
| Here is where you may register API routes for your tool. These routes
| are loaded by the ServiceProvider of your tool. They are protected
| by your tool's "Authorize" middleware by default. Now, go build!
|
*/

// Route::get('/endpoint', function (Request $request) {
//     //
// });
Route::get('/getdata/{id}', [ReminderController::class, 'getdata']);
Route::get('/{pageNum}/{limit}', [ReminderController::class, 'read']);
Route::post('/', [ReminderController::class, 'create']);
Route::put('/', [ReminderController::class, 'update']);
Route::post('/search', [ReminderController::class, 'search']);
Route::post('/delete', [ReminderController::class, 'delete']);
Route::get('/getSubscriber/', [ReminderController::class, 'getSubscriber']);
Route::post('/send', [ReminderController::class, 'send']);
