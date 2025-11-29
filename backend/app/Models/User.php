<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use App\Models\Professional;
use App\Models\Patient;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    protected $table = 'users';

    protected $primaryKey = 'userID';

    public $incrementing = true;

    protected $keyType = 'int';

    protected $fillable = [
        'firstName',
        'lastName',
        'phoneNumber',
        'email',
        'dateOfBirth',
        'gender',
        'role',
        'status',
        'profileImage',
        'username',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'dateOfBirth' => 'date',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
public function professional()
{
    return $this->hasOne(Professional::class, 'userID','userID');
}

public function patient()
{
    return $this->hasOne(Patient::class, 'userID','userID');
}


}
