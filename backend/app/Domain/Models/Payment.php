<?php
namespace App\Domain\Models;
class Payment
{
    public ?int $paymentID;
    public int $bookingID;
    public int $patientID;
    public float $amount;
    public string $status;
    public string $provider;
    public ?string $transactionID;
    public ?string $created_at;
    public ?string $updated_at;

    public function __construct(array $data = [])
    {
        $this->paymentID = $data['paymentID'] ?? null;
        $this->bookingID = $data['bookingID'];
        $this->patientID = $data['patientID'];
        $this->amount = $data['amount'];
        $this->status = $data['status'] ?? 'pending';
        $this->provider = $data['provider'] ?? 'stripe';
        $this->transactionID = $data['transactionID'] ?? null;
        $this->created_at = $data['created_at'] ?? null;
        $this->updated_at = $data['updated_at'] ?? null;
    }
}
