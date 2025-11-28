<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DiagnosisResource extends JsonResource
{
    public function toArray($request): array
    {
        $d = $this->resource;

        return [
            'diagnosisID' => $d->diagnosisID,
            'patientID' => $d->patientID,
            'professionalID' => $d->professionalID,
            'title' => $d->title,
            'description' => $d->description,
            'securityLevel' => $d->securityLevel,
            'created_at' => $d->created_at,
            'updated_at' => $d->updated_at,
        ];
    }
}
