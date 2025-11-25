<?php

namespace App\Policies;

use App\Models\User;
use App\Domain\Models\ConsentRecord;

class ConsentRecordPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->role === 'admin';
    }

    public function view(User $user, ConsentRecord $c): bool
    {
        return $user->role === 'admin';
    }

    public function create(User $user): bool
    {
        return $user->role === 'admin';
    }

    public function update(User $user, ConsentRecord $c): bool
    {
        return $user->role === 'admin';
    }

    public function delete(User $user, ConsentRecord $c): bool
    {
        return $user->role === 'admin';
    }
}
