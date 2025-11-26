<?php

namespace App\Infrastructure\Persistence\Eloquent;

use App\Models\ChatRoom as EloquentChatRoom;
use App\Domain\Models\ChatRoom;
use App\Domain\Interfaces\ChatRoomRepositoryInterface;

class EloquentChatRoomRepository implements ChatRoomRepositoryInterface
{
    private function mapToDomain(EloquentChatRoom $c): ChatRoom
    {
        return new ChatRoom([
            'chatRoomID' => $c->chatRoomID,
            'createdBy' => $c->createdBy,
            'professionalID' => $c->professionalID,
            'patientID' => $c->patientID,
            'created_at' => $c->created_at,
            'updated_at' => $c->updated_at,
        ]);
    }

    public function create(ChatRoom $chatRoom): ChatRoom
    {
        $eloquent = EloquentChatRoom::create([
            'createdBy' => $chatRoom->createdBy,
            'professionalID' => $chatRoom->professionalID,
            'patientID' => $chatRoom->patientID,
        ]);

        return $this->mapToDomain($eloquent);
    }

    public function findById(int $id): ?ChatRoom
    {
        $c = EloquentChatRoom::where('chatRoomID', $id)->first();
        return $c ? $this->mapToDomain($c) : null;
    }

    public function findAll(int $perPage = 15, int $page = 1): array
    {
        $paginator = EloquentChatRoom::paginate($perPage, ['*'], 'page', $page);

        return [
            'data' => $paginator->getCollection()->map(fn($c) => $this->mapToDomain($c))->all(),
            'meta' => [
                'total' => $paginator->total(),
                'per_page' => $paginator->perPage(),
                'current_page' => $paginator->currentPage(),
                'last_page' => $paginator->lastPage(),
            ]
        ];
    }

    public function update(ChatRoom $chatRoom): ChatRoom
    {
        $eloquent = EloquentChatRoom::where('chatRoomID', $chatRoom->chatRoomID)->first();

        $eloquent->update([
            'professionalID' => $chatRoom->professionalID,
            'patientID' => $chatRoom->patientID,
        ]);

        return $this->mapToDomain($eloquent);
    }

    public function delete(int $id): bool
    {
        return (bool)EloquentChatRoom::where('chatRoomID', $id)->delete();
    }

    
   public function findForUser(int $userID, ?int $patientID, ?int $professionalID): array
{
    $query = EloquentChatRoom::query();

    $query->where('createdBy', $userID);

    if ($patientID) {
        $query->orWhere('patientID', $patientID);
    }

    if ($professionalID) {
        $query->orWhere('professionalID', $professionalID);
    }

    $rows = $query->get();

    return $rows->map(fn($c) => $this->mapToDomain($c))->all();
}


}
