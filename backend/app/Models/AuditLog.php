<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AuditLog extends Model
{
    protected $table = 'audit_log';

    protected $primaryKey = 'logID';

    public $timestamps = false;

    protected $fillable = [
        'action',
        'targetType',
        'targetID',
        'timestamp',
        'status',
        'userID'
    ];
}

