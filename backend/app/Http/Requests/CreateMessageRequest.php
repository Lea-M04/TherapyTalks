<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateMessageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; 
    }

    public function rules(): array
    {
        return [

            'content' => 'required_without:attachment|nullable|string',
            'receiverID' => 'required|exists:users,userID',
            'chatRoomID' => 'required|exists:chat_rooms,chatRoomID',
        ];
    }
}
