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
    }
}
