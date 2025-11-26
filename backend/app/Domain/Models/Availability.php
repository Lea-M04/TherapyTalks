<?php

namespace App\Domain\Models;

class Availability
{
    public ?int $availabilityID;
    public int $professionalID;
    public string $dayOfWeek;
    public string $startTime;
    public string $endTime;
    public bool $isAvailable;

    public function __construct(array $data = [])
    {
        $this->availabilityID = $data['availabilityID'] ?? null;
        $this->professionalID = (int)($data['professionalID'] ?? 0);
        $this->dayOfWeek = $data['dayOfWeek'] ?? 'Mon';
        $this->startTime = $data['startTime'] ?? '09:00';
        $this->endTime = $data['endTime'] ?? '17:00';
        $this->isAvailable = (bool)($data['isAvailable'] ?? true);
    }

    public function toArray(): array
    {
        return [
            'availabilityID' => $this->availabilityID,
            'professionalID' => $this->professionalID,
            'dayOfWeek' => $this->dayOfWeek,
            'startTime' => $this->startTime,
            'endTime' => $this->endTime,
            'isAvailable' => $this->isAvailable,
        ];
    }
}
