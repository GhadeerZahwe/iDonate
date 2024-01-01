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

    }catch(\Exception $e){
        return response()->json(['error'=> $e->getMessage()],500);
    }
   }

}
