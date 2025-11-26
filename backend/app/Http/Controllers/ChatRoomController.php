<?php

namespace App\Http\Controllers;

use App\Application\Services\ChatRoomService;
use App\Http\Requests\CreateChatRoomRequest;
use App\Http\Requests\UpdateChatRoomRequest;
use App\Http\Resources\ChatRoomResource;
use App\Domain\Models\ChatRoom;
use Illuminate\Http\Request;

class ChatRoomController extends Controller
{
    private ChatRoomService $service;

    public function __construct(ChatRoomService $service)
    {
        $this->service = $service;
    }

    public function index(Request $request)
{
    $user = auth()->user();

    if ($user->role === 'admin') {
        $result = $this->service->list();
    } else {
        $data = $this->service->listForUser($user->userID);

        return response()->json([
            'data' => array_map(fn($c) => new ChatRoomResource($c), $data),
            'meta' => null
        ]);
    }

    return response()->json([
        'data' => array_map(fn($c) => new ChatRoomResource($c), $result['data']),
        'meta' => $result['meta']
    ]);
}


    public function show(int $id)
    {
        $chatRoom = $this->service->get($id);

        if (!$chatRoom) {
            return response()->json(['message' => 'Chat room not found'], 404);
        }

        $this->authorize('view', $chatRoom);

        return new ChatRoomResource($chatRoom);
    }

    public function store(CreateChatRoomRequest $request)
    {
        $this->authorize('create', ChatRoom::class);

        $payload = $request->validated();
        $chatRoom = $this->service->create($payload);

        return (new ChatRoomResource($chatRoom))
            ->response()
            ->setStatusCode(201);
    }

    public function update(UpdateChatRoomRequest $request, int $id)
    {
        $chatRoom = $this->service->get($id);

        if (!$chatRoom) {
            return response()->json(['message' => 'Chat room not found'], 404);
        }

        $this->authorize('update', $chatRoom);

        $payload = $request->validated();
        $updated = $this->service->update($id, $payload);

        return new ChatRoomResource($updated);
    }

    public function destroy(int $id)
    {
        $chatRoom = $this->service->get($id);

        if (!$chatRoom) {
            return response()->json(['message' => 'Chat room not found'], 404);
        }

        $this->authorize('delete', $chatRoom);

        $deleted = $this->service->delete($id);

        if (!$deleted) {
            return response()->json(['message' => 'Chat room not found or cannot be deleted'], 404);
        }

        return response()->json(null, 204);
    }
}
