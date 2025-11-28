<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BookingResource extends JsonResource
{
    public function toArray($request)
    {
        $b = $this->resource;

        return [
            'bookingID' => $b->bookingID,
            'patientID' => $b->patientID,
            'professionalID' => $b->professionalID,
            'serviceID' => $b->serviceID,
            'appointmentDate' => $b->appointmentDate,
            'appointmentTime' => $b->appointmentTime,
            'duration' => $b->duration,
            'status' => $b->status,
            'notes' => $b->notes,
            'created_at' => $b->created_at,
            'updated_at' => $b->updated_at,
        ];
    }
}
