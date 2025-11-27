<?php
namespace App\Http\Controllers;

use App\Application\Services\VerificationRequestService;
use App\Http\Requests\SubmitVerificationRequest;
use App\Http\Requests\ReviewVerificationRequest;
use App\Http\Resources\VerificationRequestResource;
use Illuminate\Http\Request;
use App\Domain\Models\VerificationRequest;
use Illuminate\Support\Facades\Auth;

class VerificationRequestController extends Controller
{
    public function __construct(private VerificationRequestService $service) {}



    public function index()
    {
        $this->authorize('viewAll', VerificationRequest::class); 
        $requests = $this->service->all(); 

        return VerificationRequestResource::collection($requests);
    }

    public function pending()
    {
        $this->authorize('viewPending', VerificationRequest::class); 
        $requests = $this->service->findPending();

        return VerificationRequestResource::collection($requests);
    }


    public function submit(SubmitVerificationRequest $req)
{
    $data = $req->validated();

    if ($req->hasFile('document')) {
        $path = $req->file('document')->store('verification', 'public');
        $data['documentURL'] = '/storage/' . $path;
    }

    unset($data['document']);

    $vr = $this->service->submit($data);
    return new VerificationRequestResource($vr);
}

    public function approve(int $id)
    {
        $vr = $this->service->approve($id, auth()->id());
        return $vr ? new VerificationRequestResource($vr)
                   : response()->json(['message' => 'Not found'], 404);
    }

    public function reject(ReviewVerificationRequest $req, int $id)
{
    $vr = $this->service->reject($id, auth()->id(), $req->validated());
    return $vr ? new VerificationRequestResource($vr)
               : response()->json(['message' => 'Not found'], 404);
}


    public function resubmit(Request $request, int $id)
{
    $vr = $this->service->findById($id);

    if (!$vr) {
        return response()->json(['error' => 'Request not found'], 404);
    }

    $data = $request->all();

    $updated = $this->service->resubmit($id, $data);

    return response()->json($updated);
}

   public function show($id)
{
    $this->authorize('view', VerificationRequest::class);

    $request = VerificationRequest::with('rejectReasons')
        ->where('professionalID', auth()->id())
        ->where('requestID', $id)
        ->firstOrFail();

    return new VerificationRequestResource($request);
}

    public function myRequests()
    {
        $user = Auth::user();
        if ($user->role !== 'professional' || !$user->professional) {
            return response()->json(['message' => 'Not authorized'], 403);
        }
        $requests = $this->service->findByProfessionalID($user->professional->professionalID);

        return VerificationRequestResource::collection($requests);
    }


}
