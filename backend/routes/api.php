<?php

use App\Appsiel\System\Models\Field;
use App\Http\Controllers\System\CrudController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\System\HomeController;
use App\Http\Controllers\System\HtmlController;
use App\Http\Controllers\System\UserController;
use App\Http\Controllers\System\AuthController;
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

Route::get('get_suggestions_autocomplete', [HtmlController::class, 'get_suggestions_autocomplete']);

Route::group([
    'middleware' => 'api',
], function () {

    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('user', [AuthController::class, 'me']);
});

Route::get('menu', [HomeController::class, 'menu']);
Route::get('app_catalogs', [HomeController::class, 'catalogs']);
