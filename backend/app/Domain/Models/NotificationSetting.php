<?php
namespace App\Domain\Models;

class NotificationSetting
{
    public ?int $settingsID;
    public int $userID;
    public bool $emailNotifications;
    public bool $pushNotifications;

    public function __construct(array $data = [])
    {
        $this->settingsID = $data['settingsID'] ?? null;
        $this->userID = (int)($data['userID'] ?? 0);
        $this->emailNotifications = (bool)($data['emailNotifications'] ?? false);
        $this->pushNotifications = (bool)($data['pushNotifications'] ?? false);
    }

    public function toArray(): array
    {
        return [
            'settingsID' => $this->settingsID,
            'userID' => $this->userID,
            'emailNotifications' => $this->emailNotifications,
            'pushNotifications' => $this->pushNotifications
        ];
    }
}
