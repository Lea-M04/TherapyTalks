<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateNotificationSettingRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'userID' => 'required|exists:users,userID',
            'emailNotifications' => 'boolean',
            'pushNotifications' => 'boolean'
        ];
    }
}
