<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SalaController; // debemos importar el controlador Sala
use App\Http\Controllers\Api\JuntaController; // importamos el controlador de Junta

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(SalaController::class)->group(function(){
    Route::get('/salas','index');   // metodo get, salas y funcion index, ruta que corresponde a la funcion que muestra todos los datos de la tabla salas
    Route::post('/sala','store');   // metodo post, sala y funcion store, ruta que corresponde a la funcion que guarda un nuevo dato
    Route::get('/sala/{id}','show');    // método get, sala{id} y funcion show, ruta que corresponde a la funcion de mostrar un dato mediante su id
    Route::put('/sala/{id}','update');  // método put, sala{id} y funcion update, ruta que corresponde a la funcion de modificar o editar y actualizar un dato existente
    Route::delete('/sala/{id}','destroy');  // método delete, sala{id} y funcion destroy, ruta que corresponde a la funcion de eliminar un registro
});

Route::controller(JuntaController::class)->group(function(){
    Route::get('/juntas','index');// metodo get, juntas y funcion index, ruta que corresponde a la funcion que muestra todos los datos de la tabla juntas
    Route::post('/junta','store'); // metodo post, junta y funcion store, ruta que corresponde a la funcion que guarda un nuevo dato
    Route::get('/junta/{id}','show');// método get, junta{id} y funcion show, ruta que corresponde a la funcion de mostrar un dato mediante su id
    Route::put('/junta/{id}','update');// método put, junta{id} y funcion update, ruta que corresponde a la funcion de modificar o editar y actualizar un dato existe
    Route::delete('/junta/{id}','destroy');// método delete, junta{id} y funcion destroy, ruta que corresponde a la funcion de eliminar un registro
});