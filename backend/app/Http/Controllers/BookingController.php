<?php

namespace App\Http\Controllers;

use App\Application\Services\BookingService;
use App\Http\Requests\CreateBookingRequest;
use App\Http\Requests\UpdateBookingRequest;
use App\Http\Resources\BookingResource;
use Illuminate\Http\Request;
use App\Models\Booking;



class BookingController extends Controller
{
    private BookingService $service;

    public function __construct(BookingService $service)
    {
        $this->service = $service;
    }

    public function index(Request $request)
{
    $query = \App\Models\Booking::with(['professional', 'service', 'patient']);

    if ($request->has('professionalID')) {
        $query->where('professionalID', $request->professionalID);
    }

    if ($request->has('patientID')) {
        $query->where('patientID', $request->patientID);
    }

    return BookingResource::collection($query->get());
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

        return new BookingResource(\App\Models\Booking::with(['service', 'patient.user', 'professional.user'])
    ->find($created->bookingID));

    }

    public function update(UpdateBookingRequest $request, int $id)
    {
        $booking = $this->service->get($id);
        if (!$booking) {
            return response()->json(['message' => 'Booking not found'], 404);
        }

        $this->authorize('update', $booking);

        $updated = $this->service->update($id, $request->validated());

        return new BookingResource(\App\Models\Booking::with(['service', 'patient.user', 'professional.user'])
    ->find($updated->bookingID));

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

public function updateStatus(Request $request, $id)
{
    $request->validate([
        'status' => 'required|in:confirmed,canceled,completed'
    ]);

    $booking = Booking::findOrFail($id);

    $booking->status = $request->status;
    $booking->save();

    return response()->json([
        'message' => 'Status updated',
        'data' => new BookingResource(
    Booking::with(['service', 'patient.user', 'professional.user'])
        ->find($booking->bookingID)
)

    ]);
}
}
