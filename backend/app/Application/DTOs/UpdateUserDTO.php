<?php

namespace Application\DTOs;

class UpdateUserDTO
{
    public string $id;
    public string $name;
    public string $email;
    public string $role;

    public function __construct(string $id, string $name, string $email, string $role)
    {
        $this->id    = $id;
        $this->name  = $name;
        $this->email = $email;
        $this->role  = $role;
    }
}
