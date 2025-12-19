<?php

namespace App\Policies;

use App\Models\User as User;
use App\Domain\Models\Professional as DomainProfessional;

class ProfessionalPolicy
{
    public function viewAny(?User $user): bool
    {
        return true; 
    }

    public function view(?User $user, DomainProfessional $model): bool
    {
        return true; 
    }

    public function create(User $user): bool
    {
        return in_array($user->role, ['admin', 'professional', 'moderator']);
    }

    public function update(User $user, DomainProfessional $model): bool
    {
        return $user->role === 'admin' || $user->role === 'moderator' || $user->userID === $model->userID;
    }

    public function delete(User $user, DomainProfessional $model): bool
    {
        return $user->role === 'admin' || $user->role === 'moderator';
    }
}
