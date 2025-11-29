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
        Schema::create('payments', function (Blueprint $table) {
            $table->id('paymentID');

            $table->unsignedBigInteger('bookingID');
            $table->unsignedBigInteger('patientID');

            $table->double('amount');
            $table->enum('status', ['pending', 'paid', 'failed'])->default('pending');
            $table->string('provider')->default('stripe'); 
            $table->string('transactionID')->nullable();

            $table->timestamps();

            $table->foreign('bookingID')->references('bookingID')->on('booking')->onDelete('cascade');
            $table->foreign('patientID')->references('patientID')->on('patients')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
