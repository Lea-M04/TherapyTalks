<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateServiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'serviceName' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'durationMinutes' => 'nullable|string',
            'price' => 'sometimes|numeric|min:0',
            'category' => 'nullable|string',
            'isActive' => 'boolean',
        ];
    }
}
