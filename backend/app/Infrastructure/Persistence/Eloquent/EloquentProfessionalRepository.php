<?php

namespace App\Infrastructure\Persistence\Eloquent;

use App\Models\Professional as EloquentProfessional;
use App\Domain\Models\Professional;
use App\Domain\Interfaces\ProfessionalRepositoryInterface;

class EloquentProfessionalRepository implements ProfessionalRepositoryInterface
{
    private function mapToDomain(EloquentProfessional $p): Professional
    {
        return new Professional([
            'professionalID' => $p->professionalID,
            'userID' => $p->userID,
             'user' => $p->user ? [
            'firstName' => $p->user->firstName,
            'lastName' => $p->user->lastName,
            'email' => $p->user->email,
            'phoneNumber' => $p->user->phoneNumber,
            'profileImage' => $p->user->profileImage,
        ] : null,
            'specialization' => $p->specialization,
            'licenseNumber' => $p->licenseNumber,
            'experienceYears' => $p->experienceYears,
            'education' => $p->education,
            'bio' => $p->bio,
            'clinicName' => $p->clinicName,
            'clinicStreet' => $p->clinicStreet,
            'clinicCity' => $p->clinicCity,
            'rating' => $p->rating,
            'isOnline' => $p->isOnline,
            'status' => $p->status,
            'created_at' => $p->created_at ?? null,
            'updated_at' => $p->updated_at ?? null,
        ]);
    }

    public function create(Professional $professional): Professional
    {
        $eloquent = EloquentProfessional::create([
            'userID' => $professional->userID,
            'specialization' => $professional->specialization,
            'licenseNumber' => $professional->licenseNumber,
            'experienceYears' => $professional->experienceYears,
            'education' => $professional->education,
            'bio' => $professional->bio,
            'clinicName' => $professional->clinicName,
            'clinicStreet' => $professional->clinicStreet,
            'clinicCity' => $professional->clinicCity,
            'rating' => $professional->rating,
            'isOnline' => $professional->isOnline,
            'status' => $professional->status ?? 'pending',
        ]);

        return $this->mapToDomain($eloquent);
    }

    public function findById(int $id): ?Professional
    {
        $p = EloquentProfessional::with('user')->where('professionalID', $id)->first();
        return $p ? $this->mapToDomain($p) : null;
    }

    public function findByUserId(int $userID): ?Professional
    {
        $p = EloquentProfessional::with('user')->where('userID', $userID)->first();
        return $p ? $this->mapToDomain($p) : null;
    }

    public function findAll(int $perPage = 15, int $page = 1): array
    {
        $paginator = EloquentProfessional::with('user')->orderBy('professionalID', 'desc')
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

    public function update(Professional $professional): Professional
    {
        $eloquent = EloquentProfessional::where('professionalID', $professional->professionalID)->first();
        if (!$eloquent) {
            throw new \Exception('Professional not found');
        }

        $eloquent->update([
            'userID' => $professional->userID,
            'specialization' => $professional->specialization,
            'licenseNumber' => $professional->licenseNumber,
            'experienceYears' => $professional->experienceYears,
            'education' => $professional->education,
            'bio' => $professional->bio,
            'clinicName' => $professional->clinicName,
            'clinicStreet' => $professional->clinicStreet,
            'clinicCity' => $professional->clinicCity,
            'rating' => $professional->rating,
            'isOnline' => $professional->isOnline,
            'status' => $professional->status,
        ]);

        return $this->mapToDomain($eloquent);
    }

    public function delete(int $id): bool
    {
        return (bool) EloquentProfessional::where('professionalID', $id)->delete();
    }
}
