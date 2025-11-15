<?php

namespace App\Http\Controllers;

use Application\DTOs\CreateUserDTO;
use Application\DTOs\LoginDTO;
use Application\Services\AuthService;
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
        $dto = new CreateUserDTO(
            $req->name,
            $req->email,
            $req->password,
            $req->role
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
