<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class NotificationResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'notificationID' => $this->notificationID,
            'title' => $this->title,
            'message' => $this->message,
            'type' => $this->type,
            'isRead' => $this->isRead,
            'link' => $this->link,
            'userID' => $this->userID,
            'created_at' => $this->created_at,
        ];
    }
}
