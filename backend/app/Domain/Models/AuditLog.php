<?php

namespace App\Domain\Models;

class AuditLog
{
    public string $action;
    public string $targetType;
    public ?int $targetID;
    public string $timestamp;
    public string $status;
    public int $userID;

    public function __construct(
        string $action,
        string $targetType,
        ?int $targetID,
         string $timestamp,
        string $status,
        int $userID,
    ) {
        $this->action = $action;
        $this->targetType = $targetType;
        $this->targetID = $targetID;
         $this->timestamp = $timestamp;
        $this->status = $status;
        $this->userID = $userID;
    }
}
