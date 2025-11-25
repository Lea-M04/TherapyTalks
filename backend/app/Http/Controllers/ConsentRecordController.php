<?php

namespace App\Http\Controllers;

use App\Application\Services\ConsentRecordService;
use App\Http\Requests\CreateConsentRecordRequest;
use App\Http\Requests\UpdateConsentRecordRequest;
use App\Http\Resources\ConsentRecordResource;
use App\Domain\Models\ConsentRecord;
use Illuminate\Http\Request;

class ConsentRecordController extends Controller
{
    private ConsentRecordService $service;

    public function __construct(ConsentRecordService $service)
    {
        $this->service = $service;
    }

    public function index(Request $req)
    {
        $this->authorize('viewAny', ConsentRecord::class);

        $perPage = $req->get('per_page', 15);
        $page = $req->get('page', 1);

        $result = $this->service->list($perPage, $page);

        return response()->json([
            'data' => array_map(fn($c) => new ConsentRecordResource($c), $result['data']),
            'meta' => $result['meta'],
        ]);
    }

    public function show(int $id)
    {
        $consent = $this->service->get($id);

        if (!$consent) {
            return response()->json(['message' => 'ConsentRecord not found'], 404);
        }

        $this->authorize('view', $consent);

        return new ConsentRecordResource($consent);
    }

    public function store(CreateConsentRecordRequest $request)
    {
        $this->authorize('create', ConsentRecord::class);

        $payload = $request->validated();
        $consent = $this->service->create($payload);

        return (new ConsentRecordResource($consent))
            ->response()
            ->setStatusCode(201);
    }

    public function update(UpdateConsentRecordRequest $request, int $id)
    {
        $consent = $this->service->get($id);

        if (!$consent) {
            return response()->json(['message' => 'ConsentRecord not found'], 404);
        }

        $this->authorize('update', $consent);

        $payload = $request->validated();
        $updated = $this->service->update($id, $payload);

        return new ConsentRecordResource($updated);
    }

    public function destroy(int $id)
    {
        $consent = $this->service->get($id);

        if (!$consent) {
            return response()->json(['message' => 'ConsentRecord not found'], 404);
        }

        $this->authorize('delete', $consent);

        $deleted = $this->service->delete($id);

        if (!$deleted) {
            return response()->json(['message' => 'ConsentRecord not found or cannot be deleted'], 404);
        }

        return response()->json(null, 204);
    }
}
