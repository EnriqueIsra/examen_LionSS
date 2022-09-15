<?php

namespace App\Models; // creamos este modelo con "php artisan make:model Sala -m"

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sala extends Model
{
    use HasFactory;
    protected $fillable = ['name','description']; // indicamos protected $fillable e ingresamos las variables de las columnas que llevará la tabla
}
