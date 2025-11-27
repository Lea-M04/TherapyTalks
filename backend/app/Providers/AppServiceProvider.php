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
use App\Domain\Interfaces\AvailabilityRepositoryInterface;
use App\Infrastructure\Persistence\Eloquent\EloquentAvailabilityRepository;
use App\Domain\Interfaces\ChatRoomRepositoryInterface;
use App\Infrastructure\Persistence\Eloquent\EloquentChatRoomRepository;
use App\Domain\Interfaces\ServiceRepositoryInterface;
use App\Infrastructure\Persistence\Eloquent\EloquentServiceRepository;
use App\Domain\Interfaces\VerificationRequestRepositoryInterface;
use App\Infrastructure\Persistence\Eloquent\EloquentVerificationRequestRepository;
use App\Domain\Interfaces\MessageRepositoryInterface;
use App\Infrastructure\Persistence\Eloquent\EloquentMessageRepository;
use App\Domain\Interfaces\ConsentHistoryRepositoryInterface;
use App\Infrastructure\Persistence\Eloquent\EloquentConsentHistoryRepository;
use App\Domain\Interfaces\RejectReasonRepositoryInterface;
use App\Infrastructure\Persistence\Eloquent\EloquentRejectReasonRepository;use App\Domain\Interfaces\DiagnosisRepositoryInterface;
use App\Infrastructure\Persistence\Eloquent\EloquentDiagnosisRepository;



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

    $this->app->bind(
    AvailabilityRepositoryInterface::class,
    EloquentAvailabilityRepository::class
);

$this->app->bind(
    ChatRoomRepositoryInterface::class,
    EloquentChatRoomRepository::class
);



     $this->app->bind(
    ServiceRepositoryInterface::class,
    EloquentServiceRepository::class
);


        
     $this->app->bind(
    VerificationRequestRepositoryInterface::class,
    EloquentVerificationRequestRepository::class
);

 $this->app->bind(
    MessageRepositoryInterface::class,
    EloquentMessageRepository::class
);
$this->app->bind(
    ConsentHistoryRepositoryInterface::class,
    EloquentConsentHistoryRepository::class
);

     $this->app->bind(
    RejectReasonRepositoryInterface::class,
    EloquentRejectReasonRepository::class
);

$this->app->bind(
    DiagnosisRepositoryInterface::class,
    EloquentDiagnosisRepository::class
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
