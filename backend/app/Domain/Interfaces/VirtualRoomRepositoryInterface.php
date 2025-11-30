<?php

namespace App\Domain\Interfaces;

use App\Domain\Models\VirtualRoom;

interface VirtualRoomRepositoryInterface
{
    public function create(VirtualRoom $room): VirtualRoom;
    public function findByBookingId(int $bookingId): ?VirtualRoom;
}