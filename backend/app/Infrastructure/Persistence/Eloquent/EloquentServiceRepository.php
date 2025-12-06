<?php

namespace App\Infrastructure\Persistence\Eloquent;

use App\Models\Service as EloquentService;
use App\Domain\Models\Service;
use App\Domain\Interfaces\ServiceRepositoryInterface;

class EloquentServiceRepository implements ServiceRepositoryInterface
{
    private function map(EloquentService $s): Service
    {
        return new Service([
            'serviceID' => $s->serviceID,
            'professionalID' => $s->professionalID,
            'serviceName' => $s->serviceName,
            'description' => $s->description,
            'durationMinutes' => $s->durationMinutes,
            'price' => $s->price,
            'category' => $s->category,
            'isActive' => $s->isActive,
             'professional' => $s->professional ? [
            'user' => $s->professional->user ? [
                'firstName' => $s->professional->user->firstName,
                'lastName'  => $s->professional->user->lastName,
            ] : null
        ] : null,
            
        ]);
    }

    public function findById(int $id): ?Service
    {
        $s = EloquentService::with(['professional.user'])->find($id);
        return $s ? $this->map($s) : null;
    }

    public function findByProfessional(int $professionalID): array
    {
        return EloquentService::with(['professional.user'])->where('professionalID', $professionalID)
            ->get()
            ->map(fn($s) => $this->map($s))
            ->all();
    }

    public function create(Service $s): Service
    {
        $e = EloquentService::create($s->toArray());
        return $this->map($e);
    }

    public function update(Service $s): Service
    {
        $e = EloquentService::findOrFail($s->serviceID);
        $e->update($s->toArray());
        return $this->map($e);
    }

    public function delete(int $id): bool
    {
        return (bool)EloquentService::where('serviceID', $id)->delete();
    }

    public function all(): array
{
    return EloquentService::with(['professional.user'])->get()
        ->map(fn($s) => $this->map($s))
        ->all();
}

public function findAll(int $perPage = 15, int $page = 1): array
{
    $paginator = EloquentService::with(['professional.user'])->orderBy('serviceID', 'desc')
        ->paginate($perPage, ['*'], 'page', $page);

    $data = $paginator->getCollection()
        ->map(fn($s) => $this->map($s))
        ->all();

    return [
        'data' => $data,
        'meta' => [
            'total' => $paginator->total(),
            'per_page' => $paginator->perPage(),
            'current_page' => $paginator->currentPage(),
            'last_page' => $paginator->lastPage(),
        ],
        'prev_page_url' => $paginator->previousPageUrl(),
        'next_page_url' => $paginator->nextPageUrl(),
    ];
}

}

