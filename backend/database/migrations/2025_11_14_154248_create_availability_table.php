<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('availability', function (Blueprint $table) {
            $table->id('availabilityID');
            $table->unsignedBigInteger('professionalID');
            $table->enum('dayOfWeek', ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']);
            $table->time('startTime');
            $table->time('endTime');
            $table->boolean('isAvailable')->default(true);
            $table->foreign('professionalID')->references('professionalID')->on('professionals')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('availability');
    }
};
