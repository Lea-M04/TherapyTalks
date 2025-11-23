<?php

namespace App\Policies;

use App\Models\User; 
use App\Domain\Models\Patient as DomainPatient;

class PatientPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->role === 'admin';
    }

    public function view(User $user, DomainPatient $model): bool
    {
        return $user->role === 'admin' || $user->id === $model->patientID;
    }

    public function create(User $user): bool
    {
        return $user->role === 'admin';
    }

    public function update(User $user, DomainPatient $model): bool
    {
        return $user->role === 'admin' || $user->id === $model->patientID;
    }

    public function delete(User $user, DomainPatient $model): bool
    {
        return $user->role === 'admin';
    }
}
