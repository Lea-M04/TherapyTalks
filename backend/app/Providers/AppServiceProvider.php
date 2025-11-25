<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Domain\Interfaces\UserRepositoryInterface;
use App\Infrastructure\Persistence\Eloquent\EloquentUserRepository;
use App\Domain\Interfaces\PatientRepositoryInterface;
use App\Infrastructure\Persistence\Eloquent\EloquentPatientRepository;
use App\Domain\Interfaces\ProfessionalRepositoryInterface;
use App\Infrastructure\Persistence\Eloquent\EloquentProfessionalRepository;
use App\Domain\Interfaces\AuditLogRepositoryInterface;
use App\Infrastructure\Persistence\Eloquent\EloquentAuditLogRepository;
use App\Domain\Interfaces\ConsentRecordRepositoryInterface;
use App\Infrastructure\Persistence\Eloquent\EloquentConsentRecordRepository;



class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register()
    {
          $this->app->bind(
    \App\Domain\Interfaces\UserRepositoryInterface::class,
    \App\Infrastructure\Persistence\Eloquent\EloquentUserRepository::class
);
        $this->app->bind(
            PatientRepositoryInterface::class,
            EloquentPatientRepository::class
        );


        $this->app->bind(
            ProfessionalRepositoryInterface::class,
            EloquentProfessionalRepository::class
);
         $this->app->bind(
            AuditLogRepositoryInterface::class,
            EloquentAuditLogRepository::class
        );

$this->app->bind(
    ConsentRecordRepositoryInterface::class,
    EloquentConsentRecordRepository::class
);

    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
