<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateConsentRecordRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'consentType' => 'required|in:treatment,data_share,communication',
            'description' => 'nullable|string',
            'signedAt' => 'required|date',
            'isRevoked' => 'boolean',
            'revokedAt' => 'nullable|date',
            'patientID' => 'nullable|integer|exists:patients,patientID',
            'professionalID' => 'required|exists:professionals,professionalID',
        ];
    }
}
