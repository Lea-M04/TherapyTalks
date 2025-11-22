<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Professional extends Model
{
    use HasFactory;

    protected $table = 'professionals';
    protected $primaryKey = 'professionalID';
    public $incrementing = true;
    protected $keyType = 'int';
    public $timestamps = true;

    protected $fillable = [
        'userID',
        'specialization',
        'licenseNumber',
        'experienceYears',
        'education',
        'bio',
        'clinicName',
        'clinicStreet',
        'clinicCity',
        'rating',
        'isOnline',
        'status',
    ];

    protected $casts = [
        'isOnline' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'userID', 'userID');
    }
}
