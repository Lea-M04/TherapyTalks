<?php

namespace App\Application\Services;

use App\Domain\Interfaces\ConsentRecordRepositoryInterface;
use App\Domain\Models\ConsentRecord as DomainConsent;
use App\Application\Services\AuditLogService;

class ConsentRecordService
{
    private ConsentRecordRepositoryInterface $repo;
    private AuditLogService $audit;

    public function __construct(ConsentRecordRepositoryInterface $repo, AuditLogService $audit)
    {
        $this->repo = $repo;
        $this->audit = $audit;
    }

    public function list(int $perPage = 15, int $page = 1): array
    {
        return $this->repo->findAll($perPage, $page);
    }

    public function get(int $id): ?DomainConsent
    {
        return $this->repo->findById($id);
    }

    public function create(array $data): DomainConsent
    {
        $consent = new DomainConsent($data);
        $created = $this->repo->create($consent);

        $this->audit->write(
            action: 'consent_created',
            targetType: 'Consent',
            targetID: $created->consentID,
            status: 'success',
            performedBy: $created->professionalID
        );

        return $created;
    }

    public function update(int $id, array $data): ?DomainConsent
    {
        $existing = $this->repo->findById($id);
        if (!$existing) {
            return null;
        }

        $updated = new DomainConsent(array_merge($existing->toArray(), $data));
        $result = $this->repo->update($updated);

        $this->audit->write(
            action: 'consent_updated',
            targetType: 'Consent',
            targetID: $result->consentID,
            status: 'success',
            performedBy: $result->professionalID
        );

        return $result;
    }

    public function revoke(int $id): ?DomainConsent
    {
        $existing = $this->repo->findById($id);
        if (!$existing) {
            return null;
        }

        $existing->isRevoked = true;
        $existing->revokedAt = now();

        $result = $this->repo->update($existing);

        $this->audit->write(
            action: 'consent_revoked',
            targetType: 'Consent',
            targetID: $result->consentID,
            status: 'success',
            performedBy: $result->professionalID
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
            action: 'consent_deleted',
            targetType: 'Consent',
            targetID: $existing->consentID,
            status: $deleted ? 'success' : 'failed',
            performedBy: auth()->id() ?? $existing->professionalID
        );

        return $deleted;
    }
}
