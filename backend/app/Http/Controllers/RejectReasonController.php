<?php
namespace App\Http\Controllers;

use App\Application\Services\RejectReasonService;
use App\Http\Requests\CreateRejectReasonRequest;
use App\Http\Requests\UpdateRejectReasonRequest;
use App\Http\Resources\RejectReasonResource;
use App\Domain\Models\RejectReason;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class RejectReasonController extends Controller
{
    public function __construct(private RejectReasonService $service) {}

    public function index()
    {
       $user = Auth::user();
        $reasons = [];

        if ($user->role === 'admin') {
            $reasons = $this->service->all();
        } elseif ($user->role === 'professional') {
            if ($user->professional) {
                $professionalID = $user->professional->professionalID;
                $reasons = $this->service->getReasonsByProfessional($professionalID);
            }
        }
        $reasonIDs = collect($reasons)->pluck('reasonID')->toArray();

    $eloquentReasons = \App\Models\RejectReason::with('request.professional.user')
        ->whereIn('reasonID', $reasonIDs)
        ->get();

    return RejectReasonResource::collection($eloquentReasons);

    }

    public function show(int $id)
    {
       $reason = $this->service->get($id);
        $this->authorize('view', $reason);
         $eloquentModel = \App\Models\RejectReason::with('request.professional.user')
        ->findOrFail($id);
        return new RejectReasonResource($eloquentModel);
    }

    public function destroy(int $id)
    {
        $reason = $this->service->get($id);
        if (!$reason) return response()->json(['message' => 'Not found'], 404);

        $this->authorize('delete', $reason);

        $this->service->delete($id);
        return response()->json(null, 204);
    }
}
