<?php
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
}
