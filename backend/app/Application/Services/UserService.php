<?php

namespace App\Application\Services;

use App\Domain\Models\User as DomainUser;
use App\Domain\Interfaces\UserRepositoryInterface;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Arr;
use App\Application\Services\AuditLogService;

class UserService
{
    private UserRepositoryInterface $repo;
    private AuditLogService $audit;

    public function __construct(UserRepositoryInterface $repo, AuditLogService $audit)
    {
        $this->repo = $repo;
         $this->audit = $audit;
    }

    public function list(int $perPage = 15, int $page = 1): array
    {
        return $this->repo->findAll($perPage, $page);
    }

    public function get(int $id): ?DomainUser
    {
        return $this->repo->findById($id);
    }

public function create(array $data): User
    {
        if (!empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }
        $domainUser = new DomainUser($data);
        $created = $this->repo->create($domainUser);

          $this->audit->write(
            action: 'user_created',
            targetType: 'User',
            targetID: $created->userID,
            status: 'success',
            performedBy: auth()->id()
        );

        return User::find($created->userID); 
    }


    public function update(int $id, array $data): ?DomainUser
    {
        $user = $this->repo->findById($id);

    if (!$user) {
        return null;
    }
        if (array_key_exists('password', $data) && !empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
           $data = Arr::except($data, ['password']);
        }
        $updatedUser = new DomainUser(array_merge($user->toArray(), $data));
         $result = $this->repo->update($updatedUser);

        $this->audit->write(
            action: 'user_updated',
            targetType: 'User',
            targetID:  $user->userID,
            status: 'success',
            performedBy: auth()->id()
        );

        return $result;
    }
    

    public function delete(int $id): bool
    {
        $user = $this->repo->findById($id);  
        $deleted = $this->repo->delete($id);

        $this->audit->write(
            action: 'user_deleted',
            targetType: 'User',
            targetID:  $user->userID,
            status: $deleted ? 'success' : 'failed',
            performedBy: auth()->id()
        );

        return $deleted;

    }

    public function findByEmail(string $email)
{
    return User::where('email', $email)->first();
}

}
