<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBookingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'appointmentDate' => 'sometimes|date',
            'appointmentTime' => 'sometimes',
            'duration' => 'sometimes|string|nullable',
            'status' => 'sometimes|in:pending,confirmed,canceled,completed',
            'notes' => 'sometimes|string|nullable',
        ];
    }
}
