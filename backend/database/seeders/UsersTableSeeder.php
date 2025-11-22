<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UsersTableSeeder extends Seeder
{
    public function run(): void
    {
        // SUPER ADMIN
        $superAdmin = User::create([
            'firstName' => 'System',
            'lastName' => 'Owner',
            'email' => 'superadmin@example.com',
            'username' => 'superadmin',
            'password' => Hash::make('SuperAdmin123!'),
            'role' => 'admin',
        ]);

        // MODERATOR
        $moderator = User::create([
            'firstName' => 'Main',
            'lastName' => 'Moderator',
            'email' => 'moderator@example.com',
            'username' => 'moderator',
            'password' => Hash::make('Moderator123!'),
            'role' => 'admin',
        ]);

        // AUDITOR
        $auditor = User::create([
            'firstName' => 'System',
            'lastName' => 'Auditor',
            'email' => 'auditor@example.com',
            'username' => 'auditor',
            'password' => Hash::make('Auditor123!'),
            'role' => 'admin',
        ]);
    }
}
