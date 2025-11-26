<?php
namespace App\Policies;

use App\Models\User;
use App\Domain\Models\Availability;

class AvailabilityPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->role === 'admin' || $user->role === 'moderator';
    }

    public function view(User $user, Availability $a): bool
    {
        return $user->role === 'admin'
            || $user->role === 'moderator'
            || $user->id === $a->professionalID;
    }

    public function create(User $user): bool
    {
        return $user->role === 'admin'
            || $user->role === 'professional';
    }

    public function update(User $user, Availability $a): bool
    {
        return $user->role === 'admin'
            || $user->id === $a->professionalID;
    }

    public function delete(User $user, Availability $a): bool
    {
        return $user->role === 'admin'
            || $user->id === $a->professionalID;
    }
}
