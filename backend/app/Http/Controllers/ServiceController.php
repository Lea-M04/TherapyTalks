<?php

namespace App\Http\Controllers;

use App\Application\Services\ServiceService;
use App\Http\Requests\CreateServiceRequest;
use App\Http\Requests\UpdateServiceRequest;
use App\Http\Resources\ServiceResource;
use Illuminate\Http\Request;
use App\Domain\Models\Service;
use Symfony\Component\HttpFoundation\Response;

class ServiceController extends Controller
{
    private ServiceService $service;

    public function __construct(ServiceService $service)
    {
        $this->service = $service;
    }

    public function index(Request $request, $professionalID = null)
{
      $this->authorize('viewAny', Service::class);

    if ($professionalID) {
        $services = $this->service->listByProfessional($professionalID);
        return ServiceResource::collection($services);
    }

    $page = $request->get('page', 1);
    $perPage = $request->get('per_page', 15);

    $services = $this->service->listAll($perPage, $page);
    return response()->json($services, 200);
}


    public function show(int $id)
    {
        $service = $this->service->get($id);

        if (!$service) {
            return response()->json(['message' => 'Service not found'], 404);
        }

        $this->authorize('view', $service);

        return new ServiceResource($service);
    }

    public function store(CreateServiceRequest $request)
    {
        $this->authorize('create', Service::class);

        $payload = $request->validated();
        $service = $this->service->create($payload);

        return (new ServiceResource($service))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function update(UpdateServiceRequest $request, int $id)
    {
        $service = $this->service->get($id);

        if (!$service) {
            return response()->json(['message' => 'Service not found'], 404);
        }

        $this->authorize('update', $service);

        $updated = $this->service->update($id, $request->validated());

        return new ServiceResource($updated);
    }

    public function destroy(int $id)
    {
        $service = $this->service->get($id);

        if (!$service) {
            return response()->json(['message' => 'Service not found'], 404);
        }

        $this->authorize('delete', $service);

        $deleted = $this->service->delete($id);

        return $deleted
            ? response()->json(null, 204)
            : response()->json(['message' => 'Cannot delete service'], 400);
    }

    
}
