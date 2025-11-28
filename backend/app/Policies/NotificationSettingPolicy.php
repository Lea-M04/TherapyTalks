<?php

namespace App\Policies;

use App\Models\User;
use App\Models\NotificationSetting;

class NotificationSettingPolicy
{
    public function view(User $user, NotificationSetting $setting): bool
    {
        return $user->userID === $setting->userID || $user->role === 'admin';
    }

    public function update(User $user, NotificationSetting $setting): bool
    {
        return $user->userID === $setting->userID || $user->role === 'admin';
    }

    public function create(User $user): bool
    {
        return true; 
    }
}
