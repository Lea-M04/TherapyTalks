<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class AdminPanelSeeder extends Seeder
{
    public function run(): void
    {
        $superAdmin = User::where('email', 'superadmin@example.com')->first();
        $moderator = User::where('email', 'moderator@example.com')->first();
        $auditor = User::where('email', 'auditor@example.com')->first();

        DB::table('admin_panel')->insert([
            [
                'userID' => $superAdmin->userID,
                'role' => 'super_admin',
                'permissions' => json_encode(['*']),
            ],
            [
                'userID' => $moderator->userID,
                'role' => 'moderator',
                'permissions' => json_encode([
                    'manage_users',
                    'approve_professionals',
                    'view_logs'
                ]),
            ],
            [
                'userID' => $auditor->userID,
                'role' => 'auditor',
                'permissions' => json_encode([
                    'view_logs',
                    'view_users'
                ]),
            ]
        ]);
    }
}
