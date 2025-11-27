<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ConsentHistoryResource extends JsonResource
{
    public function toArray($request): array
    {
        $h = $this->resource;

        return [
            'historyID'     => $h->historyID,
            'consentID'     => $h->consentID,
            'previousValue' => $h->previousValue,
            'newValue'      => $h->newValue,
            'changedAt'     => $h->changedAt,
            'changedBy'     => $h->changedBy,
        ];
    }
}
