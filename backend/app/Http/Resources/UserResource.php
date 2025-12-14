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
                'email' => is_object($u->email)
    ? (method_exists($u->email, 'value') ? $u->email->value() : '')
    : $u->email,
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
              'dateOfBirth' => $u->dateOfBirth instanceof \DateTimeInterface ? $u->dateOfBirth->format('Y-m-d') : $u->dateOfBirth,
            'role' => $u->role,
            'gender' => $u->gender,
            'status' => $u->status,
            'profileImage' => $u->profileImage,
            'username' => $u->username,
            'created_at' => $u->created_at instanceof \DateTimeInterface ? $u->created_at->format('Y-m-d H:i:s') : $u->created_at,
            'updated_at' => $u->updated_at instanceof \DateTimeInterface ? $u->updated_at->format('Y-m-d H:i:s') : $u->updated_at,

        ];
    }
}
