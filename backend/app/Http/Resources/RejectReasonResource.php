<?php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RejectReasonResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'reasonID' => $this->reasonID,
            'title' => $this->title,
            'description' => $this->description,
        ];
    }
}
