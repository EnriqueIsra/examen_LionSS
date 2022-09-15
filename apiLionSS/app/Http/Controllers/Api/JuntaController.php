<?php  

namespace App\Http\Controllers\Api; // creamos este controlador con el comando "php artisan make:controller JuntaController --api"

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Junta;  // Importamos nuestro modelo de Junta

class JuntaController extends Controller
{

    public function index()
    {
        $juntas = Junta::all();
        return $juntas;     // método para obtener todos los registros de la tabla de juntas
    }
    public function store(Request $request)
    {
        $junta = new Junta();
        $junta->name = $request->name;
        $junta->room = $request->room;
        $junta->start_time = $request->start_time;
        $junta->end_time = $request->end_time;
        $junta->date = $request->date;

        $junta->save(); // método save para guardar los nuevos datos
        return $junta;  // funcion store para crear nuevas juntas
    }

    public function show($id)
    {
        $junta = Junta::find($id);
        return $junta; // funcion para obtener un dato de la tabla por su id
    }

    public function update(Request $request, $id)
    {
        $junta = Junta::findOrFail($request->id); // método findOrFail para obtener el dato que se quiere modificar
        $junta->name = $request->name;
        $junta->room = $request->room;
        $junta->start_time = $request->start_time;
        $junta->end_time = $request->end_time;
        $junta->date = $request->date;

        $junta->save(); // método save para guardar los nuevos datos
        return $junta; // funcion para editar un registro de la tabla de jutnas
    }

    public function destroy($id)
    {
        $junta = Junta::destroy($id);
        return $junta; // funcion destroy, le mandamos el id del registro para eliminar toda la fila
    }
}
