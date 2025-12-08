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
            'patientID' => 'required|exists:patients,patientID',
            'professionalID' => 'required|exists:professionals,professionalID',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'securityLevel' => 'nullable|in:normal,sensitive,private',
        ];
    }
}
