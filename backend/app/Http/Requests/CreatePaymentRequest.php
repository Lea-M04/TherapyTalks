<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreatePaymentRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'bookingID' => 'required|integer|exists:bookings,bookingID',
            'amount' => 'required|numeric|min:1',
        ];
    }
}
