<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateDiagnosisRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'patientID' => 'required|exists:users,userID',
            'professionalID' => 'required|exists:users,userID',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'securityLevel' => 'nullable|in:low,normal,high',
        ];
    }
}
