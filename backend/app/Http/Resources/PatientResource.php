<?php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
class PatientResource extends JsonResource
{
    public function toArray($request): array
        {
        $p = $this->resource;


        return [
            'patientID' => $p->patientID,
            'userID' => $p->userID,
            'medicalHistory' => $p->medicalHistory,
            'allergies' => $p->allergies,
            'emergencyContactName' => $p->emergencyContactName,
            'emergencyContactPhone' => $p->emergencyContactPhone,
            'insuranceNumber' => $p->insuranceNumber,
            'pseudonym' => $p->pseudonym,
            'created_at' => $p->created_at,
            'updated_at' => $p->updated_at,
        ];
        }
}