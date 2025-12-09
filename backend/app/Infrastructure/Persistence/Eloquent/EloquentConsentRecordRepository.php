<?php

namespace App\Infrastructure\Persistence\Eloquent;

use App\Models\ConsentRecord as EloquentConsent;
use App\Domain\Models\ConsentRecord;
use App\Domain\Interfaces\ConsentRecordRepositoryInterface;

class EloquentConsentRecordRepository implements ConsentRecordRepositoryInterface
{
    private function map(EloquentConsent $c): ConsentRecord
    {
        return new ConsentRecord($c->toArray());
    }

    public function create(ConsentRecord $c): ConsentRecord
{
     $data = $c->toArray();

    $eloquent = EloquentConsent::create([
        'consentType' => $data['consentType'] ?? null,
        'description' => $data['description'] ?? null,
        'isRevoked' => $data['isRevoked'] ?? false,
        'signedAt' => $data['signedAt'] ?? null,
        'revokedAt' => $data['revokedAt'] ?? null,
        'patientID' => $data['patientID'] ?? null,
        'professionalID' => $data['professionalID'] ?? null,
    ]);

    return $this->map($eloquent);
}


    public function findById(int $id): ?ConsentRecord
    {
        $c = EloquentConsent::find($id);
        return $c ? $this->map($c) : null;
    }

    public function findAll(int $perPage = 15, int $page = 1): array
    {
        $p = EloquentConsent::paginate($perPage, ['*'], 'page', $page);

        return [
            'data' => array_map(fn($x) => $this->map($x), $p->items()),
            'meta' => [
                'total' => $p->total(),
                'per_page' => $p->perPage(),
                'current_page' => $p->currentPage(),
                'last_page' => $p->lastPage(),
            ],
        ];
    }

    public function update(ConsentRecord $c): ConsentRecord
    {
        $eloquent = EloquentConsent::find($c->consentID);
        if (!$eloquent) throw new \Exception("Not found");

        $eloquent->update($c->toArray());
        return $this->map($eloquent);
    }

    public function delete(int $id): bool
    {
        return (bool)EloquentConsent::destroy($id);
    }
}
