<?php

use Illuminate\Support\Facades\Broadcast;
use App\Models\ChatRoom;
use App\Models\Patient;
use App\Models\Professional;

Broadcast::channel('chat-room.{chatRoomID}', function ($user, $chatRoomID) {
    $userId = $user->userID ?? $user->id ?? null;
    if (!$userId) return false;

    $c = ChatRoom::where('chatRoomID', $chatRoomID)->first();
    if (!$c) return false;

    if ($c->createdBy == $userId) return true;
    if ($c->patientID) {
        $patient = Patient::where('patientID', $c->patientID)->first();
        if ($patient && $patient->userID == $userId) return true;
    }

    if ($c->professionalID) {
        $prof = Professional::where('professionalID', $c->professionalID)->first();
        if ($prof && $prof->userID == $userId) return true;
    }

    return false;
});


    Broadcast::channel('user.{userID}', function ($user, $userID) {
    return (int)$user->userID === (int)$userID;
});
