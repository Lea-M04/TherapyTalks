<?php

namespace App\Domain\Models;
use App\Domain\ValueObjects\Email;
class User
{
    public ?int $userID;
    public string $firstName;
    public string $lastName;
    public ?string $phoneNumber;
    public Email $email;
    public ?string $dateOfBirth;
    public ?string $gender;
    public string $role;
    public string $status;
    public ?string $profileImage;
    public string $username;
    public string $password;
    public ?string $created_at;
    public ?string $updated_at;

    public function __construct(array $data = [])
    {
        $this->userID = isset($data['userID']) ? (int) $data['userID'] : null;
        $this->firstName = $data['firstName'] ?? '';
        $this->lastName = $data['lastName'] ?? '';
        $this->phoneNumber = $data['phoneNumber'] ?? null;
        $this->email =
        $data['email'] instanceof Email
            ? $data['email']
            : new Email($data['email']);
        $this->dateOfBirth = $data['dateOfBirth'] ?? null;
        $this->gender = $data['gender'] ?? null;
        $this->role = $data['role'] ?? 'patient';
        $this->status = $data['status'] ?? 'active';
        $this->profileImage = $data['profileImage'] ?? null;
        $this->username = $data['username'] ?? '';
        $this->password = $data['password'] ?? '';
        $this->created_at = $data['created_at'] ?? null;
        $this->updated_at = $data['updated_at'] ?? null;
    }

    public function toArray(): array
    {
        return [
            'userID' => $this->userID,
            'firstName' => $this->firstName,
            'lastName' => $this->lastName,
            'phoneNumber' => $this->phoneNumber,
            'email' => (string) $this->email,
            'dateOfBirth' => $this->dateOfBirth,
            'gender' => $this->gender,
            'role' => $this->role,
            'status' => $this->status,
            'profileImage' => $this->profileImage,
            'username' => $this->username,
            'password' => $this->password,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
