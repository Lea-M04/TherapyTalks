<?php
namespace App\Infrastructure\Persistence\Eloquent;

use App\Models\VerificationRequest as EloquentModel;
use App\Domain\Models\VerificationRequest;
use App\Domain\Interfaces\VerificationRequestRepositoryInterface;

class EloquentVerificationRequestRepository implements VerificationRequestRepositoryInterface
{
    private function map(EloquentModel $m): VerificationRequest
    {
        return new VerificationRequest([
            'requestID' => $m->requestID,
            'professionalID' => $m->professionalID,
            'documentType' => $m->documentType,
            'documentURL' => $m->documentURL,
            'submittedAt' => $m->submittedAt,
            'verifiedAt' => $m->verifiedAt,
            'status' => $m->status,
            'reviewedBy' => $m->reviewedBy,
            'comments' => $m->comments,
        ]);
    }

    public function create(VerificationRequest $vr): VerificationRequest
    {
        $e = EloquentModel::create($vr->toArray());
        return $this->map($e);
    }

    public function update(VerificationRequest $vr): VerificationRequest
    {
       $e = EloquentModel::findOrFail($vr->requestID);
    $e->update($vr->toArray());
    $e->refresh();
    return $this->map($e);
    }

    public function findById(int $id): ?VerificationRequest
    {
        $m = EloquentModel::find($id);
        return $m ? $this->map($m) : null;
    }

    public function findPending(): array
    {
        return EloquentModel::where('status', 'pending')
            ->get()
            ->map(fn($m) => $this->map($m))
            ->all();
    }

    public function findByProfessional(int $professionalID): array
    {
        return EloquentModel::where('professionalID', $professionalID)
            ->get()
            ->map(fn($m) => $this->map($m))
            ->all();
    }

    public function all(): array
{
    return EloquentModel::all()
        ->map(fn($m) => $this->map($m))
        ->all();
}
}
