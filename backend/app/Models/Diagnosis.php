<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Diagnosis extends Model
{
    protected $table = 'diagnosis';
    protected $primaryKey = 'diagnosisID';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'patientID',
        'professionalID',
        'title',
        'description',
        'securityLevel',
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
