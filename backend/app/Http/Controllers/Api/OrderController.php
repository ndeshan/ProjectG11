<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\MenuItem;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'canteen_id' => 'required|exists:canteens,id',
            'items' => 'required|array',
            'items.*.menu_item_id' => 'required|exists:menu_items,id',
            'items.*.quantity' => 'required|integer|min:1',
            'pickup_time' => 'required|date|after:now',
            'payment_method' => 'required|string'
        ]);

        $totalAmount = 0;
        $orderItems = [];

        foreach ($request->items as $item) {
            $menuItem = MenuItem::find($item['menu_item_id']);
            $itemTotal = $menuItem->price * $item['quantity'];
            $totalAmount += $itemTotal;

            $orderItems[] = [
                'menu_item_id' => $menuItem->id,
                'name' => $menuItem->name,
                'price' => $menuItem->price,
                'quantity' => $item['quantity'],
                'total' => $itemTotal
            ];
        }

        $order = Order::create([
            'user_id' => auth()->id() ?? 1, // Default for demo
            'canteen_id' => $request->canteen_id,
            'order_number' => 'ORD-' . strtoupper(Str::random(8)),
            'items' => $orderItems,
            'total_amount' => $totalAmount,
            'status' => 'pending',
            'payment_status' => 'paid', // Simulate payment success
            'payment_method' => $request->payment_method,
            'pickup_time' => $request->pickup_time
        ]);

        return response()->json([
            'order' => $order,
            'message' => 'Order placed successfully!'
        ], 201);
    }

    public function index()
    {
        $orders = Order::with('canteen')
            ->where('user_id', auth()->id() ?? 1)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json(['orders' => $orders]);
    }

    public function show($id)
    {
        $order = Order::with('canteen')->findOrFail($id);
        return response()->json(['order' => $order]);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:confirmed,preparing,ready,completed,cancelled'
        ]);

        $order = Order::findOrFail($id);
        $order->update(['status' => $request->status]);

        if ($request->status === 'ready') {
            $order->update(['ready_at' => now()]);
        }

        return response()->json(['order' => $order]);
    }
}