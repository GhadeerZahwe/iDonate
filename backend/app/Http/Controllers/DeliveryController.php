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

     $totalWeight= $order->total_weight;
     if(($totalWeight>30 && $delivery->mobility_type=== 'motorcycle')||
     ($totalWeight>40 && !in_array($delivery->mobility_type,['car','van']))||
     ($totalWeight>50 && $delivery->mobility_type==='van')){
        return response()->json(['error'=>'Cannot take this order with your current vehicle type.'],400);
     }

     $order->is_approved=true;
     $order->delivery_id=$delivery->id;
     $order->status='on_the_way';
     $order->save();
     
    }catch(\Exception $e){
        return response()->json(['error'=> $e->getMessage()],500);
    }
   }

}
