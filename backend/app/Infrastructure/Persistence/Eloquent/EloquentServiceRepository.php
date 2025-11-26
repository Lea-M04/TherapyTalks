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
        ]);
    }

    public function findById(int $id): ?Service
    {
        $s = EloquentService::find($id);
        return $s ? $this->map($s) : null;
    }

    public function findByProfessional(int $professionalID): array
    {
        return EloquentService::where('professionalID', $professionalID)
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
    return EloquentService::all()
        ->map(fn($s) => $this->map($s))
        ->all();
}

}
