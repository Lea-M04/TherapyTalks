<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AvailabilityResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'availabilityID' => $this->availabilityID,
            'professionalID' => $this->professionalID,
            'dayOfWeek'      => $this->dayOfWeek,
            'startTime'      => $this->startTime,
            'endTime'        => $this->endTime,
            'isAvailable'    => $this->isAvailable,
            'professional' => [
                'professionalID' => $this->professionalID,
                'firstName'      => $this->professional->user->firstName ?? null,
                'lastName'       => $this->professional->user->lastName ?? null,
            ]
        ];
    }
}
