<?php

namespace App\Domain\Models;

class VirtualRoom
{
    public ?int $roomID;
    public int $bookingID;
    public string $link;
    public ?string $expiresAt;


    public function __construct(array $data = [])
    {
        $this->roomID = $data['roomID'] ?? null;
        $this->bookingID = $data['bookingID'];
        $this->link = $data['link'];
        $this->expiresAt = $data['expiresAt'] ?? null;
    }

    public function toArray(): array
    {
        return [
            'roomID' => $this->roomID,
            'bookingID' => $this->bookingID,
            'link' => $this->link,
            'expiresAt' => $this->expiresAt,
        ];
    }
}