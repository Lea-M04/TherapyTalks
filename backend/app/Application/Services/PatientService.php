<?php

namespace App\Application\Services;
use App\Domain\Interfaces\PatientRepositoryInterface;
use App\Domain\Models\Patient as DomainPatient;

class PatientService
{
    private PatientRepositoryInterface $repo;


    public function __construct(PatientRepositoryInterface $repo)
{
        $this->repo = $repo;
}


    public function list(int $perPage = 15, int $page = 1): array
{
        return $this->repo->findAll($perPage, $page);
}


    public function get(int $id): ?DomainPatient
{
        return $this->repo->findById($id);
}


    public function getByUserId(int $userID): ?DomainPatient
{
        return $this->repo->findByUserId($userID);
}


    public function create(array $data): DomainPatient
{
        $patient = new DomainPatient($data);
        return $this->repo->create($patient);
}


    public function update(int $id, array $data): ?DomainPatient
{
        $existing = $this->repo->findById($id);
        if (!$existing) {
        return null;
}
        $updated = new DomainPatient(array_merge($existing->toArray(), $data));
        return $this->repo->update($updated);
}


    public function delete(int $id): bool
    {
        return $this->repo->delete($id);
    }
}