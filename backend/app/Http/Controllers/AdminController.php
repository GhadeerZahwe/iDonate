<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\DeliveryInfo;
use Illuminate\Http\Request;

class AdminController extends Controller
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
}
