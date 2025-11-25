<?php

namespace App\Domain\Interfaces;

use App\Domain\Models\AuditLog;

interface AuditLogRepositoryInterface
{
    public function save(AuditLog $log): void;

    public function getLogs(int $perPage = 20);
}
