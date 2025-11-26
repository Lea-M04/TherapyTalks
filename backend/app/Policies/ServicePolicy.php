<?php

namespace App\Policies;

use App\Models\User;
use App\Domain\Models\Service as DomainService;

class ServicePolicy
{
    public function viewAny(User $user): bool
    {
        return in_array($user->role, ['admin', 'professional']);
    }

    public function view(User $user, DomainService $service): bool
    {
        return $user->role === 'admin'
            || $user->id === $service->professionalID;
    }

    public function create(User $user): bool
    {
        return $user->role === 'professional' || $user->role === 'admin';
    }

    public function update(User $user, DomainService $service): bool
    {
        return $user->role === 'admin'
            || $user->id === $service->professionalID;
    }

    public function delete(User $user, DomainService $service): bool
    {
        return $user->role === 'admin'
            || $user->id === $service->professionalID;
    }
}
