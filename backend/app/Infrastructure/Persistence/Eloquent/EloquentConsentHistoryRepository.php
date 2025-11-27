<?php

namespace App\Infrastructure\Persistence\Eloquent;

use App\Models\ConsentHistory as EloquentCH;
use App\Domain\Models\ConsentHistory;
use App\Domain\Interfaces\ConsentHistoryRepositoryInterface;

class EloquentConsentHistoryRepository implements ConsentHistoryRepositoryInterface
{
    private function map(EloquentCH $h): ConsentHistory
    {
        return new ConsentHistory([
            'historyID' => $h->historyID,
            'consentID' => $h->consentID,
            'previousValue' => $h->previousValue,
            'newValue' => $h->newValue,
            'changedAt' => $h->changedAt,
            'changedBy' => $h->changedBy,
        ]);
    }

    public function create(ConsentHistory $h): ConsentHistory
    {
        $eloquent = EloquentCH::create([
            'consentID' => $h->consentID,
            'previousValue' => $h->previousValue,
            'newValue' => $h->newValue,
            'changedAt' => $h->changedAt,
            'changedBy' => $h->changedBy,
        ]);

        return $this->map($eloquent);
    }

    public function listForConsent(int $consentID): array
    {
        return EloquentCH::where('consentID', $consentID)
            ->orderBy('changedAt', 'DESC')
            ->get()
            ->map(fn ($h) => $this->map($h))
            ->toArray();
    }

    public function findById(int $id): ?ConsentHistory
    {
        $h = EloquentCH::find($id);
        return $h ? $this->map($h) : null;
    }

    public function delete(int $id): bool
    {
        return (bool) EloquentCH::where('historyID', $id)->delete();
    }
    public function listAll(): array
{
    return EloquentCH::all()
        ->map(fn ($h) => $this->map($h))
        ->toArray();
}

}
