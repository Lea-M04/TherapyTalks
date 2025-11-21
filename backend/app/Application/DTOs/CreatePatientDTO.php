<?php


namespace App\Application\DTOs;


    class CreatePatientDTO
    {
            public int $userID;
            public ?string $medicalHistory;
            public ?string $allergies;
            public ?string $emergencyContactName;
            public ?string $emergencyContactPhone;
            public ?int $insuranceNumber;
            public ?string $pseudonym;


            public function __construct(
            int $userID,
            ?string $medicalHistory = null,
            ?string $allergies = null,
            ?string $emergencyContactName = null,
            ?string $emergencyContactPhone = null,
            ?int $insuranceNumber = null,
            ?string $pseudonym = null
            ) {
            $this->userID = $userID;
            $this->medicalHistory = $medicalHistory;
            $this->allergies = $allergies;
            $this->emergencyContactName = $emergencyContactName;
            $this->emergencyContactPhone = $emergencyContactPhone;
            $this->insuranceNumber = $insuranceNumber;
            $this->pseudonym = $pseudonym;
    }
}