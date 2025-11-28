<?php

namespace App\Domain\Models;

class Booking
{
    public ?int $bookingID;
    public int $patientID;
    public int $professionalID;
    public int $serviceID;
    public string $appointmentDate;
    public string $appointmentTime;
    public ?string $duration;
    public string $status;
    public ?string $notes;
    public ?string $created_at;
    public ?string $updated_at;

    public function __construct(array $data = [])
    {
        $this->bookingID = $data['bookingID'] ?? null;
        $this->patientID = $data['patientID'];
        $this->professionalID = $data['professionalID'];
        $this->serviceID = $data['serviceID'];
        $this->appointmentDate = $data['appointmentDate'];
        $this->appointmentTime = $data['appointmentTime'];
        $this->duration = $data['duration'] ?? null;
        $this->status = $data['status'] ?? 'pending';
        $this->notes = $data['notes'] ?? null;
        $this->created_at = $data['created_at'] ?? null;
        $this->updated_at = $data['updated_at'] ?? null;
    }

    public function toArray(): array
    {
        return [
            'bookingID' => $this->bookingID,
            'patientID' => $this->patientID,
            'professionalID' => $this->professionalID,
            'serviceID' => $this->serviceID,
            'appointmentDate' => $this->appointmentDate,
            'appointmentTime' => $this->appointmentTime,
            'duration' => $this->duration,
            'status' => $this->status,
            'notes' => $this->notes,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
