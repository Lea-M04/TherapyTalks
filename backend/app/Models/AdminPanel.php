<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdminPanel extends Model
{
    protected $table = 'admin_panel';
    protected $primaryKey = 'adminID';
    public $timestamps = false;

    protected $fillable = [
        'userID',
        'role',
        'permissions',
    ];

    protected $casts = [
        'permissions' => 'array'
    ];
}
