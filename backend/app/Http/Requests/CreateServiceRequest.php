<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateServiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'professionalID' => 'required|exists:professionals,professionalID',
            'serviceName' => 'required|string|max:255',
            'description' => 'nullable|string',
            'durationMinutes' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'category' => 'nullable|string',
            'isActive' => 'boolean',
        ];
    }
}
