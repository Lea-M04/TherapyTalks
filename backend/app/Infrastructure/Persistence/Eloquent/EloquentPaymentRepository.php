<?php
namespace App\Infrastructure\Persistence\Eloquent;

use App\Models\Payment as EloquentPayment;
use App\Domain\Models\Payment;
use App\Domain\Interfaces\PaymentRepositoryInterface;

class EloquentPaymentRepository implements PaymentRepositoryInterface
{
    private function mapToDomain(EloquentPayment $p): Payment
    {
        return new Payment([
            'paymentID' => $p->paymentID,
            'bookingID' => $p->bookingID,
            'patientID' => $p->patientID,
            'amount' => $p->amount,
            'status' => $p->status,
            'provider' => $p->provider,
            'transactionID' => $p->transactionID,
            'created_at' => $p->created_at,
            'updated_at' => $p->updated_at
        ]);
    }

    public function all(): array
{
    return EloquentPayment::with([
            'patient.user',
            'booking.service'
        ])
        ->orderBy('paymentID', 'desc')
        ->get()
        ->all(); 
}

    public function getByPatient(int $patientID): array
    {
        return EloquentPayment::where('patientID', $patientID)
            ->orderBy('paymentID', 'desc')
            ->get()
            ->map(fn($p) => new Payment($p->toArray()))
            ->toArray();
    }

    public function create(Payment $payment): Payment
    {
        $elo = EloquentPayment::create([
            'bookingID' => $payment->bookingID,
            'patientID' => $payment->patientID,
            'amount' => $payment->amount,
            'status' => $payment->status,
            'provider' => $payment->provider,
            'transactionID' => $payment->transactionID
        ]);

        return $this->mapToDomain($elo);
    }

    public function findById(int $id): ?Payment
    {
        $p = EloquentPayment::where('paymentID', $id)->first();
        return $p ? $this->mapToDomain($p) : null;
    }

    public function findByBooking(int $bookingID): ?Payment
    {
        $p = EloquentPayment::where('bookingID', $bookingID)->first();
        return $p ? $this->mapToDomain($p) : null;
    }

    public function update(Payment $payment): Payment
    {
        $elo = EloquentPayment::where('paymentID', $payment->paymentID)->first();
        $elo->update([
            'status' => $payment->status,
            'transactionID' => $payment->transactionID,
        ]);

        return $this->mapToDomain($elo);
    }

}
