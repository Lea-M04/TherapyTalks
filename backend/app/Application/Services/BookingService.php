<?php

namespace App\Application\Services;

use App\Domain\Interfaces\BookingRepositoryInterface;
use App\Domain\Models\Booking;
use App\Application\Services\AuditLogService;

class BookingService
{
    private BookingRepositoryInterface $repo;
    private AuditLogService $audit;

    public function __construct(BookingRepositoryInterface $repo, AuditLogService $audit)
    {
        $this->repo = $repo;
        $this->audit = $audit;
    }

    public function list(int $perPage = 15, int $page = 1): array
    {
        return $this->repo->findAll($perPage, $page);
    }

    public function get(int $id): ?Booking
    {
        return $this->repo->findById($id);
    }

    public function create(array $data): Booking
    {
        $booking = new Booking($data);

        $created = $this->repo->create($booking);

        $this->audit->write(
            action: 'booking_created',
            targetType: 'Booking',
            targetID: $created->bookingID,
            status: 'success',
            performedBy: auth()->id() ?? null
        );

        return $created;
    }

    public function update(int $id, array $data): ?Booking
    {
        $existing = $this->repo->findById($id);
        if (!$existing) return null;

        $updatedModel = new Booking(array_merge($existing->toArray(), $data));
        $updated = $this->repo->update($updatedModel);

        $this->audit->write(
            action: 'booking_updated',
            targetType: 'Booking',
            targetID: $updated->bookingID,
            status: 'success',
            performedBy: auth()->id() ?? null
        );

        return $updated;
    }

    public function delete(int $id): bool
    {
        $existing = $this->repo->findById($id);
        if (!$existing) return false;

        $deleted = $this->repo->delete($id);

        $this->audit->write(
            action: 'booking_deleted',
            targetType: 'Booking',
            targetID: $id,
            status: $deleted ? 'success' : 'failed',
            performedBy: auth()->id() ?? null
        );

        return $deleted;
    }
}
