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
            'amount' => $this->amount,
            'status' => $this->status,
            'provider' => $this->provider,
            'transactionID' => $this->transactionID,
            'created_at' => $this->created_at,
        ];
    }
}
