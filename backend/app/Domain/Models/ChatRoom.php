<?php

namespace App\Domain\Models;

class ChatRoom
{
    public ?int $chatRoomID;
    public int $createdBy;
    public ?int $professionalID;
    public ?int $patientID;
    public ?string $created_at;
    public ?string $updated_at;

    public function __construct(array $data = [])
    {
        $this->chatRoomID = $data['chatRoomID'] ?? null;
        $this->createdBy = $data['createdBy'] ?? 0;
        $this->professionalID = $data['professionalID'] ?? null;
        $this->patientID = $data['patientID'] ?? null;
        $this->created_at = $data['created_at'] ?? null;
        $this->updated_at = $data['updated_at'] ?? null;
    }

    public function toArray(): array
    {
        return [
            'chatRoomID' => $this->chatRoomID,
            'createdBy' => $this->createdBy,
            'professionalID' => $this->professionalID,
            'patientID' => $this->patientID,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
