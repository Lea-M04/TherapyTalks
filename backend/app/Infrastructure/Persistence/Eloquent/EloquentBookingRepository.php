<?php

namespace App\Infrastructure\Persistence\Eloquent;

use App\Domain\Interfaces\BookingRepositoryInterface;
use App\Domain\Models\Booking;
use App\Models\Booking as EloquentBooking;

class EloquentBookingRepository implements BookingRepositoryInterface
{
    private function mapToDomain(EloquentBooking $b): Booking
    {
        return new Booking($b->toArray());
    }

    public function create(Booking $booking): Booking
    {
        $eloquent = EloquentBooking::create($booking->toArray());
        return $this->mapToDomain($eloquent);
    }

    public function findById(int $id): ?Booking
    {
        $b = EloquentBooking::where('bookingID', $id)->first();
        return $b ? $this->mapToDomain($b) : null;
    }

    public function findAll(int $perPage = 15, int $page = 1): array
    {
        $paginator = EloquentBooking::orderBy('bookingID', 'desc')
            ->paginate($perPage, ['*'], 'page', $page);

        return [
            'data' => $paginator->getCollection()->map(fn($b) => $this->mapToDomain($b))->all(),
            'meta' => [
                'total' => $paginator->total(),
                'per_page' => $paginator->perPage(),
                'current_page' => $paginator->currentPage(),
                'last_page' => $paginator->lastPage(),
            ]
        ];
    }

    public function update(Booking $booking): Booking
    {
        $eloquent = EloquentBooking::where('bookingID', $booking->bookingID)->first();
        $eloquent->update($booking->toArray());
        return $this->mapToDomain($eloquent);
    }

    public function delete(int $id): bool
    {
        return (bool) EloquentBooking::where('bookingID', $id)->delete();
    }
    public function findConflict(int $professionalID, string $date, string $time): bool
{
    return EloquentBooking::where('professionalID', $professionalID)
        ->where('appointmentDate', $date)
        ->where('appointmentTime', $time)
        ->exists();
}

}
