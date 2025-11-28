<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NotificationSetting extends Model
{
    protected $table = 'notification_settings';
    protected $primaryKey = 'settingsID';
    public $timestamps = true;

    protected $fillable = [
        'userID',
        'emailNotifications',
        'pushNotifications'
    ];

    protected $casts = [
        'emailNotifications'=>'boolean',
        'pushNotifications'=>'boolean'
    ];

    public function user() {
        return $this->belongsTo(User::class, 'userID','userID');
    }
}
