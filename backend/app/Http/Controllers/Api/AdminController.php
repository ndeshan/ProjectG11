<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\QueueStatus;
use App\Models\Canteen;
use Illuminate\Http\Request;
use Carbon\Carbon;

class AdminController extends Controller
{
    public function getDashboard($canteenId)
    {
        $today = Carbon::today();
        
        $stats = [
            'total_orders_today' => Order::where('canteen_id', $canteenId)
                ->whereDate('created_at', $today)->count(),
            'pending_orders' => Order::where('canteen_id', $canteenId)
                ->whereIn('status', ['pending', 'confirmed', 'preparing'])->count(),
            'revenue_today' => Order::where('canteen_id', $canteenId)
                ->whereDate('created_at', $today)
                ->where('payment_status', 'paid')
                ->sum('total_amount'),
            'avg_preparation_time' => 15 // minutes
        ];

        $recentOrders = Order::where('canteen_id', $canteenId)
            ->with('user')
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get();

        return response()->json([
            'stats' => $stats,
            'recent_orders' => $recentOrders
        ]);
    }

    public function updateQueueStatus(Request $request, $canteenId)
    {
        $request->validate([
            'queue_length' => 'required|integer|min:0',
            'estimated_wait_time' => 'required|integer|min:0'
        ]);

        $peakStatus = 'low';
        if ($request->queue_length > 30) $peakStatus = 'high';
        elseif ($request->queue_length > 15) $peakStatus = 'medium';

        QueueStatus::create([
            'canteen_id' => $canteenId,
            'current_queue_length' => $request->queue_length,
            'estimated_wait_time' => $request->estimated_wait_time,
            'peak_status' => $peakStatus
        ]);

        Canteen::where('id', $canteenId)->update([
            'current_queue_count' => $request->queue_length,
            'estimated_wait_time' => $request->estimated_wait_time
        ]);

        return response()->json(['message' => 'Queue status updated']);
    }

    public function getOrdersToday($canteenId)
    {
        $orders = Order::where('canteen_id', $canteenId)
            ->whereDate('created_at', Carbon::today())
            ->with('user')
            ->orderBy('pickup_time')
            ->get();

        return response()->json(['orders' => $orders]);
    }
}