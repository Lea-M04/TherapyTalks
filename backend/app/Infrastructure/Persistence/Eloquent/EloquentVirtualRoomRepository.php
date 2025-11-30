<?php

namespace App\Infrastructure\Persistence\Eloquent;

use App\Domain\Interfaces\VirtualRoomRepositoryInterface;
use App\Domain\Models\VirtualRoom;
use App\Models\VirtualRoom as EloquentVirtualRoom;

class EloquentVirtualRoomRepository implements VirtualRoomRepositoryInterface
{
    private function mapToDomain(EloquentVirtualRoom $r): VirtualRoom
    {
        return new VirtualRoom([
            'roomID' => $r->roomID,
            'bookingID' => $r->bookingID,
            'link' => $r->link,
            'expiresAt' => $r->expiresAt ? $r->expiresAt->toDateTimeString() : null,
        ]);
    }

    public function create(VirtualRoom $room): VirtualRoom
    {
        $eloquent = EloquentVirtualRoom::create($room->toArray());
        return $this->mapToDomain($eloquent);
    }

    public function findByBookingId(int $bookingId): ?VirtualRoom
    {
        $r = EloquentVirtualRoom::where('bookingID', $bookingId)->first();
        return $r ? $this->mapToDomain($r) : null;
    }
}