<?php
namespace App\Http\Controllers;

use App\Application\Services\VerificationRequestService;
use App\Http\Requests\SubmitVerificationRequest;
use App\Http\Requests\ReviewVerificationRequest;
use App\Http\Resources\VerificationRequestResource;

class VerificationRequestController extends Controller
{
    public function __construct(private VerificationRequestService $service) {}

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
        $vr = $this->service->reject($id, auth()->id(), $req->comments);
        return $vr ? new VerificationRequestResource($vr)
                   : response()->json(['message' => 'Not found'], 404);
    }
}
