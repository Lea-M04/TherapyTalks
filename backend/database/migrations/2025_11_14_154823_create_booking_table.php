<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('booking', function (Blueprint $table) {
            $table->id('bookingID');

            $table->unsignedBigInteger('patientID');
            $table->unsignedBigInteger('professionalID');
            $table->unsignedBigInteger('serviceID');
            $table->date('appointmentDate');
            $table->time('appointmentTime');
            $table->string('duration')->nullable();
            $table->enum('status', ['pending','confirmed','canceled','completed'])->default('pending');
            $table->text('notes')->nullable();
            
            $table->foreign('patientID')->references('patientID')->on('patients')->onDelete('cascade');
            $table->foreign('professionalID')->references('professionalID')->on('professionals')->onDelete('cascade');
            $table->foreign('serviceID')->references('serviceID')->on('services')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('booking');
    }
};
