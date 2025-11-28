<?php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class NotificationSettingResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'settingsID' => $this->settingsID,
            'userID' => $this->userID,
            'emailNotifications' => $this->emailNotifications,
            'pushNotifications' => $this->pushNotifications
        ];
    }
}
