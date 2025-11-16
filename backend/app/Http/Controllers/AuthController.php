<?php

namespace App\Http\Controllers;

use App\Application\DTOs\CreateUserDTO;
use App\Application\DTOs\LoginDTO;
use App\Application\Services\AuthService;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    private AuthService $auth;

    public function __construct(AuthService $auth)
    {
        $this->auth = $auth;
    }

    public function register(Request $req)
{
    $validated = $req->validate([
        'firstName'    => 'required|string',
        'lastName'     => 'required|string',
        'email'        => 'required|email|unique:users,email',
        'username'     => 'required|string|unique:users,username',
        'password'     => 'required|string|min:6',

        'phoneNumber'  => 'nullable|string',
        'dateOfBirth'  => 'nullable|date',
        'gender'       => 'nullable|in:male,female,other',
        'role'         => 'nullable|in:patient,professional,admin',
        'profileImage' => 'nullable|string',
        'status'       => 'nullable|in:active,inactive,banned',
    ]);

    $dto = new CreateUserDTO(
        $validated['firstName'],
        $validated['lastName'],
        $validated['email'],
        $validated['username'],
        $validated['password'],
        $validated['phoneNumber'] ?? null,
        $validated['dateOfBirth'] ?? null,
        $validated['gender'] ?? null,
        $validated['role'] ?? null,
        $validated['profileImage'] ?? null,
        $validated['status'] ?? null,
    );

    $user = $this->auth->register($dto);

    return response()->json($user, 201);
}

    public function login(Request $req)
    {
        $dto = new LoginDTO($req->email, $req->password);

        $user = $this->auth->login($dto);

        if (!$user) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        return response()->json($user);
    }
}
