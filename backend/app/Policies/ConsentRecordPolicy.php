<?php

namespace App\Policies;

use App\Models\User;
use App\Domain\Models\ConsentRecord;

class ConsentRecordPolicy
{

    public function viewAny(User $user): bool
    {
        return in_array($user->role, ['admin', 'professional', 'patient']);
    }


    public function view(User $user, ConsentRecord $c): bool
    {
        if ($user->role === 'admin') return true;

        if ($user->role === 'professional') {
            return $c->professionalID === $user->professional?->professionalID;
        }

        if ($user->role === 'patient') {
            return $c->patientID === $user->patient?->patientID;
        }

        return false;
    }

    public function create(User $user): bool
    {
        return in_array($user->role, ['admin', 'professional', 'patient']);
    }

    public function update(User $user, ConsentRecord $c): bool
    {
        if ($user->role === 'admin') return true;

        if ($user->role === 'professional') {
            return $c->professionalID === $user->professional?->professionalID;
        }

        if ($user->role === 'patient') {
            return $c->patientID === $user->patient?->patientID;
        }

        return false;
    }

    public function delete(User $user, ConsentRecord $c): bool
    {
        if ($user->role === 'admin') return true;

        if ($user->role === 'professional') {
            return $c->professionalID === $user->professional?->professionalID 
                   && $c->patientID === null;
        }

        return false;
    }
}
