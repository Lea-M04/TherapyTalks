<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('audit_log', function (Blueprint $table) {
            $table->id('logID');
            $table->string('action');
            $table->string('targetType');
            $table->unsignedBigInteger('targetID')->nullable();
            $table->datetime('timestamp');
            $table->string('status');
            $table->unsignedBigInteger('userID')->nullable();

            $table->foreign('userID')->references('userID')->on('users')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('audit_log');
    }
};
