<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Digi\Setting\Http\Controllers\SettingController;

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

 //Route::get('/endpoint', [SettingController::class, 'read']);
Route::get('/', [SettingController::class, 'read']);

Route::post('/uploadImage', [SettingController::class, 'uploadImage']);
Route::put('/', [SettingController::class, 'write']);
//Route::get('/default-setting', [SettingController::class, 'run']);
//Route::put('/update-setting', [SettingController::class, 'run']);
// Route::get('/routes', function () {
//     $routes = collect(Route::getRoutes())->map(function ($route) {
//         return [
//             'uri' => $route->uri,
//             'as' => $route->action['as'] ?? '',
//             'methods' => $route->methods,
//             'action' => $route->action['uses'] ?? '',
//             'middleware' => $route->action['middleware'] ?? [],
//         ];
//     });

//     return response()->json($routes);
// });