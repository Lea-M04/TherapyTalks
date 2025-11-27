<?php

namespace App\Infrastructure\Persistence\Eloquent;

use App\Models\Diagnosis as EloquentDiagnosis;
use App\Domain\Models\Diagnosis;
use App\Domain\Interfaces\DiagnosisRepositoryInterface;

class EloquentDiagnosisRepository implements DiagnosisRepositoryInterface
{
    private function mapToDomain(EloquentDiagnosis $d): Diagnosis
    {
        return new Diagnosis([
            'diagnosisID' => $d->diagnosisID,
            'patientID' => $d->patientID,
            'professionalID' => $d->professionalID,
            'title' => $d->title,
            'description' => $d->description,
            'securityLevel' => $d->securityLevel,
            'created_at' => $d->created_at?->toDateTimeString() ?? null,
            'updated_at' => $d->updated_at?->toDateTimeString() ?? null,
        ]);
    }

    public function create(Diagnosis $d): Diagnosis
    {
        $eloquent = EloquentDiagnosis::create([
            'patientID' => $d->patientID,
            'professionalID' => $d->professionalID,
            'title' => $d->title,
            'description' => $d->description,
            'securityLevel' => $d->securityLevel,
        ]);

        return $this->mapToDomain($eloquent);
    }

    public function findById(int $id): ?Diagnosis
    {
        $d = EloquentDiagnosis::where('diagnosisID', $id)->first();
        return $d ? $this->mapToDomain($d) : null;
    }

    public function findAll(int $perPage = 15, int $page = 1): array
    {
        $paginator = EloquentDiagnosis::orderBy('diagnosisID', 'desc')
            ->paginate($perPage, ['*'], 'page', $page);

        $data = $paginator->getCollection()
            ->map(fn($d) => $this->mapToDomain($d))
            ->all();

        return [
            'data' => $data,
            'meta' => [
                'total' => $paginator->total(),
                'per_page' => $paginator->perPage(),
                'current_page' => $paginator->currentPage(),
                'last_page' => $paginator->lastPage(),
            ],
        ];
    }

    public function update(Diagnosis $d): Diagnosis
    {
        $eloquent = EloquentDiagnosis::where('diagnosisID', $d->diagnosisID)->first();
        if (!$eloquent) {
            throw new \Exception('Diagnosis not found');
        }

        $eloquent->update([
            'patientID' => $d->patientID,
            'professionalID' => $d->professionalID,
            'title' => $d->title,
            'description' => $d->description,
            'securityLevel' => $d->securityLevel,
        ]);

        $eloquent->refresh();

        return $this->mapToDomain($eloquent);
    }

    public function delete(int $id): bool
    {
        return (bool) EloquentDiagnosis::where('diagnosisID', $id)->delete();
    }

    public function findByPatientId(int $patientID): array
    {
        return EloquentDiagnosis::where('patientID', $patientID)
            ->orderBy('diagnosisID', 'desc')
            ->get()
            ->map(fn($d) => $this->mapToDomain($d))
            ->toArray();
    }
}
