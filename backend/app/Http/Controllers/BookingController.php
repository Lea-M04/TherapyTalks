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
    
    $query = \App\Models\Booking::query();

    if ($request->has('professionalID')) {
        $query->where('professionalID', $request->professionalID);
    }

    if ($request->has('patientID')) {
        $query->where('patientID', $request->patientID);
    }

    return response()->json([
        'data' => $query->get()
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
    public function getProfessionalBookings(Request $request, int $professionalID)
{
    $date = $request->query('date');

    $bookings = \App\Models\Booking::where('professionalID', $professionalID)
        ->where('appointmentDate', $date)
        ->get(['appointmentTime', 'duration']);

    return response()->json([
        'data' => $bookings
    ]);
}

}
