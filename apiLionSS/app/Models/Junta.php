<?php

namespace App\Models; // creamos este modelo con el comando "php artisan make:model Junta -m"

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Junta extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'room', 'start_time', 'end_time', 'date']; // indicamos protected $fillable e ingresamos las variables de las columnas que llevará la tabla
}
