<?php

namespace App\Domain\Interfaces;

use App\Domain\Models\ConsentRecord;

interface ConsentRecordRepositoryInterface
{
    public function create(ConsentRecord $c): ConsentRecord;
    public function findById(int $id): ?ConsentRecord;
    public function findAll(int $perPage = 15, int $page = 1): array;
    public function update(ConsentRecord $c): ConsentRecord;
    public function delete(int $id): bool;
}
