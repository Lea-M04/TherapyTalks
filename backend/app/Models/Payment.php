<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Patient;

class Payment extends Model
{
    protected $primaryKey = 'paymentID';

    protected $fillable = [
        'bookingID',
        'patientID',
        'amount',
        'status',
        'provider',
        'transactionID',
    ];

    public function booking()
    {
        return $this->belongsTo(Booking::class, 'bookingID', 'bookingID');
    }
    
    public function patient()
    {
        return $this->belongsTo(Patient::class, 'patientID', 'patientID');
    }
}
