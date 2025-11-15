<?php

namespace Domain\Interfaces;

use Domain\Models\User;

interface UserRepositoryInterface
{
    public function create(User $user): User;

    public function findByEmail(string $email): ?User;

    public function findById(string $id): ?User;

    public function update(User $user): User;
}
