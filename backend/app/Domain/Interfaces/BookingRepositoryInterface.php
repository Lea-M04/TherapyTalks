<?php

namespace App\Domain\Interfaces;

use App\Domain\Models\Booking;

interface BookingRepositoryInterface
{
    public function create(Booking $booking): Booking;
    public function findById(int $id): ?Booking;
    public function findAll(int $perPage = 15, int $page = 1): array;
    public function update(Booking $booking): Booking;
    public function delete(int $id): bool;
    public function findConflict(int $professionalID, string $date, string $time): bool;

}
