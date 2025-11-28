<?php

namespace App\Providers;

use App\Events\MessageSent;
use App\Listeners\BroadcastMessage;
use App\Listeners\CreateNotificationFromMessage;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        MessageSent::class => [
        BroadcastMessage::class,
        CreateNotificationFromMessage::class,
        ],
    ];

    public function boot(): void
    {
        //
    }

    public function shouldDiscoverEvents(): bool
    {
        return false;
    }
}
