<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Canteen;
use Illuminate\Http\Request;

class CanteenController extends Controller
{
    public function index()
    {
        $canteens = Canteen::with(['queueStatus' => function($query) {
            $query->latest()->first();
        }])->where('is_active', true)->get();

        return response()->json(['canteens' => $canteens]);
    }

    public function show($id)
    {
        $canteen = Canteen::with(['menuItems', 'queueStatus'])->findOrFail($id);
        return response()->json(['canteen' => $canteen]);
    }

    public function getQueueStatus($id)
    {
        $canteen = Canteen::findOrFail($id);
        $queueStatus = $canteen->queueStatus()->latest()->first();
        
        return response()->json([
            'canteen_id' => $id,
            'queue_length' => $queueStatus->current_queue_length ?? 0,
            'estimated_wait_time' => $queueStatus->estimated_wait_time ?? 0,
            'peak_status' => $queueStatus->peak_status ?? 'low'
        ]);
    }
}