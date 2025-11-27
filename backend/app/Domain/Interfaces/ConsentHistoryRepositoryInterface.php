<?php

namespace App\Domain\Interfaces;

use App\Domain\Models\ConsentHistory;

interface ConsentHistoryRepositoryInterface
{
    public function create(ConsentHistory $h): ConsentHistory;

    public function listForConsent(int $consentID): array;

    public function findById(int $id): ?ConsentHistory;

    public function delete(int $id): bool;

    public function listAll(): array;

}
