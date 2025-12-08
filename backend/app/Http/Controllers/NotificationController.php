<?php

namespace App\Http\Controllers;

use App\Application\Services\NotificationService;
use Illuminate\Http\Request;
use App\Http\Resources\NotificationResource;
use App\Http\Resources\NotificationCollection;

class NotificationController extends Controller
{
    public function __construct(private NotificationService $service) {}

    public function index(Request $request)
    {
        $user = auth()->user();
        $per = $request->get('per_page', 50);
        $page = $request->get('page', 1);

        $result = $this->service->listForUser($user->userID, $per, $page);

        return response()->json($result);
    }

    public function show(int $id)
    {
        $notif = $this->service->findById($id);
        if (!$notif) return response()->json(['message'=>'Not found'],404);

        if (auth()->user()->role !== 'admin' && auth()->user()->userID != $notif->userID) {
            return response()->json(['message'=>'Forbidden'],403);
        }

        return new NotificationResource($notif);
    }

    public function markRead(int $id)
    {
        $notif = $this->service->findById($id);
        if (!$notif) return response()->json(['message'=>'Not found'],404);

        if (auth()->user()->role !== 'admin' && auth()->user()->userID != $notif->userID) {
            return response()->json(['message'=>'Forbidden'],403);
        }

        $updated = $this->service->markAsRead($id);

        return new NotificationResource($updated);
    }

    public function destroy(int $id)
    {
        $notif = $this->service->findById($id);
        if (!$notif) return response()->json(['message'=>'Not found'],404);

        if (auth()->user()->role !== 'admin' && auth()->user()->userID != $notif->userID) {
            return response()->json(['message'=>'Forbidden'],403);
        }

        $this->service->delete($id);
        return response()->json(null,204);
    }
    public function store(Request $request)
{
    $validated = $request->validate([
        'title' => 'required|string',
        'message' => 'required|string',
        'type' => 'required|in:system,booking,message,alert,info',
        'userID' => 'required|exists:users,userID',
        'link' => 'nullable|string'
    ]);

    $notif = $this->service->create($validated);

    return new NotificationResource($notif);
}
public function all(Request $request)
{

    if (auth()->user()->role !== 'admin') {
        return response()->json(['message' => 'Forbidden'], 403);
    }

    $per = (int) $request->get('per_page', 50);
    $page = (int) $request->get('page', 1);

    $result = $this->service->listAll($per, $page);

    return response()->json($result);
}

}
