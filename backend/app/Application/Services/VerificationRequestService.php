<?php
namespace App\Application\Services;

use App\Domain\Interfaces\VerificationRequestRepositoryInterface;
use App\Domain\Interfaces\RejectReasonRepositoryInterface;
use App\Domain\Models\VerificationRequest;
use App\Domain\Models\RejectReason;
use App\Models\Professional;
use App\Application\Services\AuditLogService;

class VerificationRequestService
{
    public function __construct(
        private VerificationRequestRepositoryInterface $repo,
        private AuditLogService $audit,
        private RejectReasonRepositoryInterface $rejectRepo
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

    public function reject(int $id, int $adminID, array $reasonData): ?VerificationRequest
{
    $vr = $this->repo->findById($id);
    if (!$vr) return null;

    $vr->status = 'rejected';
    $vr->verifiedAt = now();
    $vr->reviewedBy = $adminID;
    $vr->comments = $reasonData['adminComment'] ?? null;

    $updated = $this->repo->update($vr);
     $this->rejectRepo->create(
        new RejectReason([
            'requestID' => $vr->requestID,
            'title' => $reasonData['title'],
            'description' => $reasonData['description'] ?? null,
        ])
    );

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


    public function resubmit(int $id, array $data): VerificationRequest
{
    $vr = $this->repo->findById($id);

    if ($vr->status !== 'rejected') {
        throw new \Exception('Only rejected requests can be resubmitted.');
    }
    $vr->status = 'pending';
    $vr->documentURL = $data['documentURL'] ?? $vr->documentURL;
    $vr->comments = null;

    $updated = $this->repo->update($vr);
    $this->audit->write(
        action: 'verification_resubmitted',
        targetType: 'VerificationRequest',
        targetID: $vr->requestID,
        status: 'success',
        performedBy: auth()->id()
    );

    return $updated;
}

public function findById(int $id)
{
    return $this->repo->findById($id);
}


    public function all(): array
    {
        return $this->repo->all();
    }
    
    public function findPending(): array{
        return $this->repo->findPending();
    }

    public function findByProfessionalID(int $professionalID): array // METODA E RE
    {
        return $this->repo->findByProfessional($professionalID);
    }
}
