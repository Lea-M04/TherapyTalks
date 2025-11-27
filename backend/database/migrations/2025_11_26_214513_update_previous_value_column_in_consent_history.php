<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('consent_history', function (Blueprint $table) {
            $table->text('previousValue')->change();
            $table->text('newValue')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('consent_history', function (Blueprint $table) {
            $table->string('previousValue', 255)->change();
            $table->string('newValue', 255)->change();
        });
    }
};
