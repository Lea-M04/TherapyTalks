<?php
namespace App\Http\Controllers;

use App\Http\Requests\SubmitVerificationRequest;
use App\Http\Requests\ReviewVerificationRequest;
use App\Http\Resources\VerificationRequestResource;
use Illuminate\Http\Request;
use App\Models\VerificationRequest;
use Illuminate\Support\Facades\Auth;
use \App\Models\Professional;
use \App\Models\RejectReason;

class VerificationRequestController extends Controller
{
    public function index()
    {
        $this->authorize('viewAll', VerificationRequest::class);

        $requests = VerificationRequest::with([
            'professional.user',
            'rejectReasons'
        ])->get();

        return VerificationRequestResource::collection($requests);
    }

    public function pending()
    {
        $this->authorize('viewPending', VerificationRequest::class);

        $requests = VerificationRequest::with([
            'professional.user',
            'rejectReasons'
        ])
        ->where('status', 'pending')
        ->get();

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
        $vr = VerificationRequest::create([
            'professionalID' => $data['professionalID'],
            'documentType' => $data['documentType'],
            'documentURL' => $data['documentURL'],
            'submittedAt' => now(),
            'status' => 'pending'
        ]);

        return new VerificationRequestResource(
            $vr->load(['professional.user'])
        );
    }

    public function approve($id)
{
    $vr = VerificationRequest::find($id);
    if (!$vr) return response()->json(['message' => 'Not found'], 404);

    $vr->update([
        'status' => 'approved',
        'verifiedAt' => now(),
        'reviewedBy' => auth()->id()
    ]);

    Professional::where('professionalID', $vr->professionalID)
        ->update(['status' => 'approved']);

    return new VerificationRequestResource(
        $vr->load(['professional.user', 'rejectReasons'])
    );
}


    public function reject(ReviewVerificationRequest $req, $id)
{
    $vr = VerificationRequest::find($id);
    if (!$vr) return response()->json(['message' => 'Not found'], 404);

    $data = $req->validated();
    $vr->update([
        'status' => 'rejected',
        'verifiedAt' => now(),
        'reviewedBy' => auth()->id(),
        'comments' => $data['adminComment'] ?? null
    ]);

   
    RejectReason::create([
        'requestID' => $vr->requestID,
        'title' => $data['title'],
        'description' => $data['description'] ?? null
    ]);

  
    Professional::where('professionalID', $vr->professionalID)
        ->update([
            'status' => 'rejected'
        ]);

    return new VerificationRequestResource(
        $vr->load(['professional.user', 'rejectReasons'])
    );
}


    public function show($id)
    {
        $vr = VerificationRequest::with([
            'professional.user',
            'rejectReasons'
        ])
        ->where('requestID', $id)
        ->firstOrFail();

        return new VerificationRequestResource($vr);
    }

    public function myRequests()
    {
        $user = Auth::user();

        if ($user->role !== 'professional' || !$user->professional) {
            return response()->json(['message' => 'Not authorized'], 403);
        }

        $requests = VerificationRequest::with([
            'professional.user',
            'rejectReasons'
        ])
        ->where('professionalID', $user->professional->professionalID)
        ->get();

        return VerificationRequestResource::collection($requests);
    }
    public function resubmit(Request $req, $id)
{
    $vr = VerificationRequest::find($id);
    if (!$vr) {
        return response()->json(['message' => 'Not found'], 404);
    }

    if ($vr->status !== 'rejected') {
        return response()->json(['message' => 'Only rejected requests can be resubmitted.'], 400);
    }

  
    if ($req->hasFile('document')) {
        $path = $req->file('document')->store('verification', 'public');
        $vr->documentURL = '/storage/' . $path;
    }


    $vr->status = 'pending';
    $vr->comments = null; 
    $vr->verifiedAt = null;
    $vr->reviewedBy = null;

    $vr->save();

    return new VerificationRequestResource(
        $vr->load(['professional.user', 'rejectReasons'])
    );
}

}
