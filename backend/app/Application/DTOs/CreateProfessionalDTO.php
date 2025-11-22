<?php

namespace App\Application\DTOs;

class CreateProfessionalDTO
{
    public int $userID;
    public string $specialization;
    public ?string $licenseNumber;
    public ?int $experienceYears;
    public ?string $education;
    public ?string $bio;
    public ?string $clinicName;
    public ?string $clinicStreet;
    public ?string $clinicCity;

    public function __construct(
        int $userID,
        string $specialization,
        ?string $licenseNumber = null,
        ?int $experienceYears = null,
        ?string $education = null,
        ?string $bio = null,
        ?string $clinicName = null,
        ?string $clinicStreet = null,
        ?string $clinicCity = null
    ) {
        $this->userID = $userID;
        $this->specialization = $specialization;
        $this->licenseNumber = $licenseNumber;
        $this->experienceYears = $experienceYears;
        $this->education = $education;
        $this->bio = $bio;
        $this->clinicName = $clinicName;
        $this->clinicStreet = $clinicStreet;
        $this->clinicCity = $clinicCity;
    }
}
