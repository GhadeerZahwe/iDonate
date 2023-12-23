<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\DonorInfo;
use App\Models\User;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Location;

use Illuminate\Support\Facades\Auth;


class DonorController extends Controller
{
    public function getAllDonors(){
     if(auth()->check()){
       
        $user=Auth::user();

       if($user->user_type==='admin'){
        $donors=User::withTrashed()
        ->where('user_type','donor')
        ->join('donors_info','users.id','=','donors_info.donor_id')
        ->get();

        return response()->json(['donors'=> $donors]);

        } else{
        return response()->json(['error'=>'Permission Denied'],403);
    }        
     } else{
        return response()->json(['error'=>'User not authenticated'],401);
    }  
  } 

    public function getFullName(){
    $user=Auth::user();

    $first_name=$user->first_name;
    $last_name=$user->last_name;

    return response()->json([
        'first_name'=>$first_name,
        'last_name'=>$last_name,
    ]);
}
      

    public function getDonorDonations()
    {
        $donor = Auth::user();

        if ($donor->user_type === 'donor') {
            $donorInfo = DonorInfo::where('donor_id', $donor->id)->first();

            $donations = $donor->donations()
                ->with(['orderItems', 'location'])
                ->get();

            return response()->json(['donor_info' => $donorInfo, 'donations' => $donations]);
        } else {
            return response()->json(['error' => 'Permission Denied'], 403);
        }
    }

    public function addDonation(Request $request)
    {
        $donor = Auth::user();
        
        if ($donor->user_type === 'donor') {
            $request->validate([
                'description' => 'required|string',
                'total_weight' => 'required|numeric',
                'pickup_within' => 'required|string',
                'pickup_time' => 'date',
                'location_pickup' => 'required|string',
                'latitude' => 'required|numeric',
                'longitude' => 'required|numeric',
                'items.*.description' => 'string', 
                'items.*.total_weight' => 'numeric', 
            ]);
    
            $location = new Location([
                'latitude' => $request->input('latitude'),
                'longitude' => $request->input('longitude'),
                'description' => $request->input('location_description'),
            ]);
    
           
            $location->user()->associate($donor); 
            $location->save();
    
            $order = new Order([
                'description' => $request->input('description'),
                'total_weight' => $request->input('total_weight'),
                'pickup_within' => $request->input('pickup_within'),
                'pickup_time' => $request->input('pickup_time'),
                'location_pickup' => $request->input('location_pickup'),
                'location_id' => $location->id, // Set the location_id
            ]);
    
            $donor->donations()->save($order);
    
            if ($request->has('items')) {
                foreach ($request->input('items') as $item) {
                    $orderItem = new OrderItem([
                        'description' => $item['description'],
                        'total_weight' => $item['total_weight'],
                    ]);
    
                    $order->orderItems()->save($orderItem);
                }
            }
    
            return response()->json(['message' => 'Donation added successfully'], 201);
        } else {
            return response()->json(['error' => 'Permission Denied'], 403);
        }
    }
    

   
}
