<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SubmitVerificationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'professionalID' => 'required|exists:professionals,professionalID',
            'documentType' => 'required|in:id_card,license,certificate',
            'document' => 'required|file|mimes:jpg,png,pdf|max:5120',
        ];
    }
}
