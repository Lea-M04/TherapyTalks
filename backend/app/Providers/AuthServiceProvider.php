<?php
namespace App\Providers;

use App\Domain\Models\User;
use App\Policies\UserPolicy;
use App\Domain\Models\Patient;
use App\Policies\PatientPolicy;
use App\Domain\Models\Professional;
use App\Policies\ProfessionalPolicy;
use App\Domain\Models\AuditLog;
use App\Policies\AuditLogPolicy;
use App\Domain\Models\ConsentRecord;
use App\Policies\ConsentRecordPolicy;
use App\Domain\Models\Availability;
use App\Policies\AvailabilityPolicy;
use App\Domain\Models\ChatRoom;
use App\Policies\ChatRoomPolicy;
use App\Domain\Models\Service;
use App\Policies\ServicePolicy;
use App\Domain\Models\VerificationRequest;
use App\Policies\VerificationRequestPolicy;
use App\Domain\Models\Message;
use App\Policies\MessagePolicy;
use App\Domain\Models\ConsentHistory;
use App\Policies\ConsentHistoryPolicy;
use App\Domain\Models\RejectReason;
use App\Policies\RejectReasonPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        User::class => UserPolicy::class,
        Patient::class => PatientPolicy::class,
        Professional::class => ProfessionalPolicy::class,
        AuditLog::class => AuditLogPolicy::class,
        ConsentRecord::class => ConsentRecordPolicy::class,
        Availability::class => AvailabilityPolicy::class,
        ChatRoom::class => ChatRoomPolicy::class,
        Service::class => ServicePolicy::class,
        VerificationRequest::class => VerificationRequestPolicy::class,
        Message::class => MessagePolicy::class,
        ConsentHistory::class => ConsentHistoryPolicy::class,
        RejectReason::class => RejectReasonPolicy::class,

    ];

    public function boot(): void
    {
        $this->registerPolicies();
    }
}
