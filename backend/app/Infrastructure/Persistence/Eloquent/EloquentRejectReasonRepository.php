<?php
namespace App\Infrastructure\Persistence\Eloquent;

use App\Models\RejectReason as EloquentRejectReason;
use App\Domain\Models\RejectReason;
use App\Domain\Interfaces\RejectReasonRepositoryInterface;
use App\Models\VerificationRequest;
class EloquentRejectReasonRepository implements RejectReasonRepositoryInterface
{
    private function map(EloquentRejectReason $r): RejectReason
    {
        return new RejectReason([
            'reasonID' => $r->reasonID,
            'requestID' => $r->requestID,
            'title' => $r->title,
            'description' => $r->description,
        ]);
    }

    public function findById(int $id): ?RejectReason
    {
        $r = EloquentRejectReason::find($id);
        return $r ? $this->map($r) : null;
    }

    public function all(): array
    {
        return EloquentRejectReason::all()
            ->map(fn($r) => $this->map($r))
            ->all();
    }

    public function create(RejectReason $reason): RejectReason
    {
        $e = EloquentRejectReason::create($reason->toArray());
        return $this->map($e);
    }


    public function delete(int $id): bool
    {
        return (bool)EloquentRejectReason::where('reasonID', $id)->delete();
    }


    public function findByProfessionalID(int $professionalID): array
    {
        $requestIDs = VerificationRequest::where('professionalID', $professionalID)
                                         ->pluck('requestID');
        return EloquentRejectReason::whereIn('requestID', $requestIDs)
            ->get()
            ->map(fn($r) => $this->map($r))
            ->all();
    }
}
