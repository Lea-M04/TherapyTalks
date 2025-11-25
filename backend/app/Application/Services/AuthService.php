<?php

namespace App\Application\Services;

use App\Application\DTOs\CreateUserDTO;
use App\Application\DTOs\LoginDTO;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Application\Services\AuditLogService;
class AuthService
{
    private UserService $userService;
    private AuditLogService $audit;

    public function __construct(UserService $userService, AuditLogService $audit)
    {
        $this->userService = $userService;
         $this->audit = $audit;
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

       $user = $this->userService->create($data);

        $this->audit->write(
            action: 'user_registered',
            targetType: 'User',
            targetID: $user->userID,
            status: 'success',
            performedBy: $user->userID,
        );

        return User::find($user->userID);
    }

    public function login(LoginDTO $dto): ?User
    {
        $user = $this->userService->findByEmail($dto->email);

         if (!$user) {
            $this->audit->write(
                action: 'login_failed',
                targetType: 'User',
                targetID: null,
                status: 'failed',
                performedBy: null
            );
            return null;
        }


        if (!Hash::check($dto->password, $user->password)) {
             $this->audit->write(
                action: 'login_failed',
                targetType: 'User',
                targetID: $user->userID,
                status: 'failed',
                performedBy: $user->userID
            );
            return null;
        }
 $this->audit->write(
            action: 'login_success',
            targetType: 'User',
            targetID: $user->userID,
            status: 'success',
            performedBy: $user->userID
        );

        return $user;
    }
}
