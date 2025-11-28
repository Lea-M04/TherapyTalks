<?php

namespace App\Http\Controllers;

use App\Application\Services\NotificationSettingService;
use App\Http\Requests\CreateNotificationSettingRequest;
use App\Http\Requests\UpdateNotificationSettingRequest;
use App\Http\Resources\NotificationSettingResource;
use App\Models\NotificationSetting;

class NotificationSettingController extends Controller
{
    public function __construct(private NotificationSettingService $service) {}

    public function show(int $userID)
    {
        $setting = $this->service->getForUser($userID);
        if (!$setting) {
            return response()->json(['message'=>'Not found'], 404);
        }

        $this->authorize('view', NotificationSetting::find($setting->settingsID));

        return new NotificationSettingResource($setting);
    }

    public function store(CreateNotificationSettingRequest $request)
    {
        if ($request->userID !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $this->authorize('create', NotificationSetting::class);

        $s = $this->service->create($request->validated());

        return (new NotificationSettingResource($s))
            ->response()
            ->setStatusCode(201);
    }

    public function update(UpdateNotificationSettingRequest $request, int $id)
    {
        $setting = NotificationSetting::find($id);
        if (!$setting) {
            return response()->json(['message'=>'Not found'],404);
        }

        $this->authorize('update', $setting);

        $s = $this->service->update($id, $request->validated());

        return new NotificationSettingResource($s);
    }
}
