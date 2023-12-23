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
}
