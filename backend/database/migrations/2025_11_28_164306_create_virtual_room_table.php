<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('virtual_rooms', function (Blueprint $table) {
            $table->id('roomID');

            $table->unsignedBigInteger('bookingID')->unique(); 

            $table->string('platform')->default('custom'); 

            $table->string('link');
            $table->dateTime('expiresAt');

            $table->timestamps(); 

            $table->foreign('bookingID')
                ->references('bookingID')
                ->on('booking')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('virtual_rooms');
    }
};
