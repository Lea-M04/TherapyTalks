<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ConsentRecordResource extends JsonResource
{
    public function toArray($req): array
    {
        return [
            'consentID' => $this->consentID,
            'consentType' => $this->consentType,
            'description' => $this->description,
            'isRevoked' => $this->isRevoked,
            'signedAt' => $this->signedAt,
            'revokedAt' => $this->revokedAt,
            'patientID' => $this->patientID,
            'professionalID' => $this->professionalID,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
