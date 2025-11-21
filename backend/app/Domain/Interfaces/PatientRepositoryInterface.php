<?php

namespace App\Domain\Interfaces;
use App\Domain\Models\Patient;
    interface PatientRepositoryInterface
    {
        public function create(Patient $patient): Patient;
        public function findById(int $id): ?Patient;
        public function findByUserId(int $userID): ?Patient;
        public function findAll(int $perPage = 15, int $page = 1): array;
        public function update(Patient $patient): Patient;
        public function delete(int $id): bool;
    }