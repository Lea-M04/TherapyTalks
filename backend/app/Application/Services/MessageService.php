<?php
namespace App\Application\Services;

use App\Domain\Interfaces\MessageRepositoryInterface;
use App\Domain\Models\Message as DomainMessage;
use App\Application\Services\AuditLogService;
use App\Models\ChatRoom as EloquentChatRoom;
use App\Models\User;

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

        // FIRE EVENT këtu 👇
        event(new \App\Events\MessageSent($created));

        // Audit log
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

    // helper: validate that a user is member of chat room
    public function isUserInChatRoom(int $userID, int $chatRoomID): bool
    {
        $c = EloquentChatRoom::where('chatRoomID', $chatRoomID)->first();
        if (!$c) return false;
        // map patientID/professionalID -> they store ids of patient/professional (not userID)
        // but chat_rooms.patientID/professionalID in your db are patientID/professionalID.
        // we need to check if $userID equals createdBy (userID), OR equals userID of patient/professional.
        if ($c->createdBy == $userID) return true;

        // try to resolve patient.userID and professional.userID
        $patient = \App\Models\Patient::where('patientID', $c->patientID)->first();
        if ($patient && $patient->userID == $userID) return true;

        $professional = \App\Models\Professional::where('professionalID', $c->professionalID)->first();
        if ($professional && $professional->userID == $userID) return true;

        return false;
    }
}
