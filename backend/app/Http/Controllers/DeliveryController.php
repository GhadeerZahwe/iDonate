<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Models\DeliveryInfo;
use App\Models\DonorInfo;
use App\Models\OrderItem;
use App\Models\Location;
use App\Models\User;
use App\Models\Order;
use Illuminate\Http\Request;

class DeliveryController extends Controller
{
   public function acceptOrder(Request $request, $orderId){
    try{
     
     $delivery=Auth::user;
     if($delivery->user_type !== 'delivery'){
        return response()->json(['error'=>'Permission Denied.'],403);
     }

     $order= Order::where('id',$orderId)
     ->where('status','pending')
     ->whereNull('delivery_id')
     ->with('orderItems')
     ->first();

     if(!$order){
        return response()->json(['error'=>'Order not found or already assigned.'],404);
     }

    }catch(\Exception $e){
        return response()->json(['error'=> $e->getMessage()],500);
    }
   }

}
