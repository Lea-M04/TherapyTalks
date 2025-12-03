<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\ProfessionalController;
use App\Http\Controllers\AdminProfessionalController;
use App\Http\Controllers\ConsentRecordController;
use App\Http\Controllers\AuditLogController;
use App\Http\Controllers\AvailabilityController;
use App\Http\Controllers\ChatRoomController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\VerificationRequestController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ConsentHistoryController;
use App\Http\Controllers\RejectReasonController;
use App\Http\Controllers\DiagnosisController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\NotificationSettingController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\VirtualRoomController;

Route::post('/register', [AuthController::class, 'register'])->name('register');;
Route::post('/login', [AuthController::class, 'login'])->name('login');;
Route::get('/professionals', [ProfessionalController::class, 'index']);
Route::get('/professionals/{id}', [ProfessionalController::class, 'show']);

Route::middleware('auth:api')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);

    Route::post('/users', [UserController::class, 'store']); //store->create user
    Route::put('/users/{id}', [UserController::class, 'update']); //update-> me perditesu
    Route::get('/users', [UserController::class, 'index']);// index->nje liste te users
    Route::get('/users/{id}', [UserController::class, 'show']);  //show-> nje user te caktum
    Route::delete('/users/{id}', [UserController::class, 'destroy']); //destroy->me fshi

    Route::post('/patients', [PatientController::class, 'store']); 
    Route::put('/patients/{id}', [PatientController::class, 'update']);
    Route::get('/patients', [PatientController::class, 'index']);
    Route::get('/patients/{id}', [PatientController::class, 'show']);
    Route::delete('/patients/{id}', [PatientController::class, 'destroy']);

    Route::post('/professionals', [ProfessionalController::class, 'store']);
    Route::put('/professionals/{id}', [ProfessionalController::class, 'update']);
    Route::delete('/professionals/{id}', [ProfessionalController::class, 'destroy']);

    Route::post('/consent_record', [ConsentRecordController::class, 'store']);
    Route::put('/consent_record/{id}', [ConsentRecordController::class, 'update']);
    Route::get('/consent_record', [ConsentRecordController::class, 'index']);
    Route::get('/consent_record/{id}', [ConsentRecordController::class, 'show']);
    Route::delete('/consent_record/{id}', [ConsentRecordController::class, 'destroy']);
    
    Route::get('/audit_logs', [AuditLogController::class, 'index']);

    Route::get('/availability/{professionalID}', [AvailabilityController::class, 'index']);
    Route::get('/availability/{id}', [AvailabilityController::class, 'show']);
    Route::post('/availability', [AvailabilityController::class, 'store']);
    Route::put('/availability/{id}', [AvailabilityController::class, 'update']);
    Route::delete('/availability/{id}', [AvailabilityController::class, 'destroy']);

    Route::post('/chat_rooms', [ChatRoomController::class, 'store']);
    Route::put('/chat_rooms/{id}', [ChatRoomController::class, 'update']);
    Route::get('/chat_rooms', [ChatRoomController::class, 'index']);
    Route::get('/chat_rooms/{id}', [ChatRoomController::class, 'show']);
    Route::delete('/chat_rooms/{id}', [ChatRoomController::class, 'destroy']);

    Route::get('/professionals/{id}/services', [ServiceController::class, 'index']);
    Route::get('/services', [ServiceController::class, 'index']);
    Route::get('/services/{id}', [ServiceController::class, 'show']);
    Route::post('/services', [ServiceController::class, 'store']);
    Route::put('/services/{id}', [ServiceController::class, 'update']);
    Route::delete('/services/{id}', [ServiceController::class, 'destroy']);

    Route::get('/verification', [VerificationRequestController::class, 'index']); 
    Route::get('/verification/pending', [VerificationRequestController::class, 'pending']);
    Route::post('/verification/submit', [VerificationRequestController::class, 'submit']);
    Route::post('/verification/{id}/approve', [VerificationRequestController::class, 'approve']);
    Route::post('/verification/{id}/reject', [VerificationRequestController::class, 'reject']);
    Route::post('/verification/{id}/resubmit', [VerificationRequestController::class, 'resubmit']);
    Route::get('/verification/my', [VerificationRequestController::class, 'myRequests']);

    Route::get('/chat_rooms/{chatRoomID}/messages', [MessageController::class, 'indexByChatRoom']);
    Route::post('/chat_rooms/{chatRoomID}/messages', [MessageController::class, 'store']);
    Route::get('/messages', [MessageController::class, 'myMessages']); 
    Route::get('/messages/{id}', [MessageController::class, 'show']);
    Route::put('/messages/{id}', [MessageController::class, 'update']);
    Route::patch('/messages/{id}/read', [MessageController::class, 'markRead']);
    Route::delete('/messages/{id}', [MessageController::class, 'destroy']);


    Route::get('/consent_history', [ConsentHistoryController::class, 'index']);
    Route::get('/consent_history/{id}', [ConsentHistoryController::class, 'show']);

    Route::get('/reject_reasons', [RejectReasonController::class, 'index']);
    Route::get('/reject_reasons/{id}', [RejectReasonController::class, 'show']);
    Route::delete('/reject_reasons/{id}', [RejectReasonController::class, 'destroy']);

    Route::get('/diagnosis', [DiagnosisController::class, 'index']);
    Route::get('/diagnosis/patient/{patientID}', [DiagnosisController::class, 'listByPatient']);
    Route::get('/diagnosis/{id}', [DiagnosisController::class, 'show']);
    Route::post('/diagnosis', [DiagnosisController::class, 'store']);
    Route::put('/diagnosis/{id}', [DiagnosisController::class, 'update']);
    Route::delete('/diagnosis/{id}', [DiagnosisController::class, 'destroy']);


    Route::get('/notifications', [NotificationController::class,'index']);
    Route::get('/notifications/{id}', [NotificationController::class,'show']);
    Route::patch('/notifications/{id}/read', [NotificationController::class,'markRead']);
    Route::delete('/notifications/{id}', [NotificationController::class,'destroy']);


    Route::get('/notification_settings/{userID}', [NotificationSettingController::class, 'show']);
    Route::post('/notification_settings', [NotificationSettingController::class, 'store']);
    Route::put('/notification_settings/{id}', [NotificationSettingController::class, 'update']);

    Route::get('/booking', [BookingController::class, 'index']);
    Route::get('/booking/{id}', [BookingController::class, 'show']);
    Route::post('/booking', [BookingController::class, 'store']);
    Route::put('/booking/{id}', [BookingController::class, 'update']);
    Route::delete('/booking/{id}', [BookingController::class, 'destroy']);

    Route::post('/payments/booking/{bookingID}', [PaymentController::class, 'createFromBooking']);
    Route::post('/payments/stripe-intent', [PaymentController::class, 'createIntent']);
    Route::post('/payments/confirm', [PaymentController::class, 'confirmStripe']);
    Route::get('/payments', [PaymentController::class, 'index']);
    Route::get('/payments/my', [PaymentController::class, 'myPayments']);


    Route::post('/booking/{bookingID}/virtual-room', [VirtualRoomController::class, 'store']);
    Route::get('/booking/{bookingID}/virtual-room', [VirtualRoomController::class, 'show']);

});
