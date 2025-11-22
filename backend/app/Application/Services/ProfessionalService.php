<?php

namespace App\Application\Services;

use App\Domain\Interfaces\ProfessionalRepositoryInterface;
use App\Domain\Models\Professional as DomainProfessional;

class ProfessionalService
{
    private ProfessionalRepositoryInterface $repo;

    public function __construct(ProfessionalRepositoryInterface $repo)
    {
        $this->repo = $repo;
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
        // ensure default status pending
        $data['status'] = $data['status'] ?? 'pending';
        $professional = new DomainProfessional($data);
        return $this->repo->create($professional);
    }

    public function update(int $id, array $data): ?DomainProfessional
    {
        $existing = $this->repo->findById($id);
        if (!$existing) {
            return null;
        }
        $updated = new DomainProfessional(array_merge($existing->toArray(), $data));
        return $this->repo->update($updated);
    }

    public function delete(int $id): bool
    {
        return $this->repo->delete($id);
    }
}
