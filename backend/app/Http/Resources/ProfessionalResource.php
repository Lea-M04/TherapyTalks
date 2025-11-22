<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProfessionalResource extends JsonResource
{
    public function toArray($request): array
    {
        $p = $this->resource;

        return [
            'professionalID' => $p->professionalID,
            'userID' => $p->userID,
            'specialization' => $p->specialization,
            'licenseNumber' => $p->licenseNumber,
            'experienceYears' => $p->experienceYears,
            'education' => $p->education,
            'bio' => $p->bio,
            'clinicName' => $p->clinicName,
            'clinicStreet' => $p->clinicStreet,
            'clinicCity' => $p->clinicCity,
            'rating' => $p->rating,
            'isOnline' => $p->isOnline,
            'status' => $p->status,
            'created_at' => $p->created_at,
            'updated_at' => $p->updated_at,
        ];
    }
}
