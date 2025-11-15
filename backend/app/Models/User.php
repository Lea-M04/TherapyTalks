<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

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
        'password' => 'hashed',
    ];
}
