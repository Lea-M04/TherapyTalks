<?php
namespace App\Policies;

use App\Models\User;
use App\Domain\Models\VerificationRequest;
class VerificationRequestPolicy
{
    public function submit(User $u): bool
    {
        return $u->role === 'professional';
    }

    public function review(User $u): bool
    {
        return $u->role === 'admin';
    }
    public function viewAll(User $user): bool
    {
        return $user->role === 'admin' || $user->role === 'moderator';
    }

    public function viewPending(User $user): bool
    {
        return $user->role === 'admin' || $user->role === 'moderator';
    }

    public function view(User $user, VerificationRequest $verificationRequest): bool
{
    if ($user->role === 'admin' || $user->role === 'moderator') {
        return true;
    }
    if ($user->role === 'professional' && $user->professional) {
        return $verificationRequest->professionalID === $user->professional->professionalID;
    }

    return false;}
}
