<?php
namespace App\Domain\Interfaces;

use App\Domain\Models\RejectReason;

interface RejectReasonRepositoryInterface
{
    public function delete(int $id): bool;
    public function findById(int $id): ?RejectReason;
    public function all(): array;
    public function findByProfessionalID(int $professionalID): array;
}
