<?php

namespace App\Application\Services;

use App\Domain\Interfaces\ServiceRepositoryInterface;
use App\Domain\Models\Service;
use App\Application\Services\AuditLogService;

class ServiceService
{
    private ServiceRepositoryInterface $repo;
    private AuditLogService $audit;

    public function __construct(ServiceRepositoryInterface $repo, AuditLogService $audit)
    {
        $this->repo = $repo;
        $this->audit = $audit;
    }

    public function listByProfessional(int $professionalID): array
    {
        return $this->repo->findByProfessional($professionalID);
    }

    public function listAll(int $perPage = 15, int $page = 1): array
{
    return $this->repo->findAll($perPage, $page);
}



    public function get(int $id): ?Service
    {
        return $this->repo->findById($id);
    }

    public function create(array $data): Service
    {
        $service = new Service($data);
        $created = $this->repo->create($service);

        $this->audit->write(
            action: 'service_created',
            targetType: 'Service',
            targetID: $created->serviceID,
            status: 'success',
            performedBy: auth()->id()
        );

        return $created;
    }

    public function update(int $id, array $data): ?Service
    {
        $existing = $this->repo->findById($id);
        if (!$existing) return null;

        $updated = new Service(array_merge($existing->toArray(), $data));
        $saved = $this->repo->update($updated);

        $this->audit->write(
            action: 'service_updated',
            targetType: 'Service',
            targetID: $saved->serviceID,
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
            action: 'service_deleted',
            targetType: 'Service',
            targetID: $existing->serviceID,
            status: $deleted ? 'success' : 'failed',
            performedBy: auth()->id()
        );

        return $deleted;
    }
    
}
