<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('notification', function (Blueprint $table) {
            $table->id('notificationID');
            $table->string('title');
            $table->text('message');
            $table->enum('type', ['system','booking','message','alert','info']);
            $table->boolean('isRead')->default(false);
            $table->string('link')->nullable();
            $table->unsignedBigInteger('userID');

            $table->foreign('userID')->references('userID')->on('users')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notification');
    }
};
