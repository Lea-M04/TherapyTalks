<?php
namespace App\Application\DTOs;

class UpdateUserDTO
{
    public int $userID;
    public ?string $firstName;
    public ?string $lastName;
    public ?string $email;
    public ?string $username;
    public ?string $password;
    public ?string $phoneNumber;
    public ?string $dateOfBirth;
    public ?string $gender;
    public ?string $role;
    public ?string $profileImage;
    public ?string $status;

    public function __construct(
        int $userID,
        ?string $firstName = null,
        ?string $lastName = null,
        ?string $email = null,
        ?string $username = null,
        ?string $password = null,
        ?string $phoneNumber = null,
        ?string $dateOfBirth = null,
        ?string $gender = null,
        ?string $role = null,
        ?string $profileImage = null,
        ?string $status = null
    ) {
        $this->userID       = $userID;
        $this->firstName    = $firstName;
        $this->lastName     = $lastName;
        $this->email        = $email;
        $this->username     = $username;
        $this->password     = $password;
        $this->phoneNumber  = $phoneNumber;
        $this->dateOfBirth  = $dateOfBirth;
        $this->gender       = $gender;
        $this->role         = $role;
        $this->profileImage = $profileImage;
        $this->status       = $status;
    }
}
