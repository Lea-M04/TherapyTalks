<?php

namespace App\Application\Services;

use App\Domain\Models\AuditLog;
use App\Domain\Interfaces\AuditLogRepositoryInterface;
use Illuminate\Support\Facades\Auth;

class AuditLogService
{
    private AuditLogRepositoryInterface $repo;

    public function __construct(AuditLogRepositoryInterface $repo)
    {
        $this->repo = $repo;
    }

    public function write(
        string $action,
        string $targetType,
        ?int $targetID,
        string $status,
        ?int $performedBy = null
    ): void
    {
        $log = new AuditLog(
        action: $action,
    targetType: $targetType,
    targetID: $targetID,
    timestamp: now()->toDateTimeString(),
    status: $status,
    userID: $performedBy ?? Auth::id() ?? null
        );

        $this->repo->save($log);
    }

    public function view(int $perPage = 20)
    {
        return $this->repo->getLogs($perPage);
    }
}
