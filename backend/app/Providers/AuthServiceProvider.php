<?php
namespace App\Providers;

use App\Domain\Models\User;
use App\Policies\UserPolicy;
use App\Domain\Models\Patient;
use App\Policies\PatientPolicy;
use App\Domain\Models\Professional;
use App\Policies\ProfessionalPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        User::class => UserPolicy::class,
        Patient::class => PatientPolicy::class,
        Professional::class => ProfessionalPolicy::class,
    ];

    public function boot(): void
    {
        $this->registerPolicies();
    }
}
