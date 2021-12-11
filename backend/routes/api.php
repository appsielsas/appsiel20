<?php

use App\Http\Controllers\System\CrudController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\System\HomeController;
use App\Http\Controllers\System\UserController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});*/

Route::resource('users', UserController::class);


Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'authenticate']);

Route::resource('crud', CrudController::class);

Route::group(['middleware' => ['jwt.verify']], function () {

    Route::post('user', [UserController::class, 'getAuthenticatedUser']);
});

Route::get('menu', [HomeController::class, 'menu']);
Route::get('app_catalogs', [HomeController::class, 'catalogs']);
