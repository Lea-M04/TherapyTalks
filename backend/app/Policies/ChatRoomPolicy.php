<?php

namespace App\Policies;

use App\Models\User;
use App\Domain\Models\ChatRoom;

class ChatRoomPolicy
{
    public function viewAny(User $user): bool
{
    return true;
}


    public function view(User $user, ChatRoom $chatRoom): bool
    {
       
        return
            $user->role === 'admin' ||
            $user->userID === $chatRoom->createdBy ||
            $user->userID === $chatRoom->patientID ||
            $user->userID === $chatRoom->professionalID;
    }

    public function create(User $user): bool
    {
       
        return $user->role === 'admin' || $user->role === 'professional';
    }

    public function update(User $user, ChatRoom $chatRoom): bool
    {
    
        return $user->role === 'admin';
    }

    public function delete(User $user, ChatRoom $chatRoom): bool
    {
     
        return $user->role === 'admin';
    }
}
