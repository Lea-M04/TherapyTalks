<?php

namespace App\Application\DTOs;

class UpdateChatRoomDTO
{
    public int $chatRoomID;
    public ?int $professionalID;
    public ?int $patientID;

    public function __construct(
        int $chatRoomID,
        ?int $professionalID = null,
        ?int $patientID = null
    ) {
        $this->chatRoomID = $chatRoomID;
        $this->professionalID = $professionalID;
        $this->patientID = $patientID;
    }
}
