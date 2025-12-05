<?php

namespace App\Application\Services;

use App\Domain\Interfaces\BookingRepositoryInterface;
use App\Domain\Models\Booking;
use App\Application\Services\AuditLogService;
use App\Application\Services\AvailabilityService;

class BookingService
{
    private BookingRepositoryInterface $repo;
    private AuditLogService $audit;
    private AvailabilityService $availabilityService;

    public function __construct(BookingRepositoryInterface $repo, AuditLogService $audit, AvailabilityService $availabilityService)
    {
        $this->repo = $repo;
        $this->audit = $audit;
        $this->availabilityService = $availabilityService;
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

    $isAvailable = $this->availabilityService->checkAvailability(
        $data['professionalID'],
        $data['appointmentDate'],
        $data['appointmentTime'],
        $data['duration'] ?? null
    );

    if (!$isAvailable) {
        throw new \Exception("Professional is not available at this time.");
    }

    $hasConflict = $this->repo->findConflict(
    $data['professionalID'],
    $data['appointmentDate'],
    $data['appointmentTime']
);


    if ($hasConflict) {
        throw new \Exception("This time slot is already booked.");
    }

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
