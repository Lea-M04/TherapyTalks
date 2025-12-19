<?php

namespace App\Policies;

use App\Models\User;
use App\Domain\Models\Booking;

class BookingPolicy
{
    public function viewAny(User $user): bool
    {
        return in_array($user->role, ['admin','professional','patient', 'moderator', 'auditor']);
    }

    public function view(User $user, Booking $booking): bool
    {
        return $user->role === 'admin' || $user->role === 'moderator' || $user->role === 'auditor'
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
    
public function createVirtualRoom(User $user, Booking $booking): bool
{
   
    if (in_array($user->role, ['admin','superadmin'])) return true;

    
    if ($user->professional && $user->professional->professionalID == $booking->professionalID) return true;

    if ($user->patient && $user->patient->patientID == $booking->patientID) return true;

    return false;
}

public function viewVirtualRoom(User $user, Booking $booking): bool
{

    return $this->createVirtualRoom($user, $booking);
}

}
