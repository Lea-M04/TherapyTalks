<?php
namespace App\Domain\Models;

class Patient
{
        public ?int $patientID;
        public int $userID;
        public ?string $medicalHistory;
        public ?string $allergies;
        public ?string $emergencyContactName;
        public ?string $emergencyContactPhone;
        public ?int $insuranceNumber;
        public ?string $pseudonym;
        public ?string $created_at;
        public ?string $updated_at;
        public ?array $user;


        public function __construct(array $data = [])
        {
            $this->patientID = isset($data['patientID']) ? (int) $data['patientID'] : null;
            $this->userID = isset($data['userID']) ? (int) $data['userID'] : 0;
            $this->medicalHistory = $data['medicalHistory'] ?? null;
            $this->allergies = $data['allergies'] ?? null;
            $this->emergencyContactName = $data['emergencyContactName'] ?? null;
            $this->emergencyContactPhone = $data['emergencyContactPhone'] ?? null;
            $this->insuranceNumber = isset($data['insuranceNumber']) ? (int)$data['insuranceNumber'] : null;
            $this->pseudonym = $data['pseudonym'] ?? null;
            $this->created_at = $data['created_at'] ?? null;
            $this->updated_at = $data['updated_at'] ?? null;
            $this->user = $data['user'] ?? null;
        }


        public function toArray(): array
        {
            return [
            'patientID' => $this->patientID,
            'userID' => $this->userID,
            'medicalHistory' => $this->medicalHistory,
            'allergies' => $this->allergies,
            'emergencyContactName' => $this->emergencyContactName,
            'emergencyContactPhone' => $this->emergencyContactPhone,
            'insuranceNumber' => $this->insuranceNumber,
            'pseudonym' => $this->pseudonym,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
              'user' => $this->user,
        ];
        }
}