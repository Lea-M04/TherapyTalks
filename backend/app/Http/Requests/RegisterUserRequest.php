<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'firstName'     => 'required|string|max:255',
            'lastName'      => 'required|string|max:255',
            'phoneNumber'   => 'nullable|string|max:20',
            'email'         => 'required|email|unique:users,email',
            'dateOfBirth'   => 'nullable|date',
            'gender'        => 'nullable|in:male,female,other',
            'role'          => 'nullable|in:patient,professional,admin',
            'status'        => 'nullable|in:active,inactive,banned',
            'profileImage'  => 'nullable|string',
            'username'      => 'required|string|unique:users,username',
            'password'      => 'required|string|min:6',
        ];
    }
}
