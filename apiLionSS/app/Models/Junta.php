<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Junta extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'room', 'start_time', 'end_time', 'date'];
}
