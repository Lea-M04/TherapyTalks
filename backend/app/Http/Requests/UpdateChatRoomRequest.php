<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateChatRoomRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'professionalID' => 'sometimes|nullable|exists:professionals,professionalID',
            'patientID' => 'sometimes|nullable|exists:patients,patientID',
        ];
    }
}
