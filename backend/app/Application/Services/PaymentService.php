<?php
namespace App\Application\Services;

use App\Domain\Interfaces\PaymentRepositoryInterface;
use App\Domain\Models\Payment as DomainPayment;
use App\Application\Services\AuditLogService;
use App\Models\Booking as EloquentBooking;
use App\Models\Service as EloquentService;

class PaymentService
{
    private PaymentRepositoryInterface $repo;
    private AuditLogService $audit;

    public function __construct(PaymentRepositoryInterface $repo, AuditLogService $audit)
    {
        $this->repo = $repo;
        $this->audit = $audit;
    }

    public function createForBooking(int $bookingID): DomainPayment
    {
        $booking = EloquentBooking::findOrFail($bookingID);
        $service = EloquentService::findOrFail($booking->serviceID);

        if ($service->price <= 0) {
         throw new \Exception("Cannot create payment: Service price is zero.");
    }

        $payment = new DomainPayment([
            'bookingID' => $bookingID,
            'patientID' => $booking->patientID,
            'amount' => $service->price,
            'status' => 'pending',
        ]);

        $created = $this->repo->create($payment);

        $this->audit->write('payment_created', 'Payment', $created->paymentID, 'success', $booking->patientID);

        return $created;
    }

    public function markPaid(int $paymentID, string $transactionID): DomainPayment
    {
        $payment = $this->repo->findById($paymentID);

        $payment->status = 'paid';
        $payment->transactionID = $transactionID;

        $updated = $this->repo->update($payment);

        $this->audit->write('payment_paid', 'Payment', $updated->paymentID, 'success', $updated->patientID);

        return $updated;
    }
    public function getForPatient(int $patientID)
{
    return $this->repo->getByPatient($patientID);
}

}
