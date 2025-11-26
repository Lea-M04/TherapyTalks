<?php

namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;

class UpdateAvailabilityRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }


     public function rules(): array
    {
        return [
            'dayOfWeek' => 'sometimes|in:Mon,Tue,Wed,Thu,Fri,Sat,Sun',
            'startTime' => 'sometimes|date_format:H:i',
            'endTime' => 'sometimes|date_format:H:i|after:startTime',
            'isAvailable' => 'sometimes|boolean',
        ];
    }

}