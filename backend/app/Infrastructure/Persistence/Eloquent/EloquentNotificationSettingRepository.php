<?php
namespace App\Infrastructure\Persistence\Eloquent;

use App\Domain\Interfaces\NotificationSettingRepositoryInterface;
use App\Domain\Models\NotificationSetting as DomainSetting;
use App\Models\NotificationSetting as EloquentSetting;

class EloquentNotificationSettingRepository implements NotificationSettingRepositoryInterface
{
    private function map(EloquentSetting $s): DomainSetting
    {
        return new DomainSetting([
            'settingsID' => $s->settingsID,
            'userID' => $s->userID,
            'emailNotifications' => $s->emailNotifications,
            'pushNotifications' => $s->pushNotifications
        ]);
    }

    public function findByUser(int $userID): ?DomainSetting
    {
        $s = EloquentSetting::where('userID',$userID)->first();
        return $s ? $this->map($s) : null;
    }

    public function findById(int $id): ?DomainSetting
    {
        $s = EloquentSetting::find($id);
        return $s ? $this->map($s) : null;
    }

    public function create(DomainSetting $s): DomainSetting
    {
        $e = EloquentSetting::create($s->toArray());
        return $this->map($e);
    }

    public function update(DomainSetting $s): DomainSetting
    {
        $e = EloquentSetting::findOrFail($s->settingsID);
        $e->update($s->toArray());
        return $this->map($e);
    }
}
