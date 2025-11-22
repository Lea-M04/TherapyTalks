<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateProfessionalRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'userID' => 'required|exists:users,userID|unique:professionals,userID',
            'specialization' => 'required|string|max:255',
            'licenseNumber' => 'nullable|string|max:255',
            'experienceYears' => 'nullable|integer|min:0',
            'education' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'clinicName' => 'nullable|string|max:255',
            'clinicStreet' => 'nullable|string|max:255',
            'clinicCity' => 'nullable|string|max:255',
            'isOnline' => 'nullable|boolean',
            // status should not be set by normal user ideally, but if needed:
            'status' => 'sometimes|in:pending,approved,rejected',
        ];
    }
}
