<?php

namespace App\Http\Controllers;

use App\Application\Services\ConsentHistoryService;
use App\Http\Resources\ConsentHistoryResource;
use App\Domain\Models\ConsentHistory;
use Illuminate\Http\Request;

class ConsentHistoryController extends Controller
{
    private ConsentHistoryService $service;

    public function __construct(ConsentHistoryService $service)
    {
        $this->service = $service;
    }

    public function index(Request $request)
    {
        $this->authorize('viewAny', ConsentHistory::class);

        $consentID = $request->get('consentID');

        if ($consentID) {
            $history = $this->service->listForConsent($consentID);
        } else {
            $history = $this->service->listAll();
        }

        return ConsentHistoryResource::collection($history);
    }

    public function show(int $id)
    {
        $record = $this->service->find($id);

        if (!$record) {
            return response()->json(['message' => 'ConsentHistory not found'], 404);
        }

        $this->authorize('view', $record);

        return new ConsentHistoryResource($record);
    }
}
