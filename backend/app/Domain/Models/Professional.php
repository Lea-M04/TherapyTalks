<?php

namespace App\Domain\Models;

class Professional
{
    public ?int $professionalID;
    public int $userID;
    public ?array $user; 
    public ?array $availability;
    public ?string $specialization;
    public ?string $licenseNumber;
    public ?int $experienceYears;
    public ?string $education;
    public ?string $bio;
    public ?string $clinicName;
    public ?string $clinicStreet;
    public ?string $clinicCity;
    public ?string $rating;
    public bool $isOnline;
    public string $status;
    public ?string $created_at;
    public ?string $updated_at;

    public function __construct(array $data = [])
    {
        $this->professionalID = isset($data['professionalID']) ? (int)$data['professionalID'] : null;
        $this->userID = isset($data['userID']) ? (int)$data['userID'] : 0;
         $this->user = $data['user'] ?? null;
          $this->availability = $data['availability'] ?? null;
        $this->specialization = $data['specialization'] ?? null;
        $this->licenseNumber = $data['licenseNumber'] ?? null;
        $this->experienceYears = isset($data['experienceYears']) ? (int)$data['experienceYears'] : null;
        $this->education = $data['education'] ?? null;
        $this->bio = $data['bio'] ?? null;
        $this->clinicName = $data['clinicName'] ?? null;
        $this->clinicStreet = $data['clinicStreet'] ?? null;
        $this->clinicCity = $data['clinicCity'] ?? null;
        $this->rating = $data['rating'] ?? null;
        $this->isOnline = isset($data['isOnline']) ? (bool)$data['isOnline'] : false;
        $this->status = $data['status'] ?? 'pending';
        $this->created_at = $data['created_at'] ?? null;
        $this->updated_at = $data['updated_at'] ?? null;
    }

    public function toArray(): array
    {
        return [
            'professionalID' => $this->professionalID,
            'userID' => $this->userID,
            'user' => $this->user,
            'availability'=>$this->availability,
            'specialization' => $this->specialization,
            'licenseNumber' => $this->licenseNumber,
            'experienceYears' => $this->experienceYears,
            'education' => $this->education,
            'bio' => $this->bio,
            'clinicName' => $this->clinicName,
            'clinicStreet' => $this->clinicStreet,
            'clinicCity' => $this->clinicCity,
            'rating' => $this->rating,
            'isOnline' => $this->isOnline,
            'status' => $this->status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
