<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reject_reasons', function (Blueprint $table) {
            $table->id('reasonID');
            $table->unsignedBigInteger('requestID');
            $table->string('title');
            $table->text('description')->nullable();
            $table->timestamps();

            $table->foreign('requestID')
                ->references('requestID')
                ->on('verification_requests')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reject_reasons');
    }
};
