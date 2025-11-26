<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $table = 'messages';
    protected $primaryKey = 'messageID';
    public $timestamps = true;

    protected $fillable = [
        'content',
        'sentAt',
        'readAt',
        'senderID',
        'receiverID',
        'chatRoomID'
    ];

    protected $casts = [
        'sentAt' => 'datetime',
        'readAt' => 'datetime',
    ];

    public function sender()
    {
        return $this->belongsTo(User::class, 'senderID', 'userID');
    }

    public function receiver()
    {
        return $this->belongsTo(User::class, 'receiverID', 'userID');
    }

    public function chatRoom()
    {
        return $this->belongsTo(ChatRoom::class, 'chatRoomID', 'chatRoomID');
    }
}
