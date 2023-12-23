<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\DonorInfo;
use App\Models\User;
use Illuminate\Support\Facades\Auth;


class DonorController extends Controller
{
    public function getAllDonors(){
        $donors=User::where('user_type','donor')
        ->join('donors_info','users.id','=','donors_info.donor_id')
        ->get();

        return response()->json([
            'donors'=>$donors
        ]);
    }

    public function getDonorFullName(){
     if(auth()->check()){
       
        $user=Auth::user();

       if($user->user_type==='admin'){
        $donors=User::where('user_type','donor')
        ->join('donors_info','users.id','=','donors_info.donor_id')
        ->select('users.first_name','users.last_name','users.email','users.phone')
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
