<?php

namespace App\Application\Services;

use App\Domain\Models\User as DomainUser;
use App\Domain\Interfaces\UserRepositoryInterface;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Arr;

class UserService
{
    private UserRepositoryInterface $repo;

    public function __construct(UserRepositoryInterface $repo)
    {
        $this->repo = $repo;
    }

    public function list(int $perPage = 15, int $page = 1): array
    {
        return $this->repo->findAll($perPage, $page);
    }

    public function get(int $id): ?DomainUser
    {
        return $this->repo->findById($id);
    }

public function create(array $data): DomainUser
    {
        if (!empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }
        $domainUser = new DomainUser($data);
        return $this->repo->create($domainUser);
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
        return $this->repo->update($updatedUser);
    }

    public function delete(int $id): bool
    {
        return $this->repo->delete($id);
    }

    public function findByEmail(string $email)
{
    return User::where('email', $email)->first();
}

}
