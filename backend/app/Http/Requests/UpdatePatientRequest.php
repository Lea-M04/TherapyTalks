<?php
namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePatientRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [
        'medicalHistory' => 'sometimes|nullable|string',
        'allergies' => 'sometimes|nullable|string',
        'emergencyContactName' => 'sometimes|nullable|string|max:255',
        'emergencyContactPhone' => 'sometimes|nullable|string|max:20',
        'insuranceNumber' => 'sometimes|nullable|integer',
        'pseudonym' => 'sometimes|nullable|string|max:255',
        ];
    }
}