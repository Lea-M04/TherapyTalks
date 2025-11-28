<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class GenericNotificationMail extends Mailable
{
    use Queueable, SerializesModels;

    public string $title;
    public string $body;

    public function __construct(string $title, string $body)
    {
        $this->title = $title;
        $this->body  = $body;
    }

    public function build()
    {
        return $this->subject($this->title)
                    ->view('emails.generic')
                    ->with([
                        'title' => $this->title,
                        'body'  => $this->body,
                    ]);
    }
}
