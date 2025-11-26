<?php
namespace App\Http\Controllers;

use App\Application\Services\MessageService;
use App\Events\MessageSent;
use App\Http\Requests\CreateMessageRequest;
use App\Http\Requests\UpdateMessageRequest;
use App\Http\Resources\MessageResource;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class MessageController extends Controller
{
    private MessageService $service;

    public function __construct(MessageService $service)
    {
        $this->service = $service;
    }

    // GET /chat_rooms/{chatRoomID}/messages
    public function indexByChatRoom(Request $request, int $chatRoomID)
    {
        $user = auth()->user();

        if (!$this->service->isUserInChatRoom($user->userID, $chatRoomID) && $user->role !== 'admin') {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $perPage = (int)$request->get('per_page', 50);
        $page = (int)$request->get('page', 1);

        $result = $this->service->listByChatRoom($chatRoomID, $perPage, $page);

        return response()->json([
            'data' => array_map(fn($m) => new MessageResource($m), $result['data']),
            'meta' => $result['meta']
        ]);
    }

    // POST /chat_rooms/{chatRoomID}/messages
    public function store(CreateMessageRequest $request, int $chatRoomID)
    {
        $user = auth()->user();

        if (!$this->service->isUserInChatRoom($user->userID, $chatRoomID) && $user->role !== 'admin') {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $payload = $request->validated();
        $payload['senderID'] = $user->userID;
        $payload['chatRoomID'] = $chatRoomID;

        if (!$this->service->isUserInChatRoom($payload['receiverID'], $chatRoomID)) {
            return response()->json(['message' => 'Receiver is not participant of this chat room'], 422);
        }

        $message = $this->service->create($payload);

        // *** FIRE EVENT REALTIME ***
        event(new MessageSent($message));


        return (new MessageResource($message))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    // GET /messages/{id}
    public function show(int $id)
    {
        $message = $this->service->get($id);
        if (!$message) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $this->authorize('view', $message);

        return new MessageResource($message);
    }

    // PUT /messages/{id}
    public function update(UpdateMessageRequest $request, int $id)
    {
        $message = $this->service->get($id);
        if (!$message) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $this->authorize('update', $message);

        $updated = $this->service->update($id, $request->validated());

        // broadcast update message
        event(new MessageSent($updated));


        return new MessageResource($updated);
    }

    // PATCH /messages/{id}/read
    public function markRead(int $id)
    {
        $message = $this->service->get($id);
        if (!$message) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $user = auth()->user();

        if ($user->role !== 'admin' && $user->userID != $message->receiverID) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $updated = $this->service->markAsRead($id);

        event(new MessageSent($updated));


        return new MessageResource($updated);
    }

    // DELETE /messages/{id}
    public function destroy(int $id)
    {
        $message = $this->service->get($id);
        if (!$message) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $this->authorize('delete', $message);

        $this->service->delete($id);

        return response()->json(null, 204);
    }

    // GET /messages (my messages)
    public function myMessages(Request $request)
    {
        $user = auth()->user();

        $perPage = (int)$request->get('per_page', 50);
        $page = (int)$request->get('page', 1);

        $result = $this->service->listForUser($user->userID, $perPage, $page);

        return response()->json([
            'data' => array_map(fn($m) => new MessageResource($m), $result['data']),
            'meta' => $result['meta']
        ]);
    }
}
