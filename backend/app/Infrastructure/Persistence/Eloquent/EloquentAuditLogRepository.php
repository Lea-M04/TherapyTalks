<?php

namespace App\Infrastructure\Persistence\Eloquent;

use App\Domain\Interfaces\AuditLogRepositoryInterface;
use App\Domain\Models\AuditLog as AuditLogEntity;
use App\Models\AuditLog as AuditLogModel;

class EloquentAuditLogRepository implements AuditLogRepositoryInterface
{
    public function save(AuditLogEntity $log): void
    {
        AuditLogModel::create([
            'action' => $log->action,
            'targetType' => $log->targetType,
            'targetID' => $log->targetID,
            'timestamp' => $log->timestamp,
            'status' => $log->status,
            'userID' => $log->userID,
            
        ]);
    }

    public function getLogs(int $perPage = 20)
    {
        return AuditLogModel::orderBy('logID', 'desc')->paginate($perPage);
    }
}
