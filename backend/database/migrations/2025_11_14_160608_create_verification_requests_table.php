<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('verification_requests', function (Blueprint $table) {
            $table->id('requestID');
            $table->unsignedBigInteger('professionalID'); 
            $table->enum('documentType', ['id_card','license','certificate']);
            $table->string('documentURL');
            $table->datetime('submittedAt');
            $table->datetime('verifiedAt')->nullable();
            $table->enum('status', ['pending','approved','rejected'])->default('pending');
            $table->unsignedBigInteger('reviewedBy')->nullable();
            $table->text('comments')->nullable();

            $table->foreign('professionalID')->references('professionalID')->on('professionals')->onDelete('cascade');
            $table->foreign('reviewedBy')->references('adminID')->on('admin_panel')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('verification_requests');
    }
};
