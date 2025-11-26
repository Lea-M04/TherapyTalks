<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Availability extends Model
{
    protected $table = 'availability';
    protected $primaryKey = 'availabilityID';
    public $timestamps = false;

    protected $fillable = [
        'professionalID',
        'dayOfWeek',
        'startTime',
        'endTime',
        'isAvailable',
    ];

    protected $casts = [
        'isAvailable' => 'boolean',
    ];

    public function professional()
    {
        return $this->belongsTo(Professional::class, 'professionalID', 'professionalID');
    }
}
