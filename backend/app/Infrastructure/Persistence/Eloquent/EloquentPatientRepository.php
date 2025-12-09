<?php
namespace App\Infrastructure\Persistence\Eloquent;

use App\Models\Patient as EloquentPatient;
use App\Domain\Models\Patient;
use App\Domain\Interfaces\PatientRepositoryInterface;

class EloquentPatientRepository implements PatientRepositoryInterface
{
    private function mapToDomain(EloquentPatient $p): Patient
    {
        return new Patient([
            'patientID' => $p->patientID,
            'userID' => $p->userID,
            'medicalHistory' => $p->medicalHistory,
            'allergies' => $p->allergies,
            'emergencyContactName' => $p->emergencyContactName,
            'emergencyContactPhone' => $p->emergencyContactPhone,
            'insuranceNumber' => $p->insuranceNumber,
            'pseudonym' => $p->pseudonym,
               'user' => $p->user ? $p->user->toArray() : null,
        ]);
    }

    public function create(Patient $patient): Patient
    {
        $eloquent = EloquentPatient::create([
            'userID' => $patient->userID,
            'medicalHistory' => $patient->medicalHistory,
            'allergies' => $patient->allergies,
            'emergencyContactName' => $patient->emergencyContactName,
            'emergencyContactPhone' => $patient->emergencyContactPhone,
            'insuranceNumber' => $patient->insuranceNumber,
            'pseudonym' => $patient->pseudonym,
        ]);

        return $this->mapToDomain($eloquent);
    }
    public function findById(int $id): ?Patient
    {
        $p = EloquentPatient::where('patientID', $id)->first();
        return $p ? $this->mapToDomain($p) : null;
    }

    public function findByUserId(int $userID): ?Patient
    {
        $p = EloquentPatient::where('userID', $userID)->first();
        return $p ? $this->mapToDomain($p) : null;
    }

    public function findAll(int $perPage = 15, int $page = 1): array
    {
        $paginator = EloquentPatient::orderBy('patientID', 'desc')
            ->paginate($perPage, ['*'], 'page', $page);

        $data = $paginator->getCollection()
            ->map(fn($p) => $this->mapToDomain($p))
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

    public function update(Patient $patient): Patient
    {
        $eloquent = EloquentPatient::where('patientID', $patient->patientID)->first();
        if (!$eloquent) {
            throw new \Exception('Patient not found');
        }

        $eloquent->update([
            'userID' => $patient->userID,
            'medicalHistory' => $patient->medicalHistory,
            'allergies' => $patient->allergies,
            'emergencyContactName' => $patient->emergencyContactName,
            'emergencyContactPhone' => $patient->emergencyContactPhone,
            'insuranceNumber' => $patient->insuranceNumber,
            'pseudonym' => $patient->pseudonym,
        ]);

        return $this->mapToDomain($eloquent);
    }

    public function delete(int $id): bool
    {
        return (bool) EloquentPatient::where('patientID', $id)->delete();
    }

public function all()
{
    return EloquentPatient::with('user')
        ->get()
        ->map(fn($p) => $this->mapToDomain($p))
        ->all();
}

}
