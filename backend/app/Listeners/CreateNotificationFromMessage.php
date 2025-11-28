<?php
namespace App\Listeners;

use App\Events\MessageSent;
use App\Application\Services\NotificationService;
use Illuminate\Contracts\Queue\ShouldQueue;

class CreateNotificationFromMessage implements ShouldQueue
{
    public function __construct(private NotificationService $notifications) {}

    public function handle(MessageSent $event)
    {
        $m = $event->message;
        $data = [
            'title' => 'New message from ' . ($m->sender->firstName ?? 'User'),
            'message' => substr($m->content,0,200),
            'type' => 'message',
            'userID' => $m->receiverID,
            'link' => '/chat/'.$m->chatRoomID,
            'systemBy' => $m->senderID,
        ];
        $created = $this->notifications->createForUser($data);
    }
}
