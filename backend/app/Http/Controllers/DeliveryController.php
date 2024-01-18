<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Models\DeliveryInfo;
use App\Models\DonorInfo;
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
                ->first();
    
            if (!$order) {
                return response()->json(['error' => 'Order not found or already assigned'], 404);
            }
    
            // $totalWeight = $order->total_weight;
    
            // if (($totalWeight > 30 && $delivery->mobility_type === 'motorcycle') ||
            //     ($totalWeight > 40 && !in_array($delivery->mobility_type, ['car', 'van'])) ||
            //     ($totalWeight > 50 && $delivery->mobility_type !== 'van')) {
            //     return response()->json(['error' => 'Cannot take this order with your current vehicle type.'], 400);
            // }
    
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

        $order->status = 'completed';
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
            ->where('status', 'completed')
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
            ->where('status', 'completed')
            ->with(['donor', 'locations'])
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
            ->with(['donor', 'locations'])
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
            ->with(['donor', 'locations'])
            ->get();

        return response()->json(['pending_orders' => $pendingOrders], 200);

    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}

public function getOrdersByStatus(Request $request, $status)
{
    try {
        $delivery = Auth::user();
        if ($delivery->user_type !== 'delivery') {
            return response()->json(['error' => 'Permission Denied'], 403);
        }
        $orders = Order::where('delivery_id', $status == 'pending' ? null : $delivery->id)
            ->where('status', $status)
            ->with(['donor', 'locations'])
            ->get();


        return response()->json(['orders' => $orders], 200);

    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}

public function updateOrderStatusOnScan(Request $request, $orderId)
{
    try {
        $delivery = Auth::user();
        if ($delivery->user_type !== 'delivery') {
            return response()->json(['error' => 'Permission Denied'], 403);
        }

        $order = Order::where('id', $orderId)
            ->where('delivery_id', $delivery->id)
            ->first();

        if (!$order) {
            return response()->json(['error' => 'Order not found or you are not assigned to it'], 404);
        }

        if ($order->status === 'pending') {
            // If the order is pending, update it to 'on_the_way'
            $order->status = 'on_the_way';
            $order->save();
            return response()->json(['message' => 'Order status updated to on the way'], 200);
        } elseif ($order->status === 'on_the_way') {
            // If the order is on the way, update it to 'completed'
            $order->status = 'completed';
            $order->save();
            return response()->json(['message' => 'The donation process has been completed and delivered.'], 200);
        } else {
            return response()->json(['error' => 'Invalid status transition'], 400);
        }

    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}

}
