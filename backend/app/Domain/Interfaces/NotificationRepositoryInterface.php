<?php
namespace App\Domain\Interfaces;

use App\Domain\Models\Notification;

interface NotificationRepositoryInterface {
    public function create(Notification $n): Notification;
    public function findById(int $id): ?Notification;
    public function findForUser(int $userID, int $perPage = 50, int $page = 1): array;
    public function markAsRead(int $id): ?Notification;
    public function delete(int $id): bool;
}
