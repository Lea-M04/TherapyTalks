<?php

namespace App\Application\Services;

use App\Domain\Interfaces\ProfessionalRepositoryInterface;
use App\Domain\Interfaces\AvailabilityRepositoryInterface;
use App\Domain\Models\Professional as DomainProfessional;
use App\Application\Services\AuditLogService;

class ProfessionalService
{
    private ProfessionalRepositoryInterface $repo;
    private AuditLogService $audit;

    public function __construct(ProfessionalRepositoryInterface $repo, AuditLogService $audit)
    {
        $this->repo = $repo;
        $this->audit = $audit;
    }

    public function list(int $perPage = 15, int $page = 1): array
    {
        return $this->repo->findAll($perPage, $page);
    }

    public function get(int $id): ?DomainProfessional
    {
        return $this->repo->findById($id);
    }

    public function getByUserId(int $userID): ?DomainProfessional
    {
        return $this->repo->findByUserId($userID);
    }

    public function create(array $data): DomainProfessional
    {
        $data['status'] = $data['status'] ?? 'pending';
        $professional = new DomainProfessional($data);
        $created= $this->repo->create($professional);
        $this->audit->write(
            action: 'professional_created',
            targetType: 'Professional',
            targetID: $created->professionalID,
            status: 'success',
            performedBy: $created->userID 
        );
        return $created;
    }

    public function update(int $id, array $data): ?DomainProfessional
    {
        $existing = $this->repo->findById($id);
        if (!$existing) {
            return null;
        }
        $updated = new DomainProfessional(array_merge($existing->toArray(), $data));
        $result= $this->repo->update($updated);
        $this->audit->write(
            action: 'professional_updated',
            targetType: 'Professional',
            targetID: $result->professionalID,
            status: 'success',
            performedBy: $result->userID 
        );
        if (isset($data['isOnline'])) {
            if($data['isOnline'] === false) {
            app(AvailabilityRepositoryInterface::class)
            ->setAllUnavailable($result->professionalID);
            }else{
                app(AvailabilityRepositoryInterface::class)
            ->setAllAvailable($result->professionalID);
            }
    }
        return $result;
    }

    public function delete(int $id): bool
    {
        $existing = $this->repo->findById($id);
        if (!$existing) {
        return false;
    }
        $deleted= $this->repo->delete($id);
        $this->audit->write(
            action: 'professional_deleted',
            targetType: 'Professional',
            targetID: $existing->professionalID,
            status:  $deleted ? 'success' : 'failed',
            performedBy: auth()->id() ?? $existing->userID
        );
    
        return $deleted;
    }

    public function getMyPatients(int $professionalID)
{
    return $this->repo->getMyPatients($professionalID);
}

}
