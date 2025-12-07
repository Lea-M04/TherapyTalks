<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ChatRoomResource extends JsonResource
{
    public function toArray($request): array
    {
        $c = $this->resource;
  $authID = auth()->user()->userID;

        $other = null;
        $isPatient = false;
        if ($authID === $c->patient?->user?->userID) {
            $other = $c->professional?->user;
              $isPatient = false;
        } else {
            $other = $c->patient?->user;
             $isPatient = true;
        }
        return [
            'chatRoomID' => $c->chatRoomID,
            'createdBy' => $c->createdBy,
            'professionalID' => $c->professionalID,
            'patientID' => $c->patientID,
            'created_at' => $c->created_at,
            'updated_at' => $c->updated_at,
 'patientUserID' => $c->patient?->user?->userID,
'professionalUserID' => $c->professional?->user?->userID,
 'otherUser' => $other ? [
                'userID' => $other->userID,
                 'displayName' => $isPatient && $c->patient?->pseudonym
            ? $c->patient->pseudonym
            : $other->firstName . ' ' . $other->lastName,
                'firstName' => $other->firstName,
                'lastName' => $other->lastName,
            ] : null,
        ];
    }
}
