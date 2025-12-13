<?php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
class VerificationRequestResource extends JsonResource
{
    public function toArray($r)
    {
        return [
            'requestID' => $this->requestID,
            'professionalID' => $this->professionalID,
            'documentType' => $this->documentType,
            'documentURL' => $this->documentURL,
            'status' => $this->status,
            'submittedAt' => $this->submittedAt,
            'verifiedAt' => $this->verifiedAt,
            'reviewedBy' => $this->reviewedBy,
            'comments' => $this->comments,
            'professional' => new ProfessionalResource(
            $this->whenLoaded('professional')
        ),
            'rejectReasons' => RejectReasonResource::collection(
    $this->whenLoaded('rejectReasons')
),

        ];
    }
}
