<?php

namespace App\Domain\Interfaces;

use App\Domain\Models\Availability;

interface AvailabilityRepositoryInterface
{
    public function create(Availability $a): Availability;
    public function update(Availability $a): Availability;
    public function delete(int $id): bool;
    public function findById(int $id): ?Availability;
    public function findByProfessional(int $professionalID): array;
    public function setAllUnavailable(int $professionalID): void;
    public function setAllAvailable(int $professionalID): void;
    public function hasOverlap(int $professionalID, string $day, string $start, string $end, ?int $ignoreID = null): bool;

}
