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
}
