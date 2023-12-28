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
    public function getAllDonors()
    {
        try {
            if (auth()->check()) {
                $user = Auth::user();
    
                if ($user->user_type === 'admin') {
                    $donors = User::where('user_type', 'donor')
        ->where('is_deleted', '0') // Exclude soft-deleted records
        ->join('donors_info', 'users.id', '=', 'donors_info.donor_id')
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

    public function acceptDelivery(Request $request, $deliveryId){
        try{
         $user = Auth::user();

         if($user->user_type === 'admin'){
            $delivery=DeliveryInfo::find($deliveryId);

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
            $delivery=DeliveryInfo::find($deliveryId);

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

    public function deleteUser(Request $request){
        try{
            if(auth()->user()->user_type!== 'admin'){
                return response()->json([
                    'status'=>'error',
                    'message'=>'Unauthorized: Only admin users can delete users.',
                ],401);
            }
         $donor_id=$request->id;
         //soft delete the user
         $action=DB::transaction(function() use ($donor_id){
            return User::where('id', $donor_id)->update(['is_deleted'=>'1']);
         });

        return response()->json([
            'status'=>$action,
            'message'=>'User deleted successfully.',
        ]);
    } catch (QueryException $e) {
        // Handle database query exceptions
        return response()->json([
            'status' => 'error',
            'message' => 'Error deleting user.',
            'error' => $e->getMessage(),
        ], 500);

    } catch (\Exception $e) {
        // Handle other exceptions
        return response()->json([
            'status' => 'error',
            'message' => 'An error occurred during user deletion.',
            'error' => $e->getMessage(),
        ], 500);
    }

    }
}
