<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    protected $table = 'notification';
    protected $primaryKey = 'notificationID';
    public $timestamps = true;

    protected $fillable = [
        'title',
        'message',
        'type',
        'isRead',
        'link',
        'userID'
    ];

    protected $casts = [
        'isRead' => 'boolean'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'userID','userID');
    }
}
