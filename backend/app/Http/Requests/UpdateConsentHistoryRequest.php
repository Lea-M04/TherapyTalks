<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateConsentHistoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'previousValue' => 'sometimes|nullable|string',
            'newValue' => 'sometimes|required|string',
            'changedAt' => 'sometimes|required|date',
            'changedBy' => 'sometimes|required|exists:users,userID',
        ];
    }
}
