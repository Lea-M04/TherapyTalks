<?php
namespace App\Domain\Interfaces;

use App\Domain\Models\Payment;

interface PaymentRepositoryInterface
{
    public function create(Payment $payment): Payment;
    public function findById(int $id): ?Payment;
    public function findByBooking(int $bookingID): ?Payment;
    public function update(Payment $payment): Payment;
    public function all(): array;
    public function getByPatient(int $patientID): array;
}
