<?php
namespace App\Policies;

use App\Models\User;
use App\Domain\Models\Payment;

class PaymentPolicy
{
      public function viewAny(User $user)
    {
        return $user->role === 'admin';
    }
    public function view(User $user, Payment $payment)
    {
        return $user->role === 'admin'
            || $user->userID === $payment->patientID;
    }

    public function update(User $user, Payment $payment)
    {
        return $user->role === 'admin';
    }

}
