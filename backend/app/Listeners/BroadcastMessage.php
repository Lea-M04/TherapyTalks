<?php

namespace App\Listeners;

use App\Events\MessageSent;
use Illuminate\Contracts\Queue\ShouldQueue;

class BroadcastMessage implements ShouldQueue
{
    public function handle(MessageSent $event)
    {

    }
}
