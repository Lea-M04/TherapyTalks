<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ChatRoomResource extends JsonResource
{
    public function toArray($request): array
    {
        $c = $this->resource;

        return [
            'chatRoomID' => $c->chatRoomID,
            'createdBy' => $c->createdBy,
            'professionalID' => $c->professionalID,
            'patientID' => $c->patientID,
            'created_at' => $c->created_at,
            'updated_at' => $c->updated_at,
        ];
    }
}
