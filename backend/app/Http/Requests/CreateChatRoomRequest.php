<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateChatRoomRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'createdBy' => 'required|exists:users,userID',
            'professionalID' => 'nullable|exists:professionals,professionalID',
            'patientID' => 'nullable|exists:patients,patientID',
        ];
    }
}
