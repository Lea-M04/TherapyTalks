<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $table = 'booking';
    protected $primaryKey = 'bookingID';
    public $timestamps = true;

    protected $fillable = [
        'patientID',
        'professionalID',
        'serviceID',
        'appointmentDate',
        'appointmentTime',
        'duration',
        'status',
        'notes'
    ];
}
