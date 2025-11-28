<?php
namespace App\Application\Services;

use App\Domain\Interfaces\MessageRepositoryInterface;
use App\Domain\Models\Message as DomainMessage;
use App\Application\Services\AuditLogService;
use App\Models\ChatRoom as EloquentChatRoom;
use App\Models\User;
use App\Models\Message;

class MessageService
{
    private MessageRepositoryInterface $repo;
    private AuditLogService $audit;

    public function __construct(MessageRepositoryInterface $repo, AuditLogService $audit)
    {
        $this->repo = $repo;
        $this->audit = $audit;
    }

        public function create(array $data): DomainMessage
    {
        $m = new DomainMessage($data);

        if (!$m->sentAt) {
            $m->sentAt = now();
        }

        $created = $this->repo->create($m);
        $eloquentMessage = Message::with('sender')->find($created->messageID);
        event(new \App\Events\MessageSent($eloquentMessage));

        $this->audit->write(
            action: 'message_sent',
            targetType: 'Message',
            targetID: $created->messageID,
            status: 'success',
            performedBy: $created->senderID
        );

        return $created;
    }


    public function get(int $id): ?DomainMessage
    {
        return $this->repo->findById($id);
    }

    public function listByChatRoom(int $chatRoomID, int $perPage = 50, int $page = 1): array
    {
        return $this->repo->findByChatRoom($chatRoomID, $perPage, $page);
    }

    public function listForUser(int $userID, int $perPage = 50, int $page = 1): array
    {
        return $this->repo->findForUser($userID, $perPage, $page);
    }

    public function markAsRead(int $id, ?string $timestamp = null): ?DomainMessage
    {
        $m = $this->repo->markAsRead($id, $timestamp);
        if ($m) {
            $this->audit->write(
                action: 'message_read',
                targetType: 'Message',
                targetID: $m->messageID,
                status: 'success',
                performedBy: auth()->id()
            );
        }
        return $m;
    }

    public function delete(int $id): bool
    {
        $m = $this->repo->findById($id);
        if (!$m) return false;

        $deleted = $this->repo->delete($id);
        $this->audit->write(
            action: 'message_deleted',
            targetType: 'Message',
            targetID: $m->messageID,
            status: $deleted ? 'success' : 'failed',
            performedBy: auth()->id() ?? $m->senderID
        );
        return $deleted;
    }


    public function isUserInChatRoom(int $userID, int $chatRoomID): bool
    {
        $c = EloquentChatRoom::where('chatRoomID', $chatRoomID)->first();
        if (!$c) return false;
        if ($c->createdBy == $userID) return true;


        $patient = \App\Models\Patient::where('patientID', $c->patientID)->first();
        if ($patient && $patient->userID == $userID) return true;

        $professional = \App\Models\Professional::where('professionalID', $c->professionalID)->first();
        if ($professional && $professional->userID == $userID) return true;

        return false;
    }
}
