<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/dompet', '\App\Http\Controllers\API\DompetController@index');

Route::post('/adddompet', '\App\Http\Controllers\API\DompetController@adddompet');

Route::put('/changeStatus', '\App\Http\Controllers\API\DompetController@changeStatus');
Route::put('/editdompet', '\App\Http\Controllers\API\DompetController@editdompet');