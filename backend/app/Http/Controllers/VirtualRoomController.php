<?php

namespace App\Http\Controllers;

use App\Application\Services\VirtualRoomService;
use App\Application\Services\BookingService; // Për të marrë booking object për policy check
use App\Http\Resources\VirtualRoomResource;
use Illuminate\Http\Request;

class VirtualRoomController extends Controller
{
    private VirtualRoomService $service;
    private BookingService $bookingService;

    public function __construct(VirtualRoomService $service, BookingService $bookingService)
    {
        $this->service = $service;
        $this->bookingService = $bookingService;
    }

    public function show(int $bookingId)
    {

        $booking = $this->bookingService->get($bookingId);
        if (!$booking) {
            return response()->json(['message' => 'Booking not found'], 404);
        }

        $this->authorize('viewVirtualRoom', $booking);

        $room = $this->service->getRoomForBooking($bookingId);

        if (!$room) {
            return response()->json(['message' => 'Virtual room not created yet'], 404);
        }

        return new VirtualRoomResource($room);
    }

    public function store(int $bookingId)
    {

        $booking = $this->bookingService->get($bookingId);
        if (!$booking) {
            return response()->json(['message' => 'Booking not found'], 404);
        }


        $this->authorize('createVirtualRoom', $booking);

        try {
            $room = $this->service->createOrGetRoom($bookingId);
            return new VirtualRoomResource($room);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }
}