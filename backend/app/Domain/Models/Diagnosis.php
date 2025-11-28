<?php

namespace App\Domain\Models;

class Diagnosis
{
    public ?int $diagnosisID;
    public int $patientID;
    public int $professionalID;
    public string $title;
    public ?string $description;
    public string $securityLevel;
    public ?string $created_at;
    public ?string $updated_at;

    public function __construct(array $data = [])
    {
        $this->diagnosisID = isset($data['diagnosisID']) ? (int)$data['diagnosisID'] : null;
        $this->patientID = isset($data['patientID']) ? (int)$data['patientID'] : 0;
        $this->professionalID = isset($data['professionalID']) ? (int)$data['professionalID'] : 0;
        $this->title = $data['title'] ?? '';
        $this->description = $data['description'] ?? null;
        $this->securityLevel = $data['securityLevel'] ?? 'normal';
        $this->created_at = $data['created_at'] ?? null;
        $this->updated_at = $data['updated_at'] ?? null;
    }

    public function toArray(): array
    {
        return [
            'diagnosisID' => $this->diagnosisID,
            'patientID' => $this->patientID,
            'professionalID' => $this->professionalID,
            'title' => $this->title,
            'description' => $this->description,
            'securityLevel' => $this->securityLevel,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
