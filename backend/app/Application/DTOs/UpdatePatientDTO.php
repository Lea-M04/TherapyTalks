<?php
namespace App\Application\DTOs;

class UpdatePatientDTO
{
    public int $patientID;
    public ?int $userID;
    public ?string $medicalHistory;
    public ?string $allergies;
    public ?string $emergencyContactName;
    public ?string $emergencyContactPhone;
    public ?int $insuranceNumber;
    public ?string $pseudonym;


    public function __construct(
        int $patientID,
        ?int $userID = null,
        ?string $medicalHistory = null,
        ?string $allergies = null,
        ?string $emergencyContactName = null,
        ?string $emergencyContactPhone = null,
        ?int $insuranceNumber = null,
        ?string $pseudonym = null
        ) {
        $this->patientID = $patientID;
        $this->userID = $userID;
        $this->medicalHistory = $medicalHistory;
        $this->allergies = $allergies;
        $this->emergencyContactName = $emergencyContactName;
        $this->emergencyContactPhone = $emergencyContactPhone;
        $this->insuranceNumber = $insuranceNumber;
        $this->pseudonym = $pseudonym;
}
}