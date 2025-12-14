<?php
namespace App\Http\Controllers;

use App\Application\Services\AvailabilityService;
use App\Http\Requests\CreateAvailabilityRequest;
use App\Http\Requests\UpdateAvailabilityRequest;
use App\Http\Resources\AvailabilityResource;
use App\Domain\Models\Availability;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;

class AvailabilityController extends Controller
{
    public function __construct(private AvailabilityService $service) {}

    public function index(int $professionalID)
    {
        $this->authorize('viewAny', Availability::class);

        $items = $this->service->listForProfessional($professionalID);
        return AvailabilityResource::collection($items);
    }

    public function show(int $id)
    {
         $a = \App\Models\Availability::with('professional.user')->find($id);
        if (!$a) return response()->json(['message' => 'Not found'], 404);

        $this->authorize('view', $a);

        return new AvailabilityResource($a);
    }

    public function store(CreateAvailabilityRequest $request)
    {
        $this->authorize('create', Availability::class);

        $a = $this->service->create($request->validated());
        return (new AvailabilityResource($a))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function update(UpdateAvailabilityRequest $request, int $id)
    {
        $a = $this->service->get($id);
        if (!$a) return response()->json(['message' => 'Not found'], 404);

        $this->authorize('update', $a);

        $updated = $this->service->update($id, $request->validated());
        return new AvailabilityResource($updated);
    }

    public function destroy(int $id)
    {
        $a = $this->service->get($id);
        if (!$a) return response()->json(['message' => 'Not found'], 404);

        $this->authorize('delete', $a);

        $this->service->delete($id);
        return response()->json(null, 204);
    }

  public function all(Request $request)
{
    $this->authorize('viewAny', Availability::class);

    $perPage = (int) $request->get('per_page', 15);
    $page = (int) $request->get('page', 1);

    $paginator = \App\Models\Availability::with(['professional.user'])
        ->orderBy('availabilityID', 'desc')
        ->paginate($perPage, ['*'], 'page', $page);

    return response()->json([
        'data' => AvailabilityResource::collection($paginator->items()),
        'meta' => [
            'total' => $paginator->total(),
            'per_page' => $paginator->perPage(),
            'current_page' => $paginator->currentPage(),
            'last_page' => $paginator->lastPage(),
        ],
    ]);
}


}
