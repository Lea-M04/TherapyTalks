<?php

namespace App\Casts;

use App\Domain\ValueObjects\Email;
use Illuminate\Contracts\Database\Eloquent\CastsAttributes;

class EmailCast implements CastsAttributes
{
    public function get($model, string $key, $value, array $attributes)
    {
        return new Email($value);
    }

    public function set($model, string $key, $value, array $attributes)
    {
        if ($value instanceof Email) {
            return $value->value();
        }

        return $value;
    }
}
