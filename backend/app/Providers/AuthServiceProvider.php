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
    ];

    public function boot(): void
    {
        $this->registerPolicies();
    }
}
