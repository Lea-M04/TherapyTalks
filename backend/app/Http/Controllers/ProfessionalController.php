<?php

namespace App\Http\Controllers;

use App\Application\Services\ProfessionalService;
use App\Http\Requests\CreateProfessionalRequest;
use App\Http\Requests\UpdateProfessionalRequest;
use App\Http\Resources\ProfessionalResource;
use App\Models\Professional;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use \App\Models\Booking;

class ProfessionalController extends Controller
{
    private ProfessionalService $service;

    public function __construct(ProfessionalService $service)
    {
        $this->service = $service;
    }

    public function index(Request $request)
    {
        $this->authorize('viewAny', Professional::class);

        $perPage = (int)$request->get('per_page', 15);
        $page = (int)$request->get('page', 1);

        $result = $this->service->list($perPage, $page);
        $collection = array_map(fn($p) => new ProfessionalResource($p), $result['data']);

        return response()->json([
            'data' => $collection,
            'meta' => $result['meta'],
        ]);
    }

    public function show(int $id)
    {
        $professional = $this->service->get($id);
        if (!$professional) {
            return response()->json(['message' => 'Professional not found'], Response::HTTP_NOT_FOUND);
        }

        $this->authorize('view', $professional);

        return new ProfessionalResource($professional);
    }

    public function store(CreateProfessionalRequest $request)
    {
        $this->authorize('create', Professional::class);

        $payload = $request->validated();
        $payload['status'] = $payload['status'] ?? 'pending';

        $professional = $this->service->create($payload);

        return (new ProfessionalResource($professional))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function update(UpdateProfessionalRequest $request, int $id)
    {
        $professional = $this->service->get($id);

        if (!$professional) {
            return response()->json(['message' => 'Professional not found'], Response::HTTP_NOT_FOUND);
        }

        $this->authorize('update', $professional);

        $payload = $request->validated();
        $updated = $this->service->update($id, $payload);

        return new ProfessionalResource($updated);
    }

    public function destroy(int $id)
    {
        $professional = $this->service->get($id);

        if (!$professional) {
            return response()->json(['message' => 'Professional not found'], Response::HTTP_NOT_FOUND);
        }

        $this->authorize('delete', $professional);

        $deleted = $this->service->delete($id);

        if (!$deleted) {
            return response()->json(['message' => 'Professional not found or cannot be deleted'], Response::HTTP_NOT_FOUND);
        }

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }


  public function myPatients($professionalID)
{
    $patients = $this->service->getMyPatients($professionalID);

    return response()->json([
        'data' => $patients,
    ]);
}

}
