<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MenuItem;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    public function index(Request $request)
    {
        $query = MenuItem::with('canteen')->where('is_available', true);

        if ($request->canteen_id) {
            $query->where('canteen_id', $request->canteen_id);
        }

        if ($request->category) {
            $query->where('category', $request->category);
        }

        $menuItems = $query->orderBy('rating', 'desc')->get();

        return response()->json(['menu_items' => $menuItems]);
    }

    public function getByCategory($canteenId, $category)
    {
        $menuItems = MenuItem::where('canteen_id', $canteenId)
            ->where('category', $category)
            ->where('is_available', true)
            ->orderBy('rating', 'desc')
            ->get();

        return response()->json(['menu_items' => $menuItems]);
    }

    public function getFavorites(Request $request)
    {
        // Top rated items across all canteens
        $favorites = MenuItem::where('is_available', true)
            ->where('rating', '>=', 4.0)
            ->with('canteen')
            ->orderBy('rating', 'desc')
            ->limit(10)
            ->get();

        return response()->json(['favorites' => $favorites]);
    }
}