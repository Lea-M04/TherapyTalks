<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id('serviceID');
            $table->unsignedBigInteger('professionalID');
            $table->string('serviceName');
            $table->text('description')->nullable();
            $table->string('durationMinutes')->nullable();
            $table->double('price')->default(0);
            $table->string('category')->nullable();
            $table->boolean('isActive')->default(true);
            $table->foreign('professionalID')->references('professionalID')->on('professionals')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
