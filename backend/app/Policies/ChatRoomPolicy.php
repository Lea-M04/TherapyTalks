<?php
namespace App\Policies;

use App\Models\User;
use App\Models\ChatRoom;

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
            $user->userID === $chatRoom->patient?->userID ||
$user->userID === $chatRoom->professional?->userID;

    }

    public function create(User $user): bool
    {
        return in_array($user->role, ['patient', 'professional', 'admin']);
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
