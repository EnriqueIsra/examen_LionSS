<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Junta;

class JuntaController extends Controller
{

    public function index()
    {
        $juntas = Junta::all();
        return $juntas;
    }
    public function store(Request $request)
    {
        $junta = new Junta();
        $junta->name = $request->name;
        $junta->room = $request->room;
        $junta->start_time = $request->start_time;
        $junta->end_time = $request->end_time;
        $junta->date = $request->date;

        $junta->save();
        return $junta;
    }

    public function show($id)
    {
        $junta = Junta::find($id);
        return $junta;
    }

    public function update(Request $request, $id)
    {
        $junta = Junta::findOrFail($request->id);
        $junta->name = $request->name;
        $junta->room = $request->room;
        $junta->start_time = $request->start_time;
        $junta->end_time = $request->end_time;
        $junta->date = $request->date;

        $junta->save();
        return $junta;
    }

    public function destroy($id)
    {
        $junta = Junta::destroy($id);
        return $junta;
    }
}
