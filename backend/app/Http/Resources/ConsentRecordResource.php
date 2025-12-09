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

            'patient' => $this->patient ? [
                'user' => $this->patient->user ? [
                    'firstName' => $this->patient->user->firstName,
                    'lastName'  => $this->patient->user->lastName,
                ] : null
            ] : null,

            'professional' => $this->professional ? [
                'user' => $this->professional->user ? [
                    'firstName' => $this->professional->user->firstName,
                    'lastName'  => $this->professional->user->lastName,
                ] : null
            ] : null,

            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
