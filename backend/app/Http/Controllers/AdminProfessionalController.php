<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Application\Services\ProfessionalService;
use Illuminate\Support\Facades\Auth;
use App\Models\AdminPanel;

class AdminProfessionalController extends Controller
{
    protected ProfessionalService $professionalService;

    public function __construct(ProfessionalService $service)
    {
        $this->professionalService = $service;
    }

    private function checkPermission(string $permission)
    {
        $admin = AdminPanel::where('userID', Auth::id())->first();

        if (!$admin) {
            return response()->json(['error' => 'Unauthorized. Not an admin.'], 403);
        }

        $permissions = json_decode($admin->permissions, true) ?? [];

        if (!in_array($permission, $permissions)) {
            return response()->json(['error' => 'Permission denied'], 403);
        }

        return true;
    }

    public function pending()
    {
        $auth = $this->checkPermission('view_pending_professionals');
        if ($auth !== true) return $auth;

        $pending = User::where('role', 'professional')
            ->where('status', 'pending_professional')
            ->get();

        return response()->json($pending);
    }

    public function approve($userID)
    {
        $auth = $this->checkPermission('approve_professionals');
        if ($auth !== true) return $auth;

        $user = User::findOrFail($userID);

        $user->status = 'approved_professional';
        $user->save();

        $this->professionalService->createForUser($user->userID);

        return response()->json(['message' => 'Professional approved successfully']);
    }

    public function reject($userID)
    {
        $auth = $this->checkPermission('approve_professionals');
        if ($auth !== true) return $auth;

        $user = User::findOrFail($userID);

        $user->status = 'rejected_professional';
        $user->save();

        return response()->json(['message' => 'Professional rejected']);
    }
}
