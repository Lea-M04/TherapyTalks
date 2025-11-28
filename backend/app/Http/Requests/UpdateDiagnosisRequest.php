<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDiagnosisRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'patientID' => 'sometimes|exists:users,userID',
            'professionalID' => 'sometimes|exists:users,userID',
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|nullable|string',
            'securityLevel' => 'sometimes|in:low,normal,high',
        ];
    }
}
