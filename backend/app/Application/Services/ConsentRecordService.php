<?php

namespace App\Application\Services;

use App\Domain\Interfaces\ConsentRecordRepositoryInterface;
use App\Domain\Models\ConsentRecord;

class ConsentRecordService
{
    private ConsentRecordRepositoryInterface $repo;

    public function __construct(ConsentRecordRepositoryInterface $repo)
    {
        $this->repo = $repo;
    }

    public function list(int $perPage = 15, int $page = 1): array
    {
        return $this->repo->findAll($perPage, $page);
    }

    public function get(int $id): ?ConsentRecord
    {
        return $this->repo->findById($id);
    }

    public function create(array $data): ConsentRecord
    {
        $c = new ConsentRecord($data);
        return $this->repo->create($c);
    }

    public function update(int $id, array $data): ?ConsentRecord
    {
        $existing = $this->repo->findById($id);
        if (!$existing) return null;

        $updated = new ConsentRecord(array_merge($existing->toArray(), $data));
        return $this->repo->update($updated);
    }

    public function delete(int $id): bool
    {
        return $this->repo->delete($id);
    }
}
