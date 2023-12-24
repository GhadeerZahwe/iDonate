<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\DonorInfo;
use App\Models\User;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Location;
use Illuminate\Support\Facades\DB;


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
                ->with(['orderItems', 'locations'])
                ->get();

            return response()->json(['donor_info' => $donorInfo, 'donations' => $donations]);
        } else {
            return response()->json(['error' => 'Permission Denied'], 403);
        }
    }

    public function addDonation(Request $request)
    {
        $donor = Auth::user();
    
        if ($donor->user_type !== 'donor') {
            return response()->json(['error' => 'Permission Denied'], 403);
        }
    
        $request->validate([
            'description' => 'required|string',
            'total_weight' => 'required|numeric',
            'pickup_within' => 'required|string',
            'date' =>'required|date',
            'location_pickup' => 'required|string',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'items.*.description' => 'string',
            'items.*.total_weight' => 'numeric',
        ]);
    
        return DB::transaction(function () use ($donor, $request) {
            $location = new Location([
                'user_id' => $donor->id, // Set the donor ID directly
                'latitude' => $request->input('latitude'),
                'longitude' => $request->input('longitude'),
                'description' => $request->input('location_description'),
            ]);
    
            $location->save();
    
            $order = new Order([
                'donor_id' => $donor->id, 
                'description' => $request->input('description'),
                'total_weight' => $request->input('total_weight'),
                'pickup_within' => $request->input('pickup_within'),
                'date' => $request->input('date'),
                'location_pickup' => $request->input('location_pickup'),
                'location_id' => $location->id,
            ]);
    
            $order->save();
    
            if ($request->has('items')) {
                foreach ($request->input('items') as $item) {
                    $orderItem = new OrderItem([
                        'order_id' => $order->id, 
                        'description' => $item['description'],
                        'total_weight' => $item['total_weight'],
                    ]);
    
                    $orderItem->save();
                }
            }
    
            return response()->json(['message' => 'Donation added successfully'], 201);
        });
    }


    public function editDonation(Request $request, $orderId){
     $donor= Auth::user();

     $order= Order::findOrFail($orderId);

     if($donor->id !== $order->donor_id){
        return response()->json(['error'=>'Permission Denied!',403]);
     }

     $request->validate([
        'description'=> 'required|string',
        'total_weight'=> 'required|numeric',
        'pickup_within'=>'required|string',
        'date'=>'required|date',
        'location_pickup'=>'required|string',
        'latitude'=>'required|numeric',
        'longitude'=>'required|numeric',
        'items.*.description'=>'string',
        'items.*.total_wight'=>'numeric',
     ]);

      return DB::transaction (function () use ($donor, $order, $request){
       $location = Location::find($order->location_id);
       $location->update([
        'user_id'=>$donor->id,
        'latitude'=>$request->input('latitude'),
        'longitude'=> $request->input('longitude'),
        'description'=>$request->input('location_description'),
       ]);

      $order->update([
        'description'=> $request->input('description'),
        'total_weight'=>$request->input('total_weight'),
        'pickup_within'=>$request->input('pickup_within'),
        'date'=>$request->input('date'),
        'location_pickup'=>$request->input('location_pickup'),
      ]);

      $order->orderItems()->delete();

      if($request->has('items')){
        foreach($request->input('items') as $item){
            $orderItem=new OrderItem([
                'description'=>$item['description'],
                'total_weight'=>$item['total_weight'],
            ]);

            $order->orderItems()->save($orderItem);
        }
      }
       return response()->json(['message'=> 'Donation update successfully.']);
      });

    }

    public function cancelDonation($orderId){
        $donor= Auth::user();

        $order = Order::findorFail($orderId);
        if($donor->id !== $order->donor_id){
            return response()->json(['error'=>'Permission Denied.'],403);
        }
        
        return DB::transaction(function () use ($order){
        Order::where('location_id',$order->location_id)->update(['location_id'=>null]);
        Location::where('id', $order->location_id)->delete();
        $order->orderItems()->delete();
        $order->delete();

        return response()->json(['message' => 'Donation order canceled successfully'], 200);  
        });
    }
}
