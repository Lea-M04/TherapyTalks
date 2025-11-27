<?php

namespace App\Application\Services;

use App\Domain\Models\ConsentHistory;
use App\Domain\Interfaces\ConsentHistoryRepositoryInterface;

class ConsentHistoryService
{
    private ConsentHistoryRepositoryInterface $repo;

    public function __construct(ConsentHistoryRepositoryInterface $repo)
    {
        $this->repo = $repo;
    }

    public function create(array $data): ConsentHistory
    {
        $h = new ConsentHistory($data);
        return $this->repo->create($h);
    }

    public function listForConsent(int $consentID): array
    {
        return $this->repo->listForConsent($consentID);
    }

    public function find(int $id): ?ConsentHistory
    {
        return $this->repo->findById($id);
    }

    public function delete(int $id): bool
    {
        return $this->repo->delete($id);
    }
   public function listAll(): array
{
    return $this->repo->listAll();
}


}
