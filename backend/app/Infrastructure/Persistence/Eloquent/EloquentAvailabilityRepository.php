<?php

namespace App\Infrastructure\Persistence\Eloquent;

use App\Models\Availability as EloquentAvailability;
use App\Domain\Models\Availability;
use App\Domain\Interfaces\AvailabilityRepositoryInterface;

class EloquentAvailabilityRepository implements AvailabilityRepositoryInterface
{
    private function map(EloquentAvailability $a): Availability
    {
        return new Availability([
            'availabilityID' => $a->availabilityID,
            'professionalID' => $a->professionalID,
            'dayOfWeek' => $a->dayOfWeek,
            'startTime' => $a->startTime,
            'endTime' => $a->endTime,
            'isAvailable' => $a->isAvailable,
        ]);
    }

    public function findById(int $id): ?Availability
    {
        $a = EloquentAvailability::find($id);
        return $a ? $this->map($a) : null;
    }

    public function findByProfessional(int $professionalID): array
    {
        return EloquentAvailability::where('professionalID', $professionalID)
            ->get()
            ->map(fn($a) => $this->map($a))
            ->all();
    }

    public function create(Availability $a): Availability
    {
        $e = EloquentAvailability::create($a->toArray());
        return $this->map($e);
    }

    public function update(Availability $a): Availability
    {
        $e = EloquentAvailability::findOrFail($a->availabilityID);
        $e->update($a->toArray());
        return $this->map($e);
    }

    public function delete(int $id): bool
    {
        return (bool)EloquentAvailability::where('availabilityID', $id)->delete();
    }


    public function setAllUnavailable(int $professionalID): void
    {
        EloquentAvailability::where('professionalID', $professionalID)
            ->update(['isAvailable' => false]);
    }

    public function setAllAvailable(int $professionalID): void
    {
        EloquentAvailability::where('professionalID', $professionalID)
            ->update(['isAvailable' => true]);
    }


    public function hasOverlap(int $professionalID, string $day, string $startTime, string $endTime, ?int $ignoreID = null): bool
    {
        $query = EloquentAvailability::where('professionalID', $professionalID)
        ->where('dayOfWeek', $day)
        ->where(function ($q) use ($startTime, $endTime) {
            $q->where('startTime', '<', $endTime)
              ->where('endTime', '>', $startTime);
        });

    if ($ignoreID) {
        $query->where('availabilityID', '!=', $ignoreID);
    }

    return $query->exists();
}
}
