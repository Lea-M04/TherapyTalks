<?php

namespace Infrastructure\Persistence\Repositories;

use Domain\Models\User;

interface UserRepository
{
    public function findById(int $id): ?User;

    public function findAll(int $perPage = 15, int $page = 1): array; 

    public function findByEmail(string $email): ?User;

    public function findByUsername(string $username): ?User;

    public function create(array $data): User;

    public function update(int $id, array $data): ?User;

    public function delete(int $id): bool;
}
