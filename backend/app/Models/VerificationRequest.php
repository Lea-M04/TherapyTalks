<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VerificationRequest extends Model
{
    protected $table = 'verification_requests';
    protected $primaryKey = 'requestID';
    public $timestamps = false;

    protected $fillable = [
        'professionalID',
        'documentType',
        'documentURL',
        'submittedAt',
        'verifiedAt',
        'status',
        'reviewedBy',
        'comments'
    ];

    protected $casts = [
        'submittedAt' => 'datetime',
        'verifiedAt' => 'datetime',
    ];
    
    public function professional()
    {
        return $this->belongsTo(Professional::class, 'professionalID', 'professionalID');
    }

    public function reviewer()
    {
        return $this->belongsTo(AdminPanel::class, 'reviewedBy', 'adminID');
    }
}
