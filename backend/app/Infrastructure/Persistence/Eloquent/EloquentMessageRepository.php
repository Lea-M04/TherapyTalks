<?php
namespace App\Infrastructure\Persistence\Eloquent;

use App\Models\Message as EloquentMessage;
use App\Domain\Models\Message;
use App\Domain\Interfaces\MessageRepositoryInterface;

class EloquentMessageRepository implements MessageRepositoryInterface
{
    private function mapToDomain(EloquentMessage $e): Message
    {
        return new Message([
            'messageID' => $e->messageID,
            'content' => $e->content,
            'sentAt' => $e->sentAt,
            'readAt' => $e->readAt,
            'senderID' => $e->senderID,
            'receiverID' => $e->receiverID,
            'chatRoomID' => $e->chatRoomID,
            'created_at' => $e->created_at,
            'updated_at' => $e->updated_at,
        ]);
    }

    public function create(Message $m): Message
    {
        $e = EloquentMessage::create([
            'content' => $m->content,
            'sentAt' => $m->sentAt ?? now(),
            'readAt' => $m->readAt,
            'senderID' => $m->senderID,
            'receiverID' => $m->receiverID,
            'chatRoomID' => $m->chatRoomID,
        ]);

        return $this->mapToDomain($e);
    }

    public function findById(int $id): ?Message
    {
        $e = EloquentMessage::where('messageID', $id)->first();
        return $e ? $this->mapToDomain($e) : null;
    }

    public function findByChatRoom(int $chatRoomID, int $perPage = 50, int $page = 1): array
    {
        $paginator = EloquentMessage::where('chatRoomID', $chatRoomID)
            ->orderBy('sentAt', 'asc')
            ->paginate($perPage, ['*'], 'page', $page);

        $data = $paginator->getCollection()->map(fn($e) => $this->mapToDomain($e))->all();

        return [
            'data' => $data,
            'meta' => [
                'total' => $paginator->total(),
                'per_page' => $paginator->perPage(),
                'current_page' => $paginator->currentPage(),
                'last_page' => $paginator->lastPage(),
            ]
        ];
    }

    public function findForUser(int $userID, int $perPage = 50, int $page = 1): array
    {
        $paginator = EloquentMessage::where(function($q) use ($userID) {
                $q->where('senderID', $userID)->orWhere('receiverID', $userID);
            })
            ->orderBy('sentAt', 'desc')
            ->paginate($perPage, ['*'], 'page', $page);

        $data = $paginator->getCollection()->map(fn($e) => $this->mapToDomain($e))->all();

        return [
            'data' => $data,
            'meta' => [
                'total' => $paginator->total(),
                'per_page' => $paginator->perPage(),
                'current_page' => $paginator->currentPage(),
                'last_page' => $paginator->lastPage(),
            ]
        ];
    }

    public function update(Message $m): Message
    {
        $e = EloquentMessage::where('messageID', $m->messageID)->firstOrFail();
        $e->update([
            'content' => $m->content,
            'readAt' => $m->readAt,
        ]);
        return $this->mapToDomain($e);
    }

    public function delete(int $id): bool
    {
        return (bool) EloquentMessage::where('messageID', $id)->delete();
    }

    public function markAsRead(int $id, string $timestamp = null): ?Message
    {
        $e = EloquentMessage::where('messageID', $id)->first();
        if (!$e) return null;
        $e->readAt = $timestamp ?? now();
        $e->save();
        return $this->mapToDomain($e);
    }
}
