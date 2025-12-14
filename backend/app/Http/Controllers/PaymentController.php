<?php
namespace App\Http\Controllers;

use App\Application\Services\PaymentService;
use App\Http\Resources\PaymentResource;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Stripe\Stripe;
use Stripe\PaymentIntent;
use App\Models\Payment;

class PaymentController extends Controller
{
    private PaymentService $service;

    public function __construct(PaymentService $service)
    {
        $this->service = $service;
    }

    public function createFromBooking(int $bookingID)
    {
        $payment = $this->service->createForBooking($bookingID);
        return new PaymentResource($payment);
    }

    public function createIntent(Request $request)
    {
        Stripe::setApiKey(config('services.stripe.secret'));

        $intent = PaymentIntent::create([
            'amount' => $request->amount * 100,
            'currency' => 'eur',
            'metadata' => [
                'paymentID' => $request->paymentID,
                'bookingID' => $request->bookingID,
            ],
        ]);

        return response()->json([
            'clientSecret' => $intent->client_secret
        ]);
    }

    public function confirmStripe(Request $req)
    {
        $paymentID = $req->input('paymentID');
        $transactionID = $req->input('transactionID');

        $updated = $this->service->markPaid($paymentID, $transactionID);

        return new PaymentResource($updated);
    }

   public function index()
{
    $this->authorize('viewAny', \App\Models\Payment::class);

    $payments = collect($this->service->getAll());

    return PaymentResource::collection($payments);
}

    public function myPayments(Request $request)
    {
        return PaymentResource::collection(
            $this->service->getForPatient($request->user()->patient->patientID)
        );
    }

}
