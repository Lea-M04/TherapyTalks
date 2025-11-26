<?php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
class AvailabilityResource extends JsonResource
{
    public function toArray($request): array
        {
        $p = $this->resource;


        return [
            'availabilityID' => $this->availabilityID,
            'professionalID' => $this->professionalID,
            'dayOfWeek' => $this->dayOfWeek,
            'startTime' => $this->startTime,
            'endTime' => $this->endTime,
            'isAvailable' => $this->isAvailable,
        ];
    }
}