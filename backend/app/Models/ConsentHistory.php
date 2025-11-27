<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConsentHistory extends Model
{
    protected $table = 'consent_history';
    protected $primaryKey = 'historyID';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'consentID',
        'previousValue',
        'newValue',
        'changedAt',
        'changedBy'
    ];

    public function consentRecord()
    {
        return $this->belongsTo(ConsentRecord::class, 'consentID', 'consentID');
    }
}
