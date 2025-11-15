<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'firstName'     => 'sometimes|string|max:255',
            'lastName'      => 'sometimes|string|max:255',
            'phoneNumber'   => 'sometimes|nullable|string|max:20',
            'email'         => 'sometimes|email|unique:users,email,' . $this->userID . ',userID',
            'dateOfBirth'   => 'sometimes|nullable|date',
            'gender'        => 'sometimes|nullable|in:male,female,other',
            'role'          => 'sometimes|in:patient,professional,admin',
            'status'        => 'sometimes|in:active,inactive,banned',
            'profileImage'  => 'sometimes|nullable|string',
            'username'      => 'sometimes|string|unique:users,username,' . $this->userID . ',userID',
            'password'      => 'sometimes|string|min:6',
        ];
    }
}
