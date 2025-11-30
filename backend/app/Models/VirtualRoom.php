<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VirtualRoom extends Model
{
    protected $table = 'virtual_rooms'; 
    protected $primaryKey = 'roomID';
    public $timestamps = false;

    protected $fillable = [
        'bookingID',
        'link',
        'expiresAt'
    ];

    protected $casts = [
        'expiresAt' => 'datetime',
    ];

    public function booking()
    {
        return $this->belongsTo(Booking::class, 'bookingID', 'bookingID');
    }
}