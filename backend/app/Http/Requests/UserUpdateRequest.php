<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserUpdateRequest extends FormRequest
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
            'email' => 'sometimes|email|unique:users,email,' . $this->route('id') . ',userID',
            'dateOfBirth'   => 'sometimes|nullable|date',
            'gender'        => 'sometimes|nullable|in:male,female,other',
            'role'          => 'sometimes|in:patient,professional,admin',
            'status'        => 'sometimes|in:active,inactive,banned',
           'profileImage' => 'sometimes|nullable|image|mimes:jpg,jpeg,png|max:2048',
            'username'      => 'sometimes|string|unique:users,username,' . $this->route('id') . ',userID',
            'password'      => 'sometimes|string|min:6',
        ];
    }
}
