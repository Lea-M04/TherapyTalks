<?php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
{
    public function toArray($request): array
    {
        $m = $this->resource;
        return [
            'messageID' => $m->messageID,
            'content' => $m->content,
            'sentAt' => $m->sentAt,
            'readAt' => $m->readAt,
            'senderID' => $m->senderID,
            'receiverID' => $m->receiverID,
            'chatRoomID' => $m->chatRoomID,
            'created_at' => $m->created_at,
            'updated_at' => $m->updated_at,
        ];
    }
}
