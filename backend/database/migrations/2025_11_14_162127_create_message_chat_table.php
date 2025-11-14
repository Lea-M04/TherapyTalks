<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('message_chat', function (Blueprint $table) {
            $table->id('messageID');
            $table->text('content');
            $table->enum('sentBy', ['user','admin','professional']);
            $table->datetime('sentAt');
            $table->boolean('isDeleted')->default(false);

            $table->unsignedBigInteger('senderID');
            $table->unsignedBigInteger('receiverID');

            $table->foreign('senderID')->references('userID')->on('users')->onDelete('cascade');
            $table->foreign('receiverID')->references('userID')->on('users')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('message_chat');
    }
};
