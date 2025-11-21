<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Domain\Interfaces\UserRepositoryInterface;
use App\Infrastructure\Persistence\Eloquent\EloquentUserRepository;
use App\Domain\Interfaces\PatientRepositoryInterface;
use App\Infrastructure\Persistence\Eloquent\EloquentPatientRepository;
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
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
