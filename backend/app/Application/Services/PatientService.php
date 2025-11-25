<?php

namespace App\Application\Services;
use App\Domain\Interfaces\PatientRepositoryInterface;
use App\Domain\Models\Patient as DomainPatient;
use App\Application\Services\AuditLogService;


class PatientService
{
    private PatientRepositoryInterface $repo;
    private AuditLogService $audit;

    public function __construct(PatientRepositoryInterface $repo, AuditLogService $audit)
{
        $this->repo = $repo;
        $this->audit = $audit;
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
        $created= $this->repo->create($patient);
       $this->audit->write(
            action: 'patient_created',
            targetType: 'Patient',
            targetID: $created->patientID,
            status: 'success',
            performedBy: $created->userID 
        );
        return $created;
}


    public function update(int $id, array $data): ?DomainPatient
{
        $existing = $this->repo->findById($id);
        if (!$existing) {
        return null;
}
        $updated = new DomainPatient(array_merge($existing->toArray(), $data));
        $result= $this->repo->update($updated);
        $this->audit->write(
            action: 'patient_updated',
            targetType: 'Patient',
            targetID: $result->patientID,
            status: 'success',
            performedBy: $result->userID 
        );
    
        return $result;
}


    public function delete(int $id): bool
    {
        $existing = $this->repo->findById($id);
         if (!$existing) {
        return false;
    }
        $deleted = $this->repo->delete($id);
        $this->audit->write(
            action: 'patient_deleted',
            targetType: 'Patient',
            targetID: $existing->patientID,
            status:  $deleted ? 'success' : 'failed',
            performedBy: auth()->id() ?? $existing->userID
        );
    
        return $deleted;
    }
}