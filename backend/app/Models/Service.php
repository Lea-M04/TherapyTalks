<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $table = 'services';
    protected $primaryKey = 'serviceID';
    public $timestamps = false;

    protected $fillable = [
        'professionalID',
        'serviceName',
        'description',
        'durationMinutes',
        'price',
        'category',
        'isActive',
    ];

    protected $casts = [
        'isActive' => 'boolean',
        'price' => 'float',
    ];

    public function professional()
    {
        return $this->belongsTo(Professional::class, 'professionalID', 'professionalID');
    }
}
