<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DonorController;
use App\Http\Controllers\DeliveryController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::post('/register', [AuthController::class, "register"]);
Route::post('/login', [AuthController::class, "login"]);
Route::post('/logout', [AuthController::class, "logout"]);
Route::post('/refresh', [AuthController::class, "refresh"]);


Route::group(['middleware'=>'idonate_authenticate'],function(){

   Route::group(['middleware'=>'admin_authorize'],function(){
    Route::get('/getAllDonors', [AdminController::class, "getAllDonors"]);
    Route::get('/getAllDeliveries', [AdminController::class, "getAllDeliveries"]);
    Route::post('/acceptDelivery/{deliveryId}',[AdminController::class,"acceptDelivery"]);
    Route::post('/cancelDeliveryAcceptance/{deliveryId}',[AdminController::class,"cancelDeliveryAcceptance"]);
   });
    
    Route::get('/getFullName', [DonorController::class, "getFullName"]);
    Route::get('/getDonorDonations', [DonorController::class, "getDonorDonations"]);
    Route::post('/addDonation', [DonorController::class, "addDonation"]);
    Route::post('/editDonation/{orderId}',[DonorController::class, "editDonation"]);
    Route::delete('/cancelDonation/{orderId}',[DonorController::class, "cancelDonation"]);
    


});