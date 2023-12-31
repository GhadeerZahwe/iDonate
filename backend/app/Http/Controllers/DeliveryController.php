<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Models\DeliveryInfo;
use App\Models\User;
use App\Models\Order;
use Illuminate\Http\Request;

class DeliveryController extends Controller
{
    public function getDonations(Request $request){
        $user=Auth::user();
        if($user->user_type === 'delivery'){
            try{
              
            }catch(\Exception $e){
                return response()->json(['error' => $e->getMessage()], 500);
            }
        }else{
            return response()->json(['error' => 'Permission Denied'], 403);
        }
    }

    private function getDonationsByStatus($user,$status){
        $donations= Order::where('delivery_id',$user->id)
        ->where('status',$status)
        ->with(['donor','orderItems'])
        ->get();

        $formattedDonations=$donations->map(function($donation){
            return $donation;
        });
        
        return $formattedDonations;
    }
}
