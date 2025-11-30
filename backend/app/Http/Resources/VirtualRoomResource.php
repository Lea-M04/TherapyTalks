<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class VirtualRoomResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'roomID' => $this->roomID,
            'bookingID' => $this->bookingID,
            'link' => $this->link,
            'expiresAt' => $this->expiresAt,
        ];
    }
}