<?php

namespace App\Domain\Models;

class Notification
{
    public ?int $notificationID=null;
    public string $title;
    public string $message;
    public string $type;
    public bool $isRead;
    public ?string $link;
    public int $userID;
    public ?string $created_at = null;
    public ?string $updated_at = null;

    public function __construct(array $data)
    {
        $this->notificationID = $data['notificationID'] ?? null;
        $this->title = $data['title'];
        $this->message = $data['message'];
        $this->type = $data['type'];
        $this->isRead = $data['isRead'] ?? false;
        $this->link = $data['link'] ?? null;
        $this->userID = $data['userID'];
        $this->created_at = $data['created_at'] ?? null;
        $this->updated_at = $data['updated_at'] ?? null;
    }
}
