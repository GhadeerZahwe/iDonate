<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Models\DeliveryInfo;
use App\Models\DonorInfo;
use App\Models\OrderItem;
use App\Models\Location;
use App\Models\User;
use App\Models\Order;
use Illuminate\Http\Request;

class DeliveryController extends Controller
{
    public function acceptOrder(Request $request, $orderId)
    {
        try {
            $delivery = Auth::user();
            if ($delivery->user_type !== 'delivery') {
                return response()->json(['error' => 'Permission Denied'], 403);
            }
    
            $order = Order::where('id', $orderId)
                ->where('status', 'pending')
                ->whereNull('delivery_id') 
                ->with('orderItems') 
                ->first();
    
            if (!$order) {
                return response()->json(['error' => 'Order not found or already assigned'], 404);
            }
    
            $totalWeight = $order->total_weight;
    
            if (($totalWeight > 30 && $delivery->mobility_type === 'motorcycle') ||
                ($totalWeight > 40 && !in_array($delivery->mobility_type, ['car', 'van'])) ||
                ($totalWeight > 50 && $delivery->mobility_type !== 'van')) {
                return response()->json(['error' => 'Cannot take this order with your current vehicle type.'], 400);
            }
    
            $order->is_approved = true;
            $order->delivery_id = $delivery->id; 
            $order->status = 'on_the_way'; 
            $order->save();
    
            return response()->json(['Success_Message' => 'Order accepted successfully and status updated to on the way.'], 200);
    
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

  
    public function cancelOrder(Request $request, $orderId)
{
    try {
        $delivery = Auth::user();
        if ($delivery->user_type !== 'delivery') {
            return response()->json(['error' => 'Permission Denied'], 403);
        }

        $order = Order::where('id', $orderId)
            ->where('status', 'on_the_way')
            ->where('delivery_id', $delivery->id) 
            ->first();

        if (!$order) {
            return response()->json(['error' => 'Order not found or cannot be canceled'], 404);
        }

        $order->status = 'pending';
        $order->is_approved = false; 
        $order->delivery_id = null;
        $order->save();

        return response()->json(['message' => 'Order canceled successfully'], 200);

    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}


public function updateOrderStatus(Request $request, $orderId)
{
    try {
        $delivery = Auth::user();
        if ($delivery->user_type !== 'delivery') {
            return response()->json(['error' => 'Permission Denied'], 403);
        }

        $order = Order::where('id', $orderId)
            ->where('status', 'on_the_way')
            ->where('delivery_id', $delivery->id) 
            ->first();

        if (!$order) {
            return response()->json(['error' => 'Order not found or cannot be updated'], 404);
        }

        $order->status = 'delivered';
        $order->save();

        return response()->json(['message' => 'The donation process has been completed and delivered.'], 200);

    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}


public function returnToOnTheWay(Request $request, $orderId)
{
    try {
        $delivery = Auth::user();
        if ($delivery->user_type !== 'delivery') {
            return response()->json(['error' => 'Permission Denied'], 403);
        }

        $order = Order::where('id', $orderId)
            ->where('status', 'delivered')
            ->where('delivery_id', $delivery->id) 
            ->first();

        if (!$order) {
            return response()->json(['error' => 'Order not found or cannot be updated'], 404);
        }

        $order->status = 'on_the_way';
        $order->save();

        return response()->json(['Success' => 'Order status updated to on the way'], 200);

    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}

public function getCompletedOrders(Request $request)
{
    try {
        $delivery = Auth::user();
        if ($delivery->user_type !== 'delivery') {
            return response()->json(['error' => 'Permission Denied'], 403);
        }

        $completedOrders = Order::where('delivery_id', $delivery->id)
            ->where('status', 'delivered')
            ->with(['donor', 'orderItems', 'locations'])
            ->get();

        return response()->json(['completed_orders' => $completedOrders], 200);

    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}

public function getOnTheWayOrders(Request $request)
{
    try {
        $delivery = Auth::user();
        if ($delivery->user_type !== 'delivery') {
            return response()->json(['error' => 'Permission Denied'], 403);
        }

        $onTheWayOrders = Order::where('delivery_id', $delivery->id)
            ->where('status', 'on_the_way')
            ->with(['donor', 'orderItems', 'locations'])
            ->get();

        return response()->json(['on_the_way_orders' => $onTheWayOrders], 200);

    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}

public function getPendingOrders(Request $request)
{
    try {
        $delivery = Auth::user();
        if ($delivery->user_type !== 'delivery') {
            return response()->json(['error' => 'Permission Denied'], 403);
        }

        $pendingOrders = Order::whereNull('delivery_id')
            ->where('status', 'pending')
            ->with(['donor', 'orderItems', 'locations'])
            ->get();

        return response()->json(['pending_orders' => $pendingOrders], 200);

    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}

}
