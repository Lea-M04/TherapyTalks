<?php

namespace App\Policies;

use App\Models\User;
use App\Domain\Models\Booking;

class BookingPolicy
{
    public function viewAny(User $user): bool
    {
        return in_array($user->role, ['admin','professional','patient']);
    }

    public function view(User $user, Booking $booking): bool
    {
        return $user->role === 'admin'
            || $user->id === $booking->patientID
            || $user->id === $booking->professionalID;
    }

    public function create(User $user): bool
    {
        return in_array($user->role, ['admin','patient']);
    }

    public function update(User $user, Booking $booking): bool
    {
        return $user->role === 'admin'
            || $user->id === $booking->patientID;
    }

    public function delete(User $user, Booking $booking): bool
    {
        return $user->role === 'admin';
    }
}
