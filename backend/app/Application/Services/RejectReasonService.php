<?php
namespace App\Application\Services;

use App\Domain\Models\RejectReason;
use App\Domain\Interfaces\RejectReasonRepositoryInterface;
use App\Application\Services\AuditLogService;

class RejectReasonService
{
    public function __construct(
        private RejectReasonRepositoryInterface $repo,
        private AuditLogService $audit
    ) {}

    public function all(): array
    {
        return $this->repo->all();
    }

    public function get(int $id): ?RejectReason
    {
        return $this->repo->findById($id);
    }

    public function delete(int $id): bool
    {
        $existing = $this->repo->findById($id);
        if (!$existing) return false;

        $deleted = $this->repo->delete($id);

        $this->audit->write(
            action: 'reject_reason_deleted',
            targetType: 'RejectReason',
            targetID: $id,
            status: $deleted ? 'success' : 'failed',
            performedBy: auth()->id()
        );

        return $deleted;
    }

    public function getReasonsByProfessional(int $professionalID): array
    {
        return $this->repo->findByProfessionalID($professionalID);
    }
}
