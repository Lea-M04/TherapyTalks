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


    'createdByUser' => $c->createdBy ? [
    'userID' => $c->createdBy,
    'firstName' => optional(\App\Models\User::find($c->createdBy))->firstName,
    'lastName' => optional(\App\Models\User::find($c->createdBy))->lastName,
] : null,


    'professional' => $c->professional ? [
            'professionalID' => $c->professional->professionalID,
            'user' => [
                'userID' => $c->professional->user?->userID,
                'firstName' => $c->professional->user?->firstName,
                'lastName' => $c->professional->user?->lastName,
            ]
        ] : null,


        'patient' => $c->patient ? [
            'patientID' => $c->patient->patientID,
            'user' => [
                'userID' => $c->patient->user?->userID,
                'firstName' => $c->patient->user?->firstName,
                'lastName' => $c->patient->user?->lastName,
            ]
        ] : null,
            ];
    }
}
