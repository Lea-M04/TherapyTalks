<?php

namespace App\Domain\Interfaces;

use App\Domain\Models\Professional;

interface ProfessionalRepositoryInterface
{
    public function create(Professional $professional): Professional;
    public function findById(int $id): ?Professional;
    public function findByUserId(int $userID): ?Professional;
    public function findAll(int $perPage = 15, int $page = 1): array;
    public function update(Professional $professional): Professional;
    public function delete(int $id): bool;
}
