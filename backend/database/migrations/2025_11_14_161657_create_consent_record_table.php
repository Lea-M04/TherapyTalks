<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('consent_record', function (Blueprint $table) {
            $table->id('consentID');
            $table->enum('consentType', ['treatment','data_share','communication']);
            $table->string('description')->nullable();
            $table->boolean('isRevoked')->default(false);
            $table->datetime('signedAt');
            $table->datetime('revokedAt')->nullable();
            $table->unsignedBigInteger('patientID');
            $table->unsignedBigInteger('professionalID'); 

            $table->foreign('patientID')->references('patientID')->on('patients')->onDelete('cascade');
            $table->foreign('professionalID')->references('professionalID')->on('professionals')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('consent_record');
    }
};
