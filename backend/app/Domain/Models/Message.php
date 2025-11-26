<?php
namespace App\Domain\Models;

class Message
{
    public ?int $messageID;
    public ?string $content;
    public ?string $sentAt;
    public ?string $readAt;
    public int $senderID;
    public int $receiverID;
    public int $chatRoomID;
    public ?string $created_at;
    public ?string $updated_at;

    public function __construct(array $data = [])
    {
        $this->messageID = $data['messageID'] ?? null;
        $this->content = $data['content'] ?? null;
        $this->sentAt = $data['sentAt'] ?? null;
        $this->readAt = $data['readAt'] ?? null;
        $this->senderID = (int)($data['senderID'] ?? 0);
        $this->receiverID = (int)($data['receiverID'] ?? 0);
        $this->chatRoomID = (int)($data['chatRoomID'] ?? 0);
        $this->created_at = $data['created_at'] ?? null;
        $this->updated_at = $data['updated_at'] ?? null;
    }

    public function toArray(): array
    {
        return [
            'messageID' => $this->messageID,
            'content' => $this->content,
            'sentAt' => $this->sentAt,
            'readAt' => $this->readAt,
            'senderID' => $this->senderID,
            'receiverID' => $this->receiverID,
            'chatRoomID' => $this->chatRoomID,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
