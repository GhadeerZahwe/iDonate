<?php

namespace App\Http\Controllers;
use Illuminate\Database\QueryException; 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\DonorInfo;
use App\Models\DeliveryInfo;

class AuthController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','register','adminLogin']]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        $credentials = $request->only('email', 'password');

        $token = Auth::attempt($credentials);
        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }

        $user = Auth::user();
        return response()->json([
                'status' => 'success',
                'user' => $user,
                'authorisation' => [
                    'token' => $token,
                    'type' => 'bearer',
                ]
            ]);

    }

    public function adminLogin(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|string|email',
                'password' => 'required|string',
            ]);
    
            $credentials = $request->only('email', 'password');
            $user = User::where('email', $credentials['email'])->where('user_type', 'admin')->first();
    
            if (!$user || !Hash::check($credentials['password'], $user->password)) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Unauthorized',
                ], 401);
            }
    
            $token = Auth::login($user);
    
            return response()->json([
                'status' => 'success',
                'user' => $user,
                'authorisation' => [
                    'token' => $token,
                    'type' => 'bearer',
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred during admin login',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    

    public function register(Request $request){
        try{
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'phone' => 'string', 
            'license_number' => $request->user_type == 'delivery' ? 'required|string' : '',
            'is_approved' => $request->user_type == 'delivery' ? 'boolean' : '',
            'mobility_type' => $request->user_type == 'delivery' ? 'string' : '',
            // 'profile_image' => $request->user_type == 'delivery' ? 'image|mimes:jpeg,png,jpg,gif|max:2048' : '',
        ]);

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'phone'=>$request->phone ?? '81791454',
            'user_type'=>$request->user_type ?? 'donor',
            'password' => Hash::make($request->password),
        ]);

         if($request->user_type== 'donor'){
            DonorInfo::create([
                'donor_id'=>$user->id,
                'description' => $request->description ?? 'Food Waste Donor', 
            ]);
         }

    if ($request->user_type == 'delivery') {
        $deliveryInfo = new DeliveryInfo([
            'delivery_id' => $user->id,
            'license_number' => $request->license_number,
            'is_approved' => $request->is_approved ?? 0,
            'profile_image' => $user->profile_image,
            'mobility_type' => $request->mobility_type ?? 'car',
        ]);

        if ($request->hasFile('profile_image')) {
            $imagePath = $request->file('profile_image')->store('images', 'public');
            $deliveryInfo->profile_image = basename($imagePath);
        }
        $deliveryInfo->save();
    }
        $token = Auth::login($user);

        return response()->json([
            'status' => 'success',
            'message' => 'User created successfully',
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
    } catch (QueryException $e) {
        // Handle database query exceptions
        return response()->json(['error' => $e->getMessage()], 500);
    } catch (\Exception $e) {
        // Handle other exceptions
        return response()->json(['error' => $e->getMessage()], 500);
    }}

    public function logout()
    {
        Auth::user() ? Auth::logout() : true;
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

    public function refresh()
    {
        return response()->json([
            'status' => 'success',
            'user' => Auth::user(),
            'authorisation' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
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

}