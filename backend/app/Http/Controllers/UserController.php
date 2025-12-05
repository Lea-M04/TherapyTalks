<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Http\Requests\RegisterUserRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Application\Services\UserService;
use App\Models\User;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    private UserService $service;

    public function __construct(UserService $service)
    {
        $this->service = $service;
    }

    public function index(Request $request)
    {
        $this->authorize('viewAny', User::class);

        $perPage = (int) $request->get('per_page', 15);
        $page = (int) $request->get('page', 1);

        $result = $this->service->list($perPage, $page);
        $collection = array_map(fn($u) => new UserResource($u), $result['data']);

        return response()->json([
            'data' => $collection,
            'meta' => $result['meta'],
        ]);
    }

    public function show(int $id)
    {
        $user = $this->service->get($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        $this->authorize('view', $user);

        return new UserResource($user);
    }

    public function store(RegisterUserRequest $request)
    {
        $this->authorize('create', User::class);

        $payload = $request->validated();
        $user = $this->service->create($payload);

        return (new UserResource($user))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function update(UserUpdateRequest $request, int $id)
    {
        $user = \App\Models\User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], Response::HTTP_NOT_FOUND);
        }
            
        $this->authorize('update', $user);

        $payload = $request->validated();
        $payload = $request->validated();

if ($request->hasFile('profileImage')) {
    $file = $request->file('profileImage');
    $filename = time() . '_' . $file->getClientOriginalName();
    $file->move(public_path('uploads/profile_images'), $filename);
    $payload['profileImage'] = $filename;
}

$updated = $this->service->update($id, $payload);
return new UserResource($updated);

        $updated = $this->service->update($id, $payload);

        return new UserResource($updated);
    }

    public function destroy(int $id)
    {
        $user = $this->service->get($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        $this->authorize('delete', $user);

        $deleted = $this->service->delete($id);

        if (!$deleted) {
            return response()->json(['message' => 'User not found or cannot be deleted'], Response::HTTP_NOT_FOUND);
        }

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
