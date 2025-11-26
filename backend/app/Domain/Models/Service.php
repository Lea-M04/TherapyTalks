<?php

namespace App\Domain\Models;

class Service
{
    public ?int $serviceID;
    public int $professionalID;
    public string $serviceName;
    public ?string $description;
    public ?string $durationMinutes;
    public float $price;
    public ?string $category;
    public bool $isActive;

    public function __construct(array $data = [])
    {
        $this->serviceID = $data['serviceID'] ?? null;
        $this->professionalID = (int)($data['professionalID'] ?? 0);
        $this->serviceName = $data['serviceName'] ?? '';
        $this->description = $data['description'] ?? null;
        $this->durationMinutes = $data['durationMinutes'] ?? null;
        $this->price = (float)($data['price'] ?? 0);
        $this->category = $data['category'] ?? null;
        $this->isActive = (bool)($data['isActive'] ?? true);
    }

    public function toArray(): array
    {
        return [
            'serviceID' => $this->serviceID,
            'professionalID' => $this->professionalID,
            'serviceName' => $this->serviceName,
            'description' => $this->description,
            'durationMinutes' => $this->durationMinutes,
            'price' => $this->price,
            'category' => $this->category,
            'isActive' => $this->isActive,
        ];
    }
}
