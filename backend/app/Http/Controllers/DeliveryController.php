<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\DeliveryInfo;
use App\Models\User;
use App\Models\Order;
use Illuminate\Http\Request;
use GuzzleHttp\Client;

class DeliveryController extends Controller
{
    // Accept an order by a delivery 
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
    
            $order->is_approved = true;
            $order->delivery_id = $delivery->id; 
            $order->status = 'on_the_way'; 
            $order->save();
    
            return response()->json(['Success_Message' => 'Order accepted successfully and status updated to on the way.'], 200);
    
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    
    // Cancel an order by a delivery 
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

   
  // Update order status to completed by a delivery 
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

  // Return order to "on the way" status by a delivery person
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

  // Get completed orders assigned to the delivery 
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

  // Get on the way orders assigned to the delivery 
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


  // Get pending orders assigned to the delivery 
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


  // Update order status based on scanning by a delivery person
  public function updateOrderStatusOnScan(Request $request, $orderId)
   {
     try {
        $delivery = Auth::user();
        if ($delivery->user_type !== 'delivery') {
            return response()->json(['ok' => false, 'error' => 'Permission Denied'], 403);
        }

        $order = Order::where('id', $orderId)
            ->where('delivery_id', $delivery->id)
            ->first();

        if (!$order) {
            $order = Order::where('id', $orderId)
                ->whereNull('delivery_id')
                ->where('status', 'pending')
                ->first();

            if (!$order) {
                return response()->json(['ok' => false, 'error' => 'Order not found or you are not assigned to it'], 404);
            }

            $order->delivery_id = $delivery->id;
            $order->status = 'on_the_way';
            $order->is_approved = true;
            $order->save();

            return response()->json(['ok' => true, 'message' => 'Order status updated to on the way'], 200);
        } elseif ($order->status === 'on_the_way') {
            $order->status = 'completed';
            $order->save();
            return response()->json(['ok' => true, 'message' => 'The donation process has been completed and delivered.'], 200);
        } else {
            return response()->json(['ok' => false, 'error' => 'Invalid status transition'], 400);
        }

     } catch (\Exception $e) {
        return response()->json(['ok' => false, 'error' => $e->getMessage()], 500);
   }
 } 


  // Get location information of an order
  public function getLocationByOrderId(Request $request, $orderId)
  {
    try {
        $delivery = Auth::user();

        if ($delivery->user_type !== 'delivery') {
            return response()->json(['error' => 'Permission Denied'], 403);
        }

        $order = Order::where('id', $orderId)
            ->whereNull('delivery_id')
            ->where('status', 'pending')
            ->with('locations')
            ->first();

        if (!$order) {
            return response()->json(['error' => 'Order not found or not pending with null delivery ID'], 404);
        }

        return response()->json(['locations' => $order->locations], 200);

      } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
  }


  public function updateOrderWeight(Request $request, $deliveryId, $orderId)
  {
    echo "Received request for Delivery ID: $deliveryId, Order ID: $orderId, Weight: " . $request->input('total_weight');
    $order = Order::where('id', $orderId)
        ->where('delivery_id', $deliveryId)
        ->where('status', 'on_the_way')
        ->firstOrFail();

    $validator = Validator::make($request->all(), [
        'total_weight' => 'required|numeric',
    ]);

    if ($validator->fails()) {
        return response()->json(['error' => $validator->errors()], 400);
    }

    return DB::transaction(function () use ($order, $request) {
        $newWeight = $request->input('total_weight');

        if ($newWeight < 0) {
            return response()->json(['error' => 'Cannot update to a negative total weight value'], 400);
        }

        info("Updating order weight: Order ID - $order->id, Delivery ID - $order->delivery_id, New Weight - $newWeight");

        $order->update([
            'total_weight' => $newWeight,
        ]);

        return response()->json(['message' => 'Order weight updated successfully.'], 200);
    });
 }


 public function getTotalWeight(Request $request, $orderId)
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
            return response()->json(['error' => 'Order not found or not assigned to the delivery person'], 404);
        }

        $totalWeight = $order->total_weight;

        return response()->json(['total_weight' => $totalWeight], 200);

    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
  }
 }


  public function updateDeliveryLocation(Request $request)
  {
    try {
        $delivery = Auth::user();

        if ($delivery->user_type !== 'delivery') {
            return response()->json(['error' => 'Permission Denied'], 403);
        }

        $validator = Validator::make($request->all(), [
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $deliveryInfo = DeliveryInfo::where('delivery_id', $delivery->id)->first();

        if (!$deliveryInfo) {
            return response()->json(['error' => 'Delivery information not found'], 404);
        }

        $deliveryInfo->update([
            'latitude' => $request->input('latitude'),
            'longitude' => $request->input('longitude'),
        ]);

        return response()->json(['message' => 'Delivery location updated successfully.'], 200);
     } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
   }
 }


 public function getWeatherTemperature(Request $request)
    {
        $apiKey = 'JjrnFqkUC6sAzhUv1Bci4ZF0LBhdrOV4';

        $latitude = 33.8469148;
        $longitude = 35.5214354;

        $apiUrl = "https://api.tomorrow.io/v4/timelines?location={$latitude},{$longitude}&fields=temperature&timesteps=1h&units=metric&apikey={$apiKey}";

        $client = new Client();

        $response = $client->get($apiUrl);

        $weatherData = json_decode($response->getBody(), true);

        $temperature = $weatherData['data']['timelines'][0]['intervals'][0]['values']['temperature'];

        $responseText = "The current temperature in Beirut is {$temperature}°C.";

        return response()->json(['response' => $responseText]);
   }
 }


