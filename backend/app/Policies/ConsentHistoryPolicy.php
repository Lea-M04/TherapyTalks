<?php

namespace App\Policies;

use App\Models\User;
use App\Domain\Models\ConsentHistory as DomainConsentHistory;

class ConsentHistoryPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->role === 'admin';
    }

    public function view(User $user, DomainConsentHistory $history): bool
    {
        return $user->role === 'admin' 
            || $user->id === $history->changedBy;
    }
}
