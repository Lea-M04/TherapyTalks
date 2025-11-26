<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ServiceResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'serviceID' => $this->serviceID,
            'professionalID' => $this->professionalID,
            'serviceName' => $this->serviceName,
            'description' => $this->description,
            'durationMinutes' => $this->durationMinutes,
            'price' => $this->price,
            'category' => $this->category,
            'isActive' => $this->isActive,
        ];
    }
}
