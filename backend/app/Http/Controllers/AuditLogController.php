<?php

namespace App\Http\Controllers;

use App\Application\Services\AuditLogService;

class AuditLogController extends Controller
{
    private AuditLogService $service;

    public function __construct(AuditLogService $service)
    {
        $this->service = $service;
        $this->middleware('auth:api');
        $this->authorizeResource(\App\Models\AuditLog::class);
    }

    public function index()
    {
        $this->authorize('viewAny', \App\Models\AuditLog::class);

        return response()->json($this->service->view());
    }
}
