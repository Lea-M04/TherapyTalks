<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateConsentHistoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; 
    }

    public function rules(): array
    {
        return [
            'consentID' => 'required|exists:consent_record,consentID',
            'previousValue' => 'nullable|string',
            'newValue' => 'required|string',
            'changedAt' => 'required|date',
            'changedBy' => 'required|exists:users,userID',
        ];
    }
}
