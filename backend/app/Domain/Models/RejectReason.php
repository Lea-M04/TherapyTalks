<?php
namespace App\Domain\Models;

class RejectReason
{
    public ?int $reasonID;
    public int $requestID;
    public string $title;
    public ?string $description;

    public function __construct(array $data)
    {
        $this->reasonID = $data['reasonID'] ?? null;
        $this->requestID = $data['requestID'];
        $this->title = $data['title'];
        $this->description = $data['description'] ?? null;
    }

    public function toArray(): array
    {
        return [
            'reasonID' => $this->reasonID,
            'requestID' => $this->requestID,
            'title' => $this->title,
            'description' => $this->description
        ];
    }
}
