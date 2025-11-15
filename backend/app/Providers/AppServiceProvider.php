<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Infrastructure\Persistence\Repositories\UserRepository;
use Infrastructure\Persistence\Eloquent\EloquentUserRepository;
class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register()
    {
          $this->app->bind(UserRepository::class, EloquentUserRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
