<?php

namespace App\Events;

use App\Models\Message;
use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcastNow
{
    use SerializesModels;

    public Message $message;

    public function __construct(Message $message)
    {
        $this->message = $message;
    }

    public function broadcastOn()
    {
        return new Channel('chat-room.' . $this->message->chatRoomID);
    }

    public function broadcastAs()
    {
        return 'message.sent';
    }

    public function broadcastWith()
    {
        return [
            'messageID' => $this->message->messageID,
            'senderID' => $this->message->senderID,
            'receiverID' => $this->message->receiverID,
            'chatRoomID' => $this->message->chatRoomID,
            'content' => $this->message->content,
            'created_at' => $this->message->created_at,
        ];
    }
}
