<?php

namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;

class CreatePatientRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
        {
            return [
            'userID' => 'required|exists:users,userID',
            'medicalHistory' => 'nullable|string',
            'allergies' => 'nullable|string',
            'emergencyContactName' => 'nullable|string|max:255',
            'emergencyContactPhone' => 'nullable|string|max:20',
            'insuranceNumber' => 'nullable|integer',
            'pseudonym' => 'nullable|string|max:255',
        ];
        }
}