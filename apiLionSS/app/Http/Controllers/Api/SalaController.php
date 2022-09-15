<?php

namespace App\Http\Controllers\Api; // creamos este controlador con "php artisan make:controller SalaController --api"

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Sala; // importamos el modelo de Sala

class SalaController extends Controller
{
    public function index()
    {
        $salas = Sala::all();
        return $salas; // funcion index con método all para traer todos los registros de la base de datos
    }

    public function store(Request $request)
    {
        $sala = new Sala();
        $sala->name = $request->name;
        $sala->description = $request->description;

        $sala->save();
        return $sala; // funcion store para guardar nuevos datos, con método save
    }

    public function show($id)
    {
        $sala = Sala::find($id);
        return $sala; // funcion show, se requiere el id para consultar, se una el método find
    }

    public function update(Request $request, $id)
    {
        $sala = Sala::findOrFail($request->id);
        $sala->name = $request->name;
        $sala->description = $request->description;

        $sala->save();
        return $sala; // findOrFail para modificar un dato existente, método save para guardar los cambios
    }

    public function destroy($id)
    {
        $sala = Sala::destroy($id);
        return $sala; // funcion destroy con método destroy para eliminar el registro de una sala, se requiere el id
    }
}
