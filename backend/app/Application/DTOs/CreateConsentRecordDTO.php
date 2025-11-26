<?php

namespace App\Application\DTOs;

class CreateConsentRecordDTO
{
    public string $consentType;
    public ?string $description;
    public int $patientID;
    public int $professionalID;

    public function __construct(
        string $consentType,
        ?string $description,
        int $patientID,
        int $professionalID
    ) {
        $this->consentType = $consentType;
        $this->description = $description;
        $this->patientID = $patientID;
        $this->professionalID = $professionalID;
    }
}
