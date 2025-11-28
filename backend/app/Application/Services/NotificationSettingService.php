<?php
namespace App\Application\Services;

use App\Domain\Interfaces\NotificationSettingRepositoryInterface;
use App\Domain\Models\NotificationSetting;
use App\Application\Services\AuditLogService;

class NotificationSettingService
{
    public function __construct(
        private NotificationSettingRepositoryInterface $repo,
        private AuditLogService $audit
    ) {}

    public function getForUser(int $userID): ?NotificationSetting
    {
        return $this->repo->findByUser($userID);
    }

    public function create(array $data): NotificationSetting
    {
        $domain = new NotificationSetting($data);
        $created = $this->repo->create($domain);

        $this->audit->write(
            action:'notification_setting_created',
            targetType:'NotificationSetting',
            targetID:$created->settingsID,
            status:'success',
            performedBy:$created->userID
        );

        return $created;
    }

    public function update(int $id, array $data): ?NotificationSetting
    {
        $existing = $this->repo->findById($id);
        if(!$existing) return null;

        $updated = new NotificationSetting(array_merge($existing->toArray(), $data));
        $saved = $this->repo->update($updated);

        $this->audit->write(
            action:'notification_setting_updated',
            targetType:'NotificationSetting',
            targetID:$saved->settingsID,
            status:'success',
            performedBy:$saved->userID
        );

        return $saved;
    }
}
