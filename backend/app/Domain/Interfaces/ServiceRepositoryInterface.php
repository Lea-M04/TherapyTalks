<?php

namespace App\Domain\Interfaces;

use App\Domain\Models\Service;

interface ServiceRepositoryInterface
{
    public function findById(int $id): ?Service;
    public function findByProfessional(int $professionalID): array;
    public function create(Service $s): Service;
    public function update(Service $s): Service;
    public function delete(int $id): bool;
}
