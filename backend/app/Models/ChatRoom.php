<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatRoom extends Model
{
    use HasFactory;

    protected $table = 'chat_rooms';
    protected $primaryKey = 'chatRoomID';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'createdBy',
        'professionalID',
        'patientID',
    ];

 public function patient()
{
    return $this->belongsTo(Patient::class, 'patientID', 'patientID');
}

public function professional()
{
    return $this->belongsTo(Professional::class, 'professionalID', 'professionalID');
}
public function creator()
{
    return $this->belongsTo(User::class, 'createdBy', 'userID');
}

}
