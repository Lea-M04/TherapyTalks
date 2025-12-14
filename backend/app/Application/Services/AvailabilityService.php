<?php

namespace App\Application\Services;

use App\Domain\Interfaces\AvailabilityRepositoryInterface;
use App\Domain\Models\Availability;
use App\Application\Services\AuditLogService;
use App\Models\Booking;


class AvailabilityService
{
    private AvailabilityRepositoryInterface $repo;
    private AuditLogService $audit;

    public function __construct(AvailabilityRepositoryInterface $repo, AuditLogService $audit)
    {
        $this->repo = $repo;
        $this->audit = $audit;
    }

    public function listForProfessional(int $professionalID): array
    {
        return $this->repo->findByProfessional($professionalID);
    }

    public function get(int $id): ?Availability
    {
        return $this->repo->findById($id);
    }

    public function create(array $data): Availability
    {
        if ($this->repo->hasOverlap(
        $data['professionalID'],
        $data['dayOfWeek'],
        $data['startTime'],
        $data['endTime']
    )) {
        throw new \Exception("Time range overlaps with an existing schedule.");
    }
        $availability = new Availability($data);
        $created = $this->repo->create($availability);

        $this->audit->write(
            action: 'availability_created',
            targetType: 'Availability',
            targetID: $created->availabilityID,
            status: 'success',
            performedBy: auth()->id()
        );

        return $created;
    }

    public function update(int $id, array $data): ?Availability
    {
        $existing = $this->repo->findById($id);
        if (!$existing) return null;

        $updated = new Availability(array_merge($existing->toArray(), $data));
        $saved = $this->repo->update($updated);

        $this->audit->write(
            action: 'availability_updated',
            targetType: 'Availability',
            targetID: $saved->availabilityID,
            status: 'success',
            performedBy: auth()->id()
        );

        return $saved;
    }

    public function delete(int $id): bool
    {
        $existing = $this->repo->findById($id);
        if (!$existing) return false;

        $deleted = $this->repo->delete($id);

        $this->audit->write(
            action: 'availability_deleted',
            targetType: 'Availability',
            targetID: $existing->availabilityID,
            status: $deleted ? 'success' : 'failed',
            performedBy: auth()->id()
        );

        return $deleted;
    }
public function checkAvailability($professionalID, $date, $time)
{
    return !Booking::where('professionalID', $professionalID)
        ->where('appointmentDate', $date)
        ->where('appointmentTime', $time)
        ->exists();
}


    public function listPaginated(int $perPage = 15, int $page = 1): array
{
    $paginator = \App\Models\Availability::with('professional.user')
        ->orderBy('availabilityID', 'desc')
        ->paginate($perPage, ['*'], 'page', $page);

    $data = $paginator->getCollection()
        ->map(fn ($e) => new Availability($e->toArray()))
        ->all();

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


}
