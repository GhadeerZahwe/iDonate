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
Route::post('/adminLogin', [AuthController::class, "adminLogin"]);
Route::post('/logout', [AuthController::class, "logout"]);
Route::post('/refresh', [AuthController::class, "refresh"]);


Route::group(['middleware'=>'idonate_authenticate'],function(){

   Route::group(['middleware'=>'admin_authorize'],function(){
    Route::get('/getAllDonors', [AdminController::class, "getAllDonors"]);
    Route::get('/getAllDeliveries', [AdminController::class, "getAllDeliveries"]);
    Route::post('/acceptDelivery/{deliveryId}',[AdminController::class,"acceptDelivery"]);
    Route::post('/cancelDeliveryAcceptance/{deliveryId}',[AdminController::class,"cancelDeliveryAcceptance"]);
    Route::delete('/deleteDelivery/{id}',[AdminController::class,"deleteDelivery"]);
    Route::delete('/deleteDonor/{id}',[AdminController::class,"deleteDonor"]);
   });
    
   Route::group(['middleware'=>'donor_authorize'],function(){
    Route::get('/getFullName', [DonorController::class, "getFullName"]);
    Route::get('/getDonorDonations', [DonorController::class, "getDonorDonations"]);
    Route::get('/getDonorLocation/{donor_id}', [DonorController::class, "getDonorLocation"]);
    Route::post('/addDonation', [DonorController::class, "addDonation"]);
    Route::post('/editDonation/{orderId}',[DonorController::class, "editDonation"]);
    Route::delete('/cancelDonation/{orderId}',[DonorController::class, "cancelDonation"]);
   });
    
   Route::group(['middleware'=>'delivery_authorize'],function(){
      Route::get('/getFullName', [DeliveryController::class, "getFullName"]);
      Route::post('/acceptOrder/{orderId}',[DeliveryController::class,"acceptOrder"]);
      Route::post('/cancelOrder/{orderId}',[DeliveryController::class,"cancelOrder"]);
      Route::post('/updateOrderStatus/{orderId}', [DeliveryController::class, "updateOrderStatus"]);
      Route::post('/returnToOnTheWay/{orderId}', [DeliveryController::class, "returnToOnTheWay"]);
      Route::get('/getPendingOrders', [DeliveryController::class, "getPendingOrders"]);
      Route::get('/getOnTheWayOrders', [DeliveryController::class, "getOnTheWayOrders"]);
      Route::get('/getCompletedOrders', [DeliveryController::class, "getCompletedOrders"]);
   });
    


});