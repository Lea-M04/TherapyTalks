<?php

namespace App\Application\Services;

use App\Application\DTOs\CreateUserDTO;
use App\Application\DTOs\LoginDTO;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    private UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function register(CreateUserDTO $dto): User
    {
        $data = [
            'firstName'   => $dto->firstName,
            'lastName'    => $dto->lastName,
            'email'       => $dto->email,
            'username'    => $dto->username,
            'password'    => $dto->password,
            'phoneNumber' => $dto->phoneNumber,
            'dateOfBirth' => $dto->dateOfBirth,
            'gender'      => $dto->gender,
            'role'        => $dto->role ?? 'patient',
            'status'      => $dto->status ?? 'active',
            'profileImage'=> $dto->profileImage,
        ];

        return $this->userService->create($data);
    }

    public function login(LoginDTO $dto): ?User
    {
        $user = $this->userService->findByEmail($dto->email);

        if (!$user) return null;

        if (!Hash::check($dto->password, $user->password)) {
            return null;
        }

        return $user;
    }
}
