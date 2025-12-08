<?php
namespace App\Application\Services;

use App\Domain\Interfaces\PaymentRepositoryInterface;
use App\Domain\Models\Payment as DomainPayment;
use App\Application\Services\AuditLogService;
use App\Models\Booking as EloquentBooking;
use App\Models\Service as EloquentService;
use \App\Application\Services\VirtualRoomService;
use \App\Application\Services\NotificationService;
use \App\Mail\GenericNotificationMail;

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

    $booking = EloquentBooking::find($payment->bookingID);
    

    $room = app(VirtualRoomService::class)
                ->createOrGetRoom($payment->bookingID);

    app(NotificationService::class)->createForUser([
        'title' => 'Virtual Meeting Ready',
        'message' => 'Your meeting link has been created.',
        'type' => 'booking',
        'userID' => $booking->patientID,
        'link' => $room->link,
        'systemBy' => null,
    ]);
    app(NotificationService::class)->createForUser([
        'title' => 'New Virtual Meeting Scheduled',
        'message' => 'A meeting link has been generated.',
        'type' => 'booking',
        'userID' => $booking->professionalID,
        'link' => $room->link,
        'systemBy' => null,
    ]);

    \Mail::to($booking->patient->user->email)->send(
        new GenericNotificationMail(
            "Your Virtual Meeting Link",
            "Click to join: " . $room->link
        )
    );

    \Mail::to($booking->professional->user->email)->send(
        new GenericNotificationMail(
            "New Virtual Meeting Scheduled",
            "Meeting link: " . $room->link
        )
    );

    return $updated;
}

    public function getForPatient(int $patientID)
{
    return $this->repo->getByPatient($patientID);
}

}
