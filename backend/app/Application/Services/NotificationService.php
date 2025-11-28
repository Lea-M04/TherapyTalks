<?php
namespace App\Application\Services;

use App\Domain\Interfaces\NotificationRepositoryInterface;
use App\Models\Notification as EloquentNotification;
use App\Application\Services\AuditLogService;

class NotificationService
{
    public function __construct(
        private NotificationRepositoryInterface $repo,
        private AuditLogService $audit
    ){}

    public function createForUser(array $data) : \App\Domain\Models\Notification {
        $domain = new \App\Domain\Models\Notification($data);
        $created = $this->repo->create($domain);
        event(new \App\Events\NotificationCreated($created));
        $this->audit->write(action:'notification_created', targetType:'Notification', targetID:$created->notificationID, status:'success', performedBy: auth()->id() ?? $data['systemBy'] ?? null);

        return $created;
    }

    public function listForUser(int $userID, int $perPage=50, int $page=1): array {
        return $this->repo->findForUser($userID,$perPage,$page);
    }

    public function markAsRead(int $id) {
        return $this->repo->markAsRead($id);
    }

    public function delete(int $id): bool {
        return $this->repo->delete($id);
    }

    public function findById(int $id) {
    return $this->repo->findById($id);
}

}
