<?php

namespace App\Policies;

use App\Models\User;
use App\Domain\Models\Diagnosis;

class DiagnosisPolicy
{
    public function viewAny(User $user): bool
{
    return in_array($user->role, ['admin', 'professional', 'patient']);
}

public function view(User $user, Diagnosis $diagnosis): bool
{
    if ($user->role === 'admin') {
        return true;
    }

    if ($user->role === 'professional' && $user->id === $diagnosis->professionalID) {
        return true;
    }

    $patient = \App\Models\Patient::where('userID', $user->id)->first();

    return $user->role === 'patient' 
           && $patient 
           && $patient->patientID === $diagnosis->patientID;
}


    public function create(User $user): bool
    {
        return in_array($user->role, ['admin', 'professional']);
    }

    public function update(User $user, Diagnosis $diagnosis): bool
    {
        return 
            $user->role === 'admin' ||
            ($user->role === 'professional' && $user->userID === $diagnosis->professionalID);
    }

    public function delete(User $user, Diagnosis $diagnosis): bool
    {
        return $user->role === 'admin';
    }
}
