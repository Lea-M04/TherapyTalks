<?php
namespace App\Domain\Models;

class VerificationRequest
{
    public ?int $requestID;
    public int $professionalID;
    public string $documentType;
    public string $documentURL;
    public string $submittedAt;
    public ?string $verifiedAt;
    public string $status;
    public ?int $reviewedBy;
    public ?string $comments;

    public function __construct(array $data = [])
    {
        $this->requestID = $data['requestID'] ?? null;
        $this->professionalID = $data['professionalID'];
        $this->documentType = $data['documentType'];
        $this->documentURL = $data['documentURL'];
        $this->submittedAt = $data['submittedAt'];
        $this->verifiedAt = $data['verifiedAt'] ?? null;
        $this->status = $data['status'] ?? 'pending';
        $this->reviewedBy = $data['reviewedBy'] ?? null;
        $this->comments = $data['comments'] ?? null;
    }

    public function toArray(): array
    {
        return [
            'requestID' => $this->requestID,
            'professionalID' => $this->professionalID,
            'documentType' => $this->documentType,
            'documentURL' => $this->documentURL,
            'submittedAt' => $this->submittedAt,
            'verifiedAt' => $this->verifiedAt,
            'status' => $this->status,
            'reviewedBy' => $this->reviewedBy,
            'comments' => $this->comments,
        ];
    }
}
