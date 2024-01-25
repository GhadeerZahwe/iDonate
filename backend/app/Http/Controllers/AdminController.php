<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\DeliveryInfo;
use App\Models\DonorInfo;
use Illuminate\Http\Request;

class AdminController extends Controller
{   

    public function getAllDeliveries()
    {
        try {
            if (auth()->check()) {
                $user = Auth::user();
    
                if ($user->user_type === 'admin') {
                    $deliveries = User::where('user_type', 'delivery')
                        ->whereNull('users.deleted_at') 
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
    
//   public function getAllDonors()
//     {
//         try {
//             if (auth()->check()) {
//                 $user = Auth::user();

//                 if ($user->user_type === 'admin') {
//                     $deliveries = User::where('user_type', 'donor')
//                         ->with('donorInfo') 
//                         ->get();

//                     return response()->json(['Donors' => $deliveries]);
//                 } else {
//                     return response()->json(['error' => 'Permission Denied'], 403);
//                 }
//             } else {
//                 return response()->json(['error' => 'User not authenticated'], 401);
//             }
//         } catch (\Exception $e) {
//             return response()->json(['error' => $e->getMessage()], 500);
//         }
//     }

    public function acceptDelivery(Request $request, $deliveryId){
        try{
         $user = Auth::user();

         if($user->user_type === 'admin'){
            $delivery = DeliveryInfo::query()->where('delivery_id',$deliveryId)->first();

            if(!$delivery){
                return response()->json(['error'=> 'Delivery Not Found'], 404);
            }

            $delivery->is_approved= true;
            $delivery->save();

            return response()->json(['message'=>'Delivery accepted successfully.']);
         }else{
            return response()->json(['error'=>'Permission Denied.'],403);
         }
          
        }catch(\Exception $e){
            return response()->json(['error'=>$e->getMessage()],500);

        }

    }

    public function cancelDeliveryAcceptance(Request $request, $deliveryId){
        try{
          $user=Auth::user();

          if($user->user_type === 'admin')
          {
            $delivery = DeliveryInfo::query()->where('delivery_id',$deliveryId)->first();

            if(!$delivery){
                return response()->json(['error'=>'Delivery Not Found.'],404);
            }

            $delivery->is_approved=false;
            $delivery->save();

            return response()->json(['message'=>'Delivery acceptance canceled successfully.']);
          }else{
            return response()->json(['error'=>'Permission Denied.'],403);
          }
        }catch(\Exception $e){
            return response()->json(['error'=>$e->getMessage()],500);

        }
    }

    public function deleteDelivery(Request $request, $deliveryId)
{
    try {
        if (auth()->user()->user_type !== 'admin') {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized: Only admin users can delete users.',
            ], 401);
        }

        // Check if the delivery user exists
        $deliveryUser = User::where('id', $deliveryId)
            ->where('user_type', 'delivery')
            ->first();

        if (!$deliveryUser) {
            return response()->json([
                'status' => 'error',
                'message' => 'Delivery user not found.',
            ], 404);
        }

        $deliveryUser->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Delivery user and associated info deleted successfully.',
        ]);
    } catch (QueryException $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'Error deleting delivery user.',
            'error' => $e->getMessage(),
        ], 500);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'An error occurred during delivery user deletion.',
            'error' => $e->getMessage(),
        ], 500);

    }}

    public function deleteDonor(Request $request, $donorId)
    {
        try {
            if (auth()->user()->user_type !== 'admin') {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Unauthorized: Only admin users can delete donors.',
                ], 401);
            }
    
            $donorUser = User::where('id', $donorId)
                ->where('user_type', 'donor')
                ->first();
    
            if (!$donorUser) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Donor user not found.',
                ], 404);
            }
    
            $donorUser->delete();
    
            return response()->json([
                'status' => 'success',
                'message' => 'Donor user and associated info deleted successfully.',
            ]);
        } catch (QueryException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error deleting donor user.',
                'error' => $e->getMessage(),
            ], 500);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred during donor user deletion.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    
    public function getAllDonors()
    {
        try {
            if (auth()->check()) {
                $user = Auth::user();
                if ($user->user_type === 'admin') {
                 $donors = User::where('user_type', 'donor')
                 ->whereNull('users.deleted_at') 
                 ->with('donorInfo')
                ->get();
                return response()->json(['donors' => $donors]);
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
