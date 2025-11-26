<?php
namespace App\Application\Services;

use App\Domain\Interfaces\VerificationRequestRepositoryInterface;
use App\Domain\Models\VerificationRequest;
use App\Models\Professional;
use App\Application\Services\AuditLogService;

class VerificationRequestService
{
    public function __construct(
        private VerificationRequestRepositoryInterface $repo,
        private AuditLogService $audit
    ) {}

    public function submit(array $data): VerificationRequest
    {
        $data['submittedAt'] = now();
        $vr = new VerificationRequest($data);

        $created = $this->repo->create($vr);
        $this->audit->write(
            action: 'verification_submitted',
            targetType: 'VerificationRequest',
            targetID: $created->requestID,
            status: 'success',
            performedBy: auth()->id()
        );

        return $created;
    }

    public function approve(int $id, int $adminID): ?VerificationRequest
    {
        $vr = $this->repo->findById($id);
        if (!$vr) return null;

        $vr->status = 'approved';
        $vr->verifiedAt = now();
        $vr->reviewedBy = $adminID;

        $updated = $this->repo->update($vr);

        Professional::where('professionalID', $vr->professionalID)
        ->update(['status' => 'approved']);

        $this->audit->write(
            action: 'verification_approved',
            targetType: 'VerificationRequest',
            targetID: $id,
            status: 'success',
            performedBy: $adminID
        );

        return $updated;
    }

    public function reject(int $id, int $adminID, ?string $comments = null): ?VerificationRequest
    {
        $vr = $this->repo->findById($id);
        if (!$vr) return null;

        $vr->status = 'rejected';
        $vr->verifiedAt = now();
        $vr->reviewedBy = $adminID;
        $vr->comments = $comments;

        $updated = $this->repo->update($vr);
        Professional::where('professionalID', $vr->professionalID)
        ->update(['status' => 'rejected']);

        $this->audit->write(
            action: 'verification_rejected',
            targetType: 'VerificationRequest',
            targetID: $id,
            status: 'success',
            performedBy: $adminID
        );

        return $updated;
    }
}
