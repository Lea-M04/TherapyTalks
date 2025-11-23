<?php

namespace App\Policies;

use App\Models\User as User;
use App\Domain\Models\Professional as DomainProfessional;

class ProfessionalPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->role === 'admin';
    }

    public function view(User $user, DomainProfessional $model): bool
    {
        return $user->role === 'admin' || $user->id === $model->userID;
    }

    public function create(User $user): bool
    {
        return $user->role === 'admin';
    }

    public function update(User $user, DomainProfessional $model): bool
    {
        return $user->role === 'admin' || $user->id === $model->userID;
    }

    public function delete(User $user, DomainProfessional $model): bool
    {
        return $user->role === 'admin';
    }
}
