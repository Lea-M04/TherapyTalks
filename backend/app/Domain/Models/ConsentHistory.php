<?php

namespace App\Domain\Models;

class ConsentHistory
{
    public ?int $historyID;
    public int $consentID;
    public ?string $previousValue;
    public ?string $newValue;
    public string $changedAt;
    public int $changedBy;

    public function __construct(array $data = [])
    {
        $this->historyID = $data['historyID'] ?? null;
        $this->consentID = $data['consentID'];
        $this->previousValue = $data['previousValue'] ?? null;
        $this->newValue = $data['newValue'] ?? null;
        $this->changedAt = $data['changedAt'] ?? now();
        $this->changedBy = $data['changedBy'];
    }

    public function toArray(): array
    {
        return [
            'historyID' => $this->historyID,
            'consentID' => $this->consentID,
            'previousValue' => $this->previousValue,
            'newValue' => $this->newValue,
            'changedAt' => $this->changedAt,
            'changedBy' => $this->changedBy,
        ];
    }
}
