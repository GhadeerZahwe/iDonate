<?php

namespace App\Http\Middleware;
use Closure;
use Illuminate\Http\Request;
use App\Models\DeliveryInfo;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AuthorizeDelivery
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user=Auth::user();
        $delivery=DeliveryInfo::where('delivery_id',$user->id)->first();
        if($user->user_type === 'delivery' and $delivery->is_approved===1){
            return $next($request);
        }
        return response()->json(['error'=>'Not authorized as a delivery.']);
    }
}
