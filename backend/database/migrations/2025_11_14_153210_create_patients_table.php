<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('patients', function (Blueprint $table) {
            $table->id('patientID');
            $table->unsignedBigInteger('userID')->unique();
            $table->text('medicalHistory')->nullable();
            $table->text('allergies')->nullable();
            $table->string('emergencyContactName')->nullable();
            $table->string('emergencyContactPhone')->nullable();
            $table->integer('insuranceNumber')->nullable();
            $table->string('pseudonym')->nullable();
            $table->foreign('userID')->references('userID')->on('users')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('patients');
    }
};
