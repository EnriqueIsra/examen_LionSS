<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up()
    {
        Schema::create('juntas', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // nombre tipo string
            $table->string('room'); // room o sala, tipo string, donde almacenamos la sala donde se llevará a cabo la junta
            $table->time('start_time'); // hora de inicio, tipo time para ingresar una hora
            $table->time('end_time'); // hora final tipo time para indicar una hora de terminación
            $table->date('date'); // tipo fecha para ingresar un día en el calendario
            $table->timestamps();
        });
    }
    public function down()
    {
        Schema::dropIfExists('juntas');
    }
};
