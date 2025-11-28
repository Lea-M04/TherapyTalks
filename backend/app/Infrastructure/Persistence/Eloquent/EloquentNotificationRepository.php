<?php

namespace App\Infrastructure\Persistence\Eloquent;

use App\Models\Notification as EloquentNotification;
use App\Domain\Models\Notification;
use App\Domain\Interfaces\NotificationRepositoryInterface;

class EloquentNotificationRepository implements NotificationRepositoryInterface
{
    private function mapToDomain(EloquentNotification $e): Notification
    {
        return new Notification([
            'notificationID' => $e->notificationID,
            'title' => $e->title,
            'message' => $e->message,
            'type' => $e->type,
            'isRead' => $e->isRead,
            'link' => $e->link,
            'userID' => $e->userID,
            'created_at' => $e->created_at,
            'updated_at' => $e->updated_at,
        ]);
    }

    public function create(Notification $n): Notification
    {
        $e = EloquentNotification::create([
            'title' => $n->title,
            'message' => $n->message,
            'type' => $n->type,
            'isRead' => $n->isRead,
            'link' => $n->link,
            'userID' => $n->userID,
        ]);
        return $this->mapToDomain($e);
    }

    public function findForUser(int $userID, int $perPage = 50, int $page = 1): array
    {
        $paginator = EloquentNotification::where('userID', $userID)
            ->orderBy('created_at', 'desc')
            ->paginate($perPage, ['*'], 'page', $page);

        $data = $paginator->getCollection()
            ->map(fn($e) => $this->mapToDomain($e))->all();

        return [
            'data' => $data,
            'meta' => [
                'total' => $paginator->total(),
                'per_page' => $paginator->perPage(),
                'current_page' => $paginator->currentPage(),
                'last_page' => $paginator->lastPage(),
            ],
        ];
    }

    public function markAsRead(int $id): ?Notification
    {
        $e = EloquentNotification::find($id);
        if (!$e) return null;

        $e->isRead = true;
        $e->save();

        return $this->mapToDomain($e);
    }

    public function delete(int $id): bool
    {
        return (bool) EloquentNotification::where('notificationID', $id)->delete();
    }
    
    public function findById(int $id): ?Notification
    {
        $e = EloquentNotification::find($id);
        return $e ? $this->mapToDomain($e) : null;
    }
}
