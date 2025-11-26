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
        // user can list messages for themselves (service filters)
        return true;
    }

    public function view(User $user, Message $message): bool
    {
        if ($user->role === 'admin') return true;
        if ($user->id === $message->senderID) return true;
        if ($user->id === $message->receiverID) return true;

        // also allow if user is part of the chatroom (createdBy / patient.userID / professional.userID)
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
        // any authenticated user can attempt to send — we'll check membership in controller/service
        return true;
    }

    public function update(User $user, Message $message): bool
    {
        // only sender or admin can edit (if you allow edits)
        return $user->role === 'admin' || $user->id === $message->senderID;
    }

    public function delete(User $user, Message $message): bool
    {
        // admin or sender
        return $user->role === 'admin' || $user->id === $message->senderID;
    }
}
