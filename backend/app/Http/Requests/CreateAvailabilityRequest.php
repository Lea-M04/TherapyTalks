<?php

namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;

class CreateAvailabilityRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [
            'professionalID' => 'required|exists:professionals,professionalID',
            'dayOfWeek' => 'required|in:Mon,Tue,Wed,Thu,Fri,Sat,Sun',
            'startTime' => 'required|date_format:H:i',
            'endTime' => 'required|date_format:H:i|after:startTime',
            'isAvailable' => 'sometimes|boolean',
        ];
    }

}