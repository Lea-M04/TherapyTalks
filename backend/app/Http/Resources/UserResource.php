<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Domain\Models\User as DomainUser;

class UserResource extends JsonResource
{
    
    public function toArray($request): array
    {
        $u = $this->resource;

        if ($u instanceof DomainUser) {
            return [
                'userID' => $u->userID,
                'firstName' => $u->firstName,
                'lastName' => $u->lastName,
                'phoneNumber' => $u->phoneNumber,
                'email' => $u->email,
                'dateOfBirth' => $u->dateOfBirth,
                'gender' => $u->gender,
                'role' => $u->role,
                'status' => $u->status,
                'profileImage' => $u->profileImage,
                'username' => $u->username,
                'created_at' => $u->created_at,
                'updated_at' => $u->updated_at,
            ];
        }

        return [
            'userID' => $u->userID,
            'firstName' => $u->firstName,
            'lastName' => $u->lastName,
            'phoneNumber' => $u->phoneNumber,
            'email' => $u->email,
            'dateOfBirth' => $u->dateOfBirth ? $u->dateOfBirth->toDateString() : null,
            'gender' => $u->gender,
            'role' => $u->role,
            'status' => $u->status,
            'profileImage' => $u->profileImage,
            'username' => $u->username,
            'created_at' => $u->created_at?->toDateTimeString(),
            'updated_at' => $u->updated_at?->toDateTimeString(),
        ];
    }
}
