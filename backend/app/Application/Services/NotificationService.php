<?php
namespace App\Application\Services;

use App\Domain\Interfaces\NotificationRepositoryInterface;
use App\Models\Notification as EloquentNotification;
use App\Application\Services\AuditLogService;
use App\Models\Notification;


class NotificationService
{
    public function __construct(
        private NotificationRepositoryInterface $repo,
        private AuditLogService $audit
    ){}

    public function createForUser(array $data) : ?\App\Domain\Models\Notification {
         $userID = $data['userID'];
         $exists = \App\Models\Notification::where('userID', $data['userID'])
    ->where('title', $data['title'])
    ->where('message', $data['message'])
    ->where('created_at', '>=', now()->subSeconds(2))
    ->exists();

if ($exists) {
    return $created ?? null;
}
    $settings = \App\Models\NotificationSetting::where('userID', $userID)->first();

    if (!$settings) {
        $settings = \App\Models\NotificationSetting::create([
            'userID' => $userID,
            'emailNotifications' => true,
            'pushNotifications' => true,
        ]);
    }
    $user = \App\Models\User::find($userID);
    $email = $user?->email;

    $created = null;

    if ($settings->pushNotifications) {
        $domain = new \App\Domain\Models\Notification($data);
        $created = $this->repo->create($domain);

        event(new \App\Events\NotificationCreated($created));
    }


    if ($settings->emailNotifications && $email) {
    \Mail::to($email)->queue(
        new \App\Mail\GenericNotificationMail(
            $data['title'],
            $data['message']
        )
    );
}

    $this->audit->write(
        action: 'notification_created',
        targetType: 'Notification',
        targetID: $created->notificationID ?? null,
        status: 'success',
        performedBy: auth()->id() ?? ($data['systemBy'] ?? null)
    );

    return $created;
    }

    public function listForUser(int $userID, int $perPage=50, int $page=1): array {
        return $this->repo->findForUser($userID,$perPage,$page);
    }

    public function markAsRead(int $id) {
        return $this->repo->markAsRead($id);
    }

    public function delete(int $id): bool {
        return $this->repo->delete($id);
    }

    public function findById(int $id) {
    return $this->repo->findById($id);
}
public function create(array $data)
{
    return Notification::create($data);
}
public function listAll($per, $page)
{
    return Notification::with('user')
        ->orderBy('notificationID', 'desc')
        ->paginate($per, ['*'], 'page', $page);
}


}
