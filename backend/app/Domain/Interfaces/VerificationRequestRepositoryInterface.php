<?php
namespace App\Domain\Interfaces;

use App\Domain\Models\VerificationRequest;

interface VerificationRequestRepositoryInterface
{
    public function create(VerificationRequest $vr): VerificationRequest;
    public function update(VerificationRequest $vr): VerificationRequest;
    public function findById(int $id): ?VerificationRequest;
    public function findPending(): array;
    public function findByProfessional(int $professionalID): array;
    public function all(): array;
}
