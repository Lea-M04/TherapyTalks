<?php

namespace App\Application\Services;

use App\Domain\Interfaces\DiagnosisRepositoryInterface;
use App\Domain\Models\Diagnosis as DomainDiagnosis;
use App\Application\Services\AuditLogService;

class DiagnosisService
{
    private DiagnosisRepositoryInterface $repo;
    private AuditLogService $audit;

    public function __construct(DiagnosisRepositoryInterface $repo, AuditLogService $audit)
    {
        $this->repo = $repo;
        $this->audit = $audit;
    }

    public function list(int $perPage = 15, int $page = 1): array
    {
        return $this->repo->findAll($perPage, $page);
    }

    public function get(int $id): ?DomainDiagnosis
    {
        return $this->repo->findById($id);
    }

    public function listByPatient(int $patientID): array
    {
        return $this->repo->findByPatientId($patientID);
    }

    public function create(array $data): DomainDiagnosis
    {
        $d = new DomainDiagnosis($data);
        $created = $this->repo->create($d);

        $this->audit->write(
            action: 'diagnosis_created',
            targetType: 'Diagnosis',
            targetID: $created->diagnosisID,
            status: 'success',
            performedBy: $created->professionalID
        );

        return $created;
    }

    public function update(int $id, array $data): ?DomainDiagnosis
    {
        $existing = $this->repo->findById($id);
        if (!$existing) {
            return null;
        }

        $updatedDomain = new DomainDiagnosis(array_merge($existing->toArray(), $data));
        $result = $this->repo->update($updatedDomain);

        $this->audit->write(
            action: 'diagnosis_updated',
            targetType: 'Diagnosis',
            targetID: $result->diagnosisID,
            status: 'success',
            performedBy: auth()->id() ?? $result->professionalID
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
            action: 'diagnosis_deleted',
            targetType: 'Diagnosis',
            targetID: $existing->diagnosisID,
            status: $deleted ? 'success' : 'failed',
            performedBy: auth()->id() ?? $existing->professionalID
        );

        return $deleted;
    }
}
