<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConsentRecord extends Model
{
    protected $table = 'consent_record';
    protected $primaryKey = 'consentID';
    public $incrementing = true;

    protected $fillable = [
        'consentType',
        'description',
        'isRevoked',
        'signedAt',
        'revokedAt',
        'patientID',
        'professionalID',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class, 'patientID', 'patientID');
    }

    public function professional()
    {
        return $this->belongsTo(Professional::class, 'professionalID', 'professionalID');
    }
}
