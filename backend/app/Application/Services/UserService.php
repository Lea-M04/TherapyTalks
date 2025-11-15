<?php

namespace App\Application\Services;


use Infrastructure\Persistence\Repositories\UserRepository;
use Domain\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Arr;

class UserService
{
    private UserRepository $repo;

    public function __construct(UserRepository $repo)
    {
        $this->repo = $repo;
    }

    public function list(int $perPage = 15, int $page = 1): array
    {
        return $this->repo->findAll($perPage, $page);
    }

    public function get(int $id): ?User
    {
        return $this->repo->findById($id);
    }

    public function create(array $data): User
    {

        if (!empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        return $this->repo->create($data);
    }

    public function update(int $id, array $data): ?User
    {
     
        if (array_key_exists('password', $data) && !empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
           
            unset($data['password']);
        }

        return $this->repo->update($id, $data);
    }

    public function delete(int $id): bool
    {
        return $this->repo->delete($id);
    }
}
