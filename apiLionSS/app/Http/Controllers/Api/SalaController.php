<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Sala;

class SalaController extends Controller
{
    public function index()
    {
        $salas = Sala::all();
        return $salas;
    }

    public function store(Request $request)
    {
        $sala = new Sala();
        $sala->name = $request->name;
        $sala->description = $request->description;

        $sala->save();
        return $sala;
    }

    public function show($id)
    {
        $sala = Sala::find($id);
        return $sala;
    }

    public function update(Request $request, $id)
    {
        $sala = Sala::findOrFail($request->id);
        $sala->name = $request->name;
        $sala->description = $request->description;

        $sala->save();
        return $sala;
    }

    public function destroy($id)
    {
        $sala = Sala::destroy($id);
        return $sala;
    }
}
