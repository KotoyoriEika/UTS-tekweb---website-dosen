<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

//tabel dosen beserta relasi ke prodi dan level pendidikan
return new class extends Migration {
    public function up(): void
    {
        Schema::create('lecturers', function (Blueprint $table) {
            $table->id('lecturer_id');
            $table->string('nim', 20)->unique();
            $table->string('nidn', 20)->unique();
            $table->string('name', 150);
            $table->string('email')->unique();
            $table->string('phone', 20);
            $table->text('address')->nullable();
            $table->unsignedBigInteger('prodi_id');
            $table->unsignedBigInteger('education_level_id');
            $table->string('photo')->nullable();
            $table->timestamps();

            $table->foreign('prodi_id')->references('prodi_id')->on('prodis')->onDelete('cascade');
            $table->foreign('education_level_id')->references('education_level_id')->on('education_levels')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lecturers');
    }
};