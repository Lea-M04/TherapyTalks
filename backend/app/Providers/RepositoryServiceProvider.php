<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Domain\Interfaces\UserRepositoryInterface;
use Infrastructure\Persistence\Eloquent\EloquentUserRepository;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(UserRepositoryInterface::class, EloquentUserRepository::class);
    }
}
