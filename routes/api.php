<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/data',[App\Http\Controllers\Api\ApiRequest::class, 'getData'])->name('api.request.data');
Route::post('/update',[App\Http\Controllers\Api\ApiRequest::class, 'updateData'])->name('api.request.update');
