<?php
namespace App\Policies;

use App\Domain\Models\User;
use App\Domain\Models\Payment;

class PaymentPolicy
{
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
