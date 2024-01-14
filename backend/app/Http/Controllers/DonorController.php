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
            'phone_number'=>'required|numeric',
        ]);
    
        return DB::transaction(function () use ($donor, $request) {
            $location = new Location([
                'user_id' => $donor->id, 
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
                'phone_number' => $request->input('phone_number'),
                'date' => $request->input('date'),
                'location_pickup' => $request->input('location_pickup'),
                'location_id' => $location->id,
            ]);
    
            $order->save();
    
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
        'description' => 'required|string',
        'total_weight' => 'required|numeric',
        'pickup_within' => 'required|string',
        'date' =>'required|date',
        'location_pickup' => 'required|string',
        'latitude' => 'required|numeric',
        'longitude' => 'required|numeric',
        'phone_number'=>'required|numeric',
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
        'phone_number' => $request->input('phone_number'),
        'date'=>$request->input('date'),
        'location_pickup'=>$request->input('location_pickup'),
      ]);

       return response()->json(['message'=> 'Donation updated successfully.'],200);
      });

    }

    public function cancelDonation($orderId){
        $donor = Auth::user();

    return DB::transaction(function () use ($donor, $orderId) {
        $order = Order::where('id', $orderId)
            ->where('donor_id', $donor->id)
            ->with('location')
            ->firstOrFail();

        $location = $order->location;

        $order->delete();

        if ($location) {
            $location->delete();
        }

        return response()->json(['message' => 'Donation order canceled successfully'], 200);
    });
    }

   public function getDonorLocation($donor_id){
    try{
        $user=Auth::user();

        if(!$user){
            return response()->json(['error'=>'Not authenticated.'],401);
        }

        if($user->user_type !== 'donor'){
            return response()->json(['error'=> 'Permission Denied.'],403);
        }

        if($user->id != $donor_id){
            return response()->json(['error'=>'Not authorized'],403);
        }

        $locations=Location::where('user_id',$donor_id)->get();
        return response()->json(['Locations'=>$locations]);

    }catch(\Exception $e){
        return response()->json(['error'=> $e->getMessage()],500);
    }
   }

}
