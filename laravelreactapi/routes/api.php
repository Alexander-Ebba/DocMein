<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\DoctorAvailabilityController;
use App\Http\Controllers\API\EventController;
use App\Http\Controllers\API\PatientController;


Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::get('/events', [EventController::class, 'index']);
Route::post('/events/store', [EventController::class, 'store']);
Route::put('/events/update/{id}', [EventController::class, 'update']);
Route::delete('/events/delete/{id}', [EventController::class, 'destroy']);
Route::post('/api/doctor/create-recurring-events', [DoctorAvailabilityController::class, 'createRecurringEvents']);
Route::post('store_patient', [PatientController::class, 'store']);
Route::get('/view_patient', [PatientController::class, 'index']);
Route::get('/edit_patient/{id}', [PatientController::class, 'edit']);
Route::put('/update_patient/{id}', [PatientController::class, 'update']);
Route::delete('/delete_patient/{id}', [PatientController::class, 'destroy']);


    
Route::middleware('auth:sanctum', 'isAPIDoctor')->group(function() {

    Route::get('/checkingAuthenticated', function() {
        return response()->json(['message'=>'You are in', 'status'=>200], 200);
    });

    Route::post('/doctor/availability', [DoctorAvailabilityController::class, 'store']);
    Route::get('/doctor/view-availability', [DoctorAvailabilityController::class, 'index']);
    Route::get('/doctor/EditAvailability/{id}', [DoctorAvailabilityController::class, 'edit']);
    Route::put('/doctor/updateAvailability/{id}', [DoctorAvailabilityController::class, 'update']);
    Route::delete('/doctor/DeleteAvailability/{id}', [DoctorAvailabilityController::class, 'destroy']);
    
});

Route::middleware(['auth:sanctum', 'isAPIAssisstant'])->group(function () {

    Route::get('/checkingAuthenticatedd', function() {
        return response()->json(['message'=>'You are in', 'status'=>200], 200);
    });

    Route::get('/doctor/availability-by-day/{day}', [DoctorAvailabilityController::class, 'getAvailabilityByDay']);

});


Route::middleware('auth:sanctum')->group(function() {

    Route::post('logout', [AuthController::class, 'logout']);
    
});

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


