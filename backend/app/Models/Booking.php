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
  public function professional()
{
    return $this->belongsTo(\App\Models\Professional::class, 'professionalID', 'professionalID');
}
public function user()
{
    return $this->belongsTo(\App\Models\User::class, 'userID', 'userID');
}


public function patient()
{
    return $this->belongsTo(\App\Models\Patient::class, 'patientID', 'patientID');
}

public function service()
{
    return $this->belongsTo(Service::class, 'serviceID', 'serviceID');
}

}
