<?php

namespace App\Http\Controllers;

use App\Application\Services\BookingService;
use App\Http\Requests\CreateBookingRequest;
use App\Http\Requests\UpdateBookingRequest;
use App\Http\Resources\BookingResource;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    private BookingService $service;

    public function __construct(BookingService $service)
    {
        $this->service = $service;
    }

    public function index(Request $request)
    {
        $this->authorize('viewAny', \App\Domain\Models\Booking::class);

        $perPage = (int) $request->get('per_page', 15);
        $page = (int) $request->get('page', 1);

        $result = $this->service->list($perPage, $page);

        return response()->json([
            'data' => array_map(fn($b) => new BookingResource($b), $result['data']),
            'meta' => $result['meta']
        ]);
    }

    public function show(int $id)
    {
        $booking = $this->service->get($id);
        if (!$booking) {
            return response()->json(['message' => 'Booking not found'], 404);
        }

        $this->authorize('view', $booking);

        return new BookingResource($booking);
    }

    public function store(CreateBookingRequest $request)
    {
        $this->authorize('create', \App\Domain\Models\Booking::class);

        $created = $this->service->create($request->validated());

        return (new BookingResource($created))
            ->response()
            ->setStatusCode(201);
    }

    public function update(UpdateBookingRequest $request, int $id)
    {
        $booking = $this->service->get($id);
        if (!$booking) {
            return response()->json(['message' => 'Booking not found'], 404);
        }

        $this->authorize('update', $booking);

        $updated = $this->service->update($id, $request->validated());

        return new BookingResource($updated);
    }

    public function destroy(int $id)
    {
        $booking = $this->service->get($id);
        if (!$booking) {
            return response()->json(['message' => 'Booking not found'], 404);
        }

        $this->authorize('delete', $booking);

        $deleted = $this->service->delete($id);

        if (!$deleted) {
            return response()->json(['message' => 'Could not delete'], 400);
        }

        return response()->json(null, 204);
    }
}
