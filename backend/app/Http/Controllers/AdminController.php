<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\DeliveryInfo;
use App\Models\DonorInfo;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function getAllDonors(){
        try {
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
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

  public function getAllDeliveries()
    {
        try {
            // Check if the user is authenticated
            if (auth()->check()) {
                $user = Auth::user();

                // Check if the user is an admin
                if ($user->user_type === 'admin') {
                    // Get all delivery users with their delivery info
                    $deliveries = User::where('user_type', 'delivery')
                        ->with('deliveryInfo') 
                        ->get();

                    return response()->json(['deliveries' => $deliveries]);
                } else {
                    return response()->json(['error' => 'Permission Denied'], 403);
                }
            } else {
                return response()->json(['error' => 'User not authenticated'], 401);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
