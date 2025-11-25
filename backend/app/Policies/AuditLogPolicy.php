<?php

namespace App\Policies;

use App\Models\User;

class AuditLogPolicy
{
    public function viewAny(User $user)
    {
        return $user->role === 'admin' || $user->role === 'auditor';
    }
}
