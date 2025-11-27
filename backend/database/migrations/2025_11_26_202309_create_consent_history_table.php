<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('consent_history', function (Blueprint $table) {

            $table->id('historyID');

            $table->unsignedBigInteger('consentID');

            $table->string('previousValue')->nullable();
            $table->string('newValue')->nullable();

            $table->timestamp('changedAt')->useCurrent();

            $table->unsignedBigInteger('changedBy'); 

            $table->timestamps();

            $table->foreign('consentID')
                ->references('consentID')->on('consent_record')
                ->onDelete('cascade');

            $table->foreign('changedBy')
                ->references('userID')->on('users')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('consent_history');
    }
};
