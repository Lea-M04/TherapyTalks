<?php

namespace App\Policies;

use App\Models\User as User;
use App\Domain\Models\User as DomainUser;

class UserPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->role === 'admin';
    }

    public function view(User $user, DomainUser $model): bool
    {
        return $user->role === 'admin' || $user->userID === $model->userID;
    }

    public function create(User $user): bool
    {
        return $user->role === 'admin';
    }

    public function update(User $user, User $model): bool
    {
        return $user->role === 'admin' || $user->userID === $model->userID;
    }

    public function delete(User $user, DomainUser $model): bool
    {
        return $user->role === 'admin';
    }
}
