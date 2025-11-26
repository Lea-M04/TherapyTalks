<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('chat_rooms', function (Blueprint $table) {

            $table->id('chatRoomID');

            $table->unsignedBigInteger('createdBy');
            $table->unsignedBigInteger('professionalID')->nullable();
            $table->unsignedBigInteger('patientID')->nullable();

            $table->timestamps();

            $table->foreign('createdBy')->references('userID')->on('users')->onDelete('cascade');

            $table->foreign('professionalID')->references('professionalID')->on('professionals')->onDelete('set null');

            $table->foreign('patientID')->references('patientID')->on('patients')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('chat_rooms');
    }
};
