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
        if ($user->userID  === $message->senderID) return true;
        if ($user->userID  === $message->receiverID) return true;

        $c = ChatRoom::where('chatRoomID', $message->chatRoomID)->first();
        if (!$c) return false;
        if ($c->createdBy == $user->userID ) return true;
        $patient = Patient::where('patientID', $c->patientID)->first();
        if ($patient && $patient->userID == $user->userID) return true;
        $prof = Professional::where('professionalID', $c->professionalID)->first();
        if ($prof && $prof->userID == $user->userID) return true;

        return false;
    }

    public function create(User $user): bool
    {

        return true;
    }

    public function update(User $user, Message $message): bool
    {

        return $user->role === 'admin' || $user->userID === $message->senderID;
    }

    public function delete(User $user, Message $message): bool
    {

        return $user->role === 'admin' || $user->userID === $message->senderID;
    }
}
