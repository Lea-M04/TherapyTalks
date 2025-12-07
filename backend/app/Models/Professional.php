<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

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

    public function availability()
{
    return $this->hasMany(Availability::class, 'professionalID', 'professionalID');
}

public function services()
{
    return $this->hasMany(Service::class, 'professionalID', 'professionalID');
}


public function bookings()
{
    return $this->hasMany(Booking::class, 'professionalID', 'professionalID');
}

}
