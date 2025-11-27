<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\VerificationRequest;

class RejectReason extends Model
{
    protected $primaryKey = 'reasonID';
    protected $fillable = [
        'requestID', 
        'title', 
        'description'
    ];
    public $timestamps = true;

    public function request()
    {
        return $this->belongsTo(VerificationRequest::class, 'requestID');
    }
}
