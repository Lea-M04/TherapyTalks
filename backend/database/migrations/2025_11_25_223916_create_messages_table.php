<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('messages', function (Blueprint $table) {

            $table->id('messageID');

            $table->text('content')->nullable();
            $table->timestamp('sentAt')->useCurrent();
            $table->timestamp('readAt')->nullable();

            $table->unsignedBigInteger('senderID');
            $table->unsignedBigInteger('receiverID');
            $table->unsignedBigInteger('chatRoomID');

            $table->timestamps();

            $table->foreign('senderID')->references('userID')->on('users')->onDelete('cascade');

            $table->foreign('receiverID')->references('userID')->on('users')->onDelete('cascade');

            $table->foreign('chatRoomID')->references('chatRoomID')->on('chat_rooms')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
