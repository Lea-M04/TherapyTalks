<?php

namespace Application\Services;

use Application\DTOs\CreateUserDTO;
use Application\DTOs\LoginDTO;
use Domain\Interfaces\UserRepositoryInterface;
use Domain\Models\User;
use Domain\ValueObjects\Email;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    private UserRepositoryInterface $users;

    public function __construct(UserRepositoryInterface $users)
    {
        $this->users = $users;
    }

    public function register(CreateUserDTO $dto): User
    {
        $user = new User(
            uniqid(),
            $dto->name,
            new Email($dto->email),
            Hash::make($dto->password),
            $dto->role
        );

        return $this->users->create($user);
    }

    public function login(LoginDTO $dto): ?User
    {
        $user = $this->users->findByEmail($dto->email);

        if (!$user) return null;

        if (!Hash::check($dto->password, $user->password())) {
            return null;
        }

        return $user;
    }
}
