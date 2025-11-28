<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('diagnosis', function (Blueprint $table) {

            $table->id('diagnosisID');

            $table->unsignedBigInteger('patientID');
            $table->unsignedBigInteger('professionalID');

            $table->string('title');
            $table->text('description')->nullable();

            $table->string('securityLevel')->default('normal');

            $table->timestamps();


            $table->foreign('patientID')
                  ->references('userID')->on('users')
                  ->onDelete('cascade');

            $table->foreign('professionalID')
                  ->references('userID')->on('users')
                  ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('diagnosis');
    }
};
