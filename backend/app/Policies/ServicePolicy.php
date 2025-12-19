<?php

namespace App\Policies;

use App\Models\User;
use App\Domain\Models\Service as DomainService;

class ServicePolicy
{
    public function viewAny(?User $user): bool
    {
        return true;
    }

    public function view(User $user, DomainService $service): bool
    {
        return $user->role === 'admin'
             || ($user->role === 'professional' || $user->role === 'moderator'
                && $user->professional->professionalID === $service->professionalID);
    }

    public function create(User $user): bool
    {
        return $user->role === 'professional' || $user->role === 'admin' || $user->role === 'moderator';
    }

    public function update(User $user, DomainService $service): bool
    {
        return $user->role === 'admin'
           || ($user->role === 'professional'
                && $user->professional->professionalID === $service->professionalID);
    }

    public function delete(User $user, DomainService $service): bool
    {
        return $user->role === 'admin'
          || ($user->role === 'professional'
                && $user->professional->professionalID === $service->professionalID);
    }
}
