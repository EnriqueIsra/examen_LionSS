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
            $table->string('name');
            $table->string('room');
            $table->time('start_time');
            $table->time('end_time');
            $table->date('date');
            $table->timestamps();
        });
    }
    public function down()
    {
        Schema::dropIfExists('juntas');
    }
};
