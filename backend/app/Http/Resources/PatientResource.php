<?php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
class PatientResource extends JsonResource
{
    public function toArray($request): array
        {
        $p = $this->resource;
         $user = $p->user;


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
              'user' => $user ? [
            'userID' => $user['userID'] ?? null,
            'firstName' => $user['firstName'] ?? null,
            'lastName' => $user['lastName'] ?? null,
            'email' => $user['email'] ?? null,
        ] : null,
        ];
        }
}