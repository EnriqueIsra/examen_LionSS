<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SalaController;
use App\Http\Controllers\Api\JuntaController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(SalaController::class)->group(function(){
    Route::get('/salas','index');
    Route::post('/sala','store');
    Route::get('/sala/{id}','show');
    Route::put('/sala/{id}','update');
    Route::delete('/sala/{id}','destroy');
});

Route::controller(JuntaController::class)->group(function(){
    Route::get('/juntas','index');
    Route::post('/junta','store');
    Route::get('/junta/{id}','show');
    Route::put('/junta/{id}','update');
    Route::delete('/junta/{id}','destroy');
});