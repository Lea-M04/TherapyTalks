<?php

namespace App\Domain\Interfaces;

use App\Domain\Models\User;
interface UserRepositoryInterface
{
    public function create(User $user): User;
    public function findByEmail(string $email): ?User;
    public function findById(int $id): ?User;
    public function findByUsername(string $username): ?User;
    public function findAll(int $perPage = 15, int $page = 1): array;
    public function update(User $user): User;
    public function delete(int $id): bool;
}

