<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProfessionalRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'specialization' => 'sometimes|required|string|max:255',
            'licenseNumber' => 'sometimes|nullable|string|max:255',
            'experienceYears' => 'sometimes|nullable|integer|min:0',
            'education' => 'sometimes|nullable|string|max:255',
            'bio' => 'sometimes|nullable|string',
            'clinicName' => 'sometimes|nullable|string|max:255',
            'clinicStreet' => 'sometimes|nullable|string|max:255',
            'clinicCity' => 'sometimes|nullable|string|max:255',
            'isOnline' => 'sometimes|boolean',
            'status' => 'sometimes|in:pending,approved,rejected', // admin-only in practice
        ];
    }
}
