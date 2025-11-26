<?php

namespace App\Application\DTOs;

class UpdateConsentRecordDTO
{
    public int $consentID;
    public ?string $consentType;
    public ?string $description;
    public ?bool $isRevoked;
    public ?string $revokedAt;

    public function __construct(
        int $consentID,
        ?string $consentType = null,
        ?string $description = null,
        ?bool $isRevoked = null,
        ?string $revokedAt = null
    ) {
        $this->consentID = $consentID;
        $this->consentType = $consentType;
        $this->description = $description;
        $this->isRevoked = $isRevoked;
        $this->revokedAt = $revokedAt;
    }
}
