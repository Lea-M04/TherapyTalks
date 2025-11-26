<?php

namespace App\Application\DTOs;

class CreateChatRoomDTO
{
    public int $createdBy;
    public ?int $professionalID;
    public ?int $patientID;

    public function __construct(
        int $createdBy,
        ?int $professionalID = null,
        ?int $patientID = null
    ) {
        $this->createdBy = $createdBy;
        $this->professionalID = $professionalID;
        $this->patientID = $patientID;
    }
}
