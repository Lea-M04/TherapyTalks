<?php

namespace App\Application\Services;

use App\Domain\Interfaces\ChatRoomRepositoryInterface;
use App\Domain\Models\ChatRoom;
use App\Models\Patient;
use App\Models\Professional;
use App\Application\Services\AuditLogService;
use App\Models\User;
class ChatRoomService
{
    private ChatRoomRepositoryInterface $repo;
    private AuditLogService $audit;

    public function __construct(ChatRoomRepositoryInterface $repo, AuditLogService $audit)
    {
        $this->repo = $repo;
        $this->audit = $audit;
    }

    public function list(int $perPage = 15, int $page = 1): array
    {
        return $this->repo->findAll($perPage, $page);
    }

    public function get(int $id): ?ChatRoom
    {
        return $this->repo->findById($id);
    }

    public function create(array $data): ChatRoom
    {
        $chatRoom = new ChatRoom($data);
        $created = $this->repo->create($chatRoom);

        $this->audit->write(
            action: 'chatRoom_created',
            targetType: 'ChatRoom',
            targetID: $created->chatRoomID,
            status: 'success',
            performedBy: $created->createdBy
        );

        return $created;
    }

    public function update(int $id, array $data): ?ChatRoom
    {
        $existing = $this->repo->findById($id);
        if (!$existing) return null;

        $updated = new ChatRoom(array_merge($existing->toArray(), $data));
        $result = $this->repo->update($updated);

        $this->audit->write(
            action: 'chatRoom_updated',
            targetType: 'ChatRoom',
            targetID: $result->chatRoomID,
            status: 'success',
            performedBy: $result->createdBy
        );

        return $result;
    }

    public function delete(int $id): bool
    {
        $existing = $this->repo->findById($id);
        if (!$existing) return false;

        $deleted = $this->repo->delete($id);

        $this->audit->write(
            action: 'chatRoom_deleted',
            targetType: 'ChatRoom',
            targetID: $existing->chatRoomID,
            status: $deleted ? 'success' : 'failed',
            performedBy: auth()->id() ?? $existing->createdBy
        );

        return $deleted;
    }


    public function listForUser(int $userID): array
{
    $user = User::with(['patient', 'professional'])->find($userID);

    $patientID = $user->patient?->patientID;
    $professionalID = $user->professional?->professionalID;

    return $this->repo->findForUser($userID, $patientID, $professionalID);
}


    public function getPatientIDFromUser(int $userID): ?int
{
    $patient = Patient::where('userID', $userID)->first();
    return $patient?->patientID;
}


    public function getProfessionalIDFromUser(int $userID): ?int
{
    $prof = Professional::where('userID', $userID)->first();
    return $prof?->professionalID;
}



}
