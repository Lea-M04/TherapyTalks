<?php
namespace App\Domain\Interfaces;

use App\Domain\Models\NotificationSetting;

interface NotificationSettingRepositoryInterface
{
    public function findByUser(int $userID): ?NotificationSetting;
    public function findById(int $id): ?NotificationSetting;
    public function create(NotificationSetting $s): NotificationSetting;
    public function update(NotificationSetting $s): NotificationSetting;
}
