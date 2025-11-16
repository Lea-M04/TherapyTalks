<?php
namespace App\Application\DTOs;

class CreateUserDTO
{
    public string $firstName;
    public string $lastName;
    public string $email;
    public string $username;
    public string $password;
    public ?string $phoneNumber;
    public ?string $dateOfBirth;
    public ?string $gender;
    public string $role;
    public ?string $profileImage;
    public string $status;

    public function __construct(
        string $firstName,
        string $lastName,
        string $email,
        string $username,
        string $password,
        ?string $phoneNumber = null,
        ?string $dateOfBirth = null,
        ?string $gender = null,
        ?string $role = null,
        ?string $profileImage = null,
        ?string $status = null
    ) {
        $this->firstName    = $firstName;
        $this->lastName     = $lastName;
        $this->email        = $email;
        $this->username     = $username;
        $this->password     = $password;
        $this->phoneNumber  = $phoneNumber;
        $this->dateOfBirth  = $dateOfBirth;
        $this->gender       = $gender;
        $this->role         = $role ?? 'patient';
        $this->profileImage = $profileImage;
        $this->status       = $status ?? 'active';
    }
}
