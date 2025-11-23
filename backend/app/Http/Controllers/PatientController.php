<?php
namespace App\Http\Controllers;

use App\Application\Services\PatientService;
use App\Http\Requests\CreatePatientRequest;
use App\Http\Requests\UpdatePatientRequest;
use App\Http\Resources\PatientResource;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PatientController extends Controller
{
    private PatientService $service;

    public function __construct(PatientService $service)
    {
        $this->service = $service;
    }


    public function index(Request $request)
{
    $this->authorize('viewAny', Patient::class);

    $perPage = (int) $request->get('per_page', 15);
    $page = (int) $request->get('page', 1);

    $result = $this->service->list($perPage, $page);
    $collection = array_map(fn($p) => new PatientResource($p), $result['data']);

    return response()->json([
        'data' => $collection,
        'meta' => $result['meta'],
    ]);
}

public function show(int $id)
{
    $patient = $this->service->get($id);

    if (!$patient) {
        return response()->json(['message' => 'Patient not found'], 404);
    }

    $this->authorize('view', $patient);

    return new PatientResource($patient);
}

public function store(CreatePatientRequest $request)
{
    $this->authorize('create', Patient::class);

    $payload = $request->validated();
    $patient = $this->service->create($payload);

    return (new PatientResource($patient))
        ->response()
        ->setStatusCode(201);
}

public function update(UpdatePatientRequest $request, int $id)
{
    $patient = $this->service->get($id);

    if (!$patient) {
        return response()->json(['message' => 'Patient not found'], 404);
    }

    $this->authorize('update', $patient);

    $payload = $request->validated();
    $updated = $this->service->update($id, $payload);

    return new PatientResource($updated);
}

public function destroy(int $id)
{
    $patient = $this->service->get($id);

    if (!$patient) {
        return response()->json(['message' => 'Patient not found'], 404);
    }

    $this->authorize('delete', $patient);

    $deleted = $this->service->delete($id);

    if (!$deleted) {
        return response()->json(['message' => 'Patient not found or cannot be deleted'], 404);
    }

    return response()->json(null, 204);
}

}