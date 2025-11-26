<?php
namespace App\Domain\Interfaces;

use App\Domain\Models\Message;

interface MessageRepositoryInterface
{
    public function create(Message $m): Message;
    public function findById(int $id): ?Message;
    public function findByChatRoom(int $chatRoomID, int $perPage = 50, int $page = 1): array; // returns ['data'=>..., 'meta'=>...]
    public function findForUser(int $userID, int $perPage = 50, int $page = 1): array;
    public function update(Message $m): Message;
    public function delete(int $id): bool;
    public function markAsRead(int $id, string $timestamp = null): ?Message;
}
