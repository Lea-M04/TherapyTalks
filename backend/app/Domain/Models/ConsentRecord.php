<?php
namespace App\Domain\Models;

class ConsentRecord
{
    public ?int $consentID;
    public string $consentType;
    public ?string $description;
    public bool $isRevoked;
    public string $signedAt;
    public ?string $revokedAt;
    public int $patientID;
    public int $professionalID;

    public ?string $created_at;
    public ?string $updated_at;

    public function __construct(array $data = [])
    {
        $this->consentID = $data['consentID'] ?? null;
        $this->consentType = $data['consentType'];
        $this->description = $data['description'] ?? null;
        $this->isRevoked = $data['isRevoked'] ?? false;
        $this->signedAt = $data['signedAt'];
        $this->revokedAt = $data['revokedAt'] ?? null;
        $this->patientID = $data['patientID'];
        $this->professionalID = $data['professionalID'];
        $this->created_at = $data['created_at'] ?? null;
        $this->updated_at = $data['updated_at'] ?? null;
    }

    public function toArray(): array
    {
        return [
            'consentID' => $this->consentID,
            'consentType' => $this->consentType,
            'description' => $this->description,
            'isRevoked' => $this->isRevoked,
            'signedAt' => $this->signedAt,
            'revokedAt' => $this->revokedAt,
            'patientID' => $this->patientID,
            'professionalID' => $this->professionalID,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
