<?php
namespace App\Policies;

use App\Models\User;
use App\Domain\Models\RejectReason;
use App\Models\VerificationRequest;

class RejectReasonPolicy
{
   public function viewAny(User $user): bool {
        return $user->role === 'admin' || $user->role === 'professional';
    }

    public function view(User $user, RejectReason $reason): bool
    {
        if ($user->role === 'admin') {
        return true;
    }

    if ($user->role === 'professional') {
        if (!$user->professional) {
            return false;
        }
        $req = VerificationRequest::find($reason->requestID);

        if (!$req) {
            return false;
        }
        return $req->professionalID == $user->professional->professionalID;
    }

    return false;
    }

    public function delete(User $user, RejectReason $r): bool {
        return $user->role === 'admin';
    }
}