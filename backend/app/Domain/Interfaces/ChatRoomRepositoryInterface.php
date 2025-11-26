<?php

namespace App\Domain\Interfaces;

use App\Domain\Models\ChatRoom;

interface ChatRoomRepositoryInterface
{
    public function create(ChatRoom $chatRoom): ChatRoom;
    public function findById(int $id): ?ChatRoom;
    public function findAll(int $perPage = 15, int $page = 1): array;
    public function update(ChatRoom $chatRoom): ChatRoom;
    public function delete(int $id): bool;
}
