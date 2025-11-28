<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateBookingRequest extends FormRequest
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
            'serviceID' => 'required|exists:services,serviceID',
            'appointmentDate' => 'required|date',
            'appointmentTime' => 'required',
            'duration' => 'nullable|string',
            'status' => 'nullable|in:pending,confirmed,canceled,completed',
            'notes' => 'nullable|string',
        ];
    }
}
