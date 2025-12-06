<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BookingResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'bookingID' => $this->bookingID,
            'patientID' => $this->patientID,
            'professionalID' => $this->professionalID,
            'serviceID' => $this->serviceID,
            'appointmentDate' => $this->appointmentDate,
            'appointmentTime' => $this->appointmentTime,
            'duration' => $this->duration,
            'status' => $this->status,
            'notes' => $this->notes,
            'serviceName' => $this->service?->serviceName,
            'professionalFirstName' => $this->professional?->user?->firstName,
            'professionalLastName' => $this->professional?->user?->lastName,
            'patientFirstName' => $this->patient?->user?->firstName,
            'patientLastName' => $this->patient?->user?->lastName,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
