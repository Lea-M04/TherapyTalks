<?php

namespace App\Application\Services;

use App\Domain\Interfaces\VirtualRoomRepositoryInterface;
use App\Domain\Interfaces\BookingRepositoryInterface;
use App\Domain\Models\VirtualRoom;
use App\Application\Services\AuditLogService;
use Illuminate\Support\Str;
use Carbon\Carbon;

class VirtualRoomService
{
    private VirtualRoomRepositoryInterface $roomRepo;
    private BookingRepositoryInterface $bookingRepo;
    private AuditLogService $audit;

    private string $jitsiBaseUrl = 'https://meet.jit.si'; 

    public function __construct(
        VirtualRoomRepositoryInterface $roomRepo,
        BookingRepositoryInterface $bookingRepo,
        AuditLogService $audit
    ) {
        $this->roomRepo = $roomRepo;
        $this->bookingRepo = $bookingRepo;
        $this->audit = $audit;
    }

    public function getRoomForBooking(int $bookingId): ?VirtualRoom
    {
        return $this->roomRepo->findByBookingId($bookingId);
    }

    public function createOrGetRoom(int $bookingId): VirtualRoom
    {

        $existingRoom = $this->roomRepo->findByBookingId($bookingId);
        if ($existingRoom) {
            return $existingRoom;
        }

        $booking = $this->bookingRepo->findById($bookingId);
        
        if (!$booking) {
            throw new \Exception("Booking not found.");
        }

        $uniqueRoomName = 'Consultation_' . $bookingId . '_' . Str::random(12);
        $fullLink = $this->jitsiBaseUrl . '/' . $uniqueRoomName;


        $startTime = Carbon::parse($booking->appointmentDate . ' ' . $booking->appointmentTime);
        $durationMinutes = (int) ($booking->duration ?? 60); 
        $expiresAt = $startTime->addMinutes($durationMinutes + 60); 

        $newRoom = new VirtualRoom([
            'bookingID' => $bookingId,
            'link' => $fullLink,
            'expiresAt' => $expiresAt->toDateTimeString()
        ]);

        $createdRoom = $this->roomRepo->create($newRoom);

        $this->audit->write(
            action: 'virtual_room_created',
            targetType: 'VirtualRoom',
            targetID: $createdRoom->roomID,
            status: 'success',
            performedBy: auth()->id() ?? null
        );

        return $createdRoom;
    }
}