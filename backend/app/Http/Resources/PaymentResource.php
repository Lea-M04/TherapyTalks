<?php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PaymentResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'paymentID' => $this->paymentID,
            'bookingID' => $this->bookingID,
            'patientID' => $this->patientID,

            'booking' => $this->booking ? [
                'service' => $this->booking->service ? [
                    'name' => $this->booking->service->serviceName,
                ] : null,
            ] : null,

            'patient' => $this->patient ? [
                'user' => $this->patient->user ? [
                    'firstName' => $this->patient->user->firstName,
                    'lastName'  => $this->patient->user->lastName,
                ] : null,
            ] : null,

            'amount' => $this->amount,
            'status' => $this->status,
            'provider' => $this->provider,
            'transactionID' => $this->transactionID,
            'created_at' => $this->created_at,
        ];
    }
}
