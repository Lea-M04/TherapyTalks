<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('admin_panel', function (Blueprint $table) {
            $table->id('adminID');
            $table->unsignedBigInteger('userID');
            $table->enum('role', ['super_admin','moderator','auditor']);
            $table->json('permissions')->nullable();

            $table->foreign('userID')->references('userID')->on('users')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('admin_panel');
    }
};
