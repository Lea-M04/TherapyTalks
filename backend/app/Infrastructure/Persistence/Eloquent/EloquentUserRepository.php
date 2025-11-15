<?php

namespace Infrastructure\Persistence\Eloquent;

use App\Models\User as EloquentUser;
use Domain\Models\User;
use Infrastructure\Persistence\Repositories\UserRepository;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class EloquentUserRepository implements UserRepository
{
    private function mapToDomain(EloquentUser $u): User
    {
        return new User([
            'userID' => $u->userID,
            'firstName' => $u->firstName,
            'lastName' => $u->lastName,
            'phoneNumber' => $u->phoneNumber,
            'email' => $u->email,
            'dateOfBirth' => $u->dateOfBirth ? $u->dateOfBirth->toDateString() : null,
            'gender' => $u->gender,
            'role' => $u->role,
            'status' => $u->status,
            'profileImage' => $u->profileImage,
            'username' => $u->username,
            'password' => $u->password,
            'created_at' => $u->created_at ? $u->created_at->toDateTimeString() : null,
            'updated_at' => $u->updated_at ? $u->updated_at->toDateTimeString() : null,
        ]);
    }

    public function findById(int $id): ?User
    {
        $u = EloquentUser::where('userID', $id)->first();
        return $u ? $this->mapToDomain($u) : null;
    }

    public function findAll(int $perPage = 15, int $page = 1): array
    {
        $paginator = EloquentUser::orderBy('userID', 'desc')->paginate($perPage, ['*'], 'page', $page);
        $data = $paginator->getCollection()->map(fn($u) => $this->mapToDomain($u))->all();

        return [
            'data' => $data,
            'meta' => [
                'total' => $paginator->total(),
                'per_page' => $paginator->perPage(),
                'current_page' => $paginator->currentPage(),
                'last_page' => $paginator->lastPage(),
            ],
        ];
    }

    public function findByEmail(string $email): ?User
    {
        $u = EloquentUser::where('email', $email)->first();
        return $u ? $this->mapToDomain($u) : null;
    }

    public function findByUsername(string $username): ?User
    {
        $u = EloquentUser::where('username', $username)->first();
        return $u ? $this->mapToDomain($u) : null;
    }

    public function create(array $data): User
    {
        $eloquent = EloquentUser::create($data);
        return $this->mapToDomain($eloquent);
    }

    public function update(int $id, array $data): ?User
    {
        $eloquent = EloquentUser::where('userID', $id)->first();
        if (!$eloquent) return null;
        $eloquent->update($data);
        return $this->mapToDomain($eloquent);
    }

    public function delete(int $id): bool
    {
        return (bool) EloquentUser::where('userID', $id)->delete();
    }
}
