<?php
namespace App\Policies;

use App\Models\User;
use App\Domain\Models\Message;
use App\Models\ChatRoom;
use App\Models\Patient;
use App\Models\Professional;

class MessagePolicy
{
    public function viewAny(User $user): bool
    {

        return true;
    }

    public function view(User $user, Message $message): bool
    {
        if ($user->role === 'admin') return true;
        if ($user->id === $message->senderID) return true;
        if ($user->id === $message->receiverID) return true;

        $c = ChatRoom::where('chatRoomID', $message->chatRoomID)->first();
        if (!$c) return false;
        if ($c->createdBy == $user->id) return true;
        $patient = Patient::where('patientID', $c->patientID)->first();
        if ($patient && $patient->userID == $user->id) return true;
        $prof = Professional::where('professionalID', $c->professionalID)->first();
        if ($prof && $prof->userID == $user->id) return true;

        return false;
    }

    public function create(User $user): bool
    {

        return true;
    }

    public function update(User $user, Message $message): bool
    {

        return $user->role === 'admin' || $user->id === $message->senderID;
    }

    public function delete(User $user, Message $message): bool
    {

        return $user->role === 'admin' || $user->id === $message->senderID;
    }
}
