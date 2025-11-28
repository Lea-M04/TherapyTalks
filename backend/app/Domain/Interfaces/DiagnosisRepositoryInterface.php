<?php

namespace App\Domain\Interfaces;

use App\Domain\Models\Diagnosis;

interface DiagnosisRepositoryInterface
{
    public function create(Diagnosis $d): Diagnosis;
    public function findById(int $id): ?Diagnosis;
    public function findAll(int $perPage = 15, int $page = 1): array;
    public function update(Diagnosis $d): Diagnosis;
    public function delete(int $id): bool;
    public function findByPatientId(int $patientID): array;
}
