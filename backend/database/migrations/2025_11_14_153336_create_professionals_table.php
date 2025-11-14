<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('professionals', function (Blueprint $table) {
            $table->id('professionalID');
            $table->unsignedBigInteger('userID')->unique();
            $table->string('specialization');
            $table->string('licenseNumber')->nullable();
            $table->integer('experienceYears')->nullable();
            $table->string('education')->nullable();
            $table->string('bio')->nullable();
            $table->string('clinicName')->nullable();
            $table->string('clinicStreet')->nullable();
            $table->string('clinicCity')->nullable();
            $table->string('rating')->nullable();
            $table->boolean('isOnline')->default(false);
            $table->foreign('userID')->references('userID')->on('users')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('professionals');
    }
};
