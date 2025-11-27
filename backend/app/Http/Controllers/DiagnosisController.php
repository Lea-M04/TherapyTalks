<?php

namespace App\Http\Controllers;

use App\Application\Services\DiagnosisService;
use App\Http\Requests\CreateDiagnosisRequest;
use App\Http\Requests\UpdateDiagnosisRequest;
use App\Http\Resources\DiagnosisResource;
use App\Domain\Models\Diagnosis as DomainDiagnosis;
use Illuminate\Http\Request;

class DiagnosisController extends Controller
{
    private DiagnosisService $service;

    public function __construct(DiagnosisService $service)
    {
        $this->service = $service;
    }

    public function index(Request $request)
{
    $user = auth()->user();

    if (in_array($user->role, ['admin', 'professional'])) {
        $this->authorize('viewAny', DomainDiagnosis::class);

        $perPage = (int)$request->get('per_page', 15);
        $page = (int)$request->get('page', 1);

        $result = $this->service->list($perPage, $page);

        return response()->json([
            'data' => array_map(fn($d) => new DiagnosisResource($d), $result['data']),
            'meta' => $result['meta'],
        ]);
    }

    if ($user->role === 'patient') {

        $patient = \App\Models\Patient::where('userID', $user->id)->first();

        if (!$patient) {
            return response()->json(['data' => []]);
        }

        $list = $this->service->listByPatient($patient->patientID);

        return response()->json([
            'data' => array_map(fn($d) => new DiagnosisResource($d), $list)
        ]);
    }
}



    public function listByPatient(int $patientID)
    {
        $this->authorize('viewAny', DomainDiagnosis::class);

        $list = $this->service->listByPatient($patientID);

        return response()->json(['data' => array_map(fn($d) => new DiagnosisResource($d), $list)]);
    }

    public function show(int $id)
    {
        $diagnosis = $this->service->get($id);
        if (!$diagnosis) {
            return response()->json(['message' => 'Diagnosis not found'], 404);
        }

        $this->authorize('view', $diagnosis);

        return new DiagnosisResource($diagnosis);
    }

    public function store(CreateDiagnosisRequest $request)
    {
        $this->authorize('create', DomainDiagnosis::class);

        $payload = $request->validated();
        $created = $this->service->create($payload);

        return (new DiagnosisResource($created))
            ->response()
            ->setStatusCode(201);
    }

    public function update(UpdateDiagnosisRequest $request, int $id)
    {
        $existing = $this->service->get($id);
        if (!$existing) {
            return response()->json(['message' => 'Diagnosis not found'], 404);
        }

        $this->authorize('update', $existing);

        $payload = $request->validated();
        $updated = $this->service->update($id, $payload);

        return new DiagnosisResource($updated);
    }

    public function destroy(int $id)
    {
        $existing = $this->service->get($id);
        if (!$existing) {
            return response()->json(['message' => 'Diagnosis not found'], 404);
        }

        $this->authorize('delete', $existing);

        $deleted = $this->service->delete($id);

        return $deleted ? response()->json(null, 204) : response()->json(['message' => 'Not found'], 404);
    }
}
