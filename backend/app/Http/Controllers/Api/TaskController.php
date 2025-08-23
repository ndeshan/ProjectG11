<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        return response()->json([
            'tasks' => [
                ['id' => 1, 'title' => 'Learn Laravel', 'completed' => true],
                ['id' => 2, 'title' => 'Build React App', 'completed' => false],
                ['id' => 3, 'title' => 'Connect Frontend & Backend', 'completed' => false],
            ]
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255'
        ]);

        return response()->json([
            'task' => [
                'id' => rand(4, 100),
                'title' => $request->title,
                'completed' => false
            ]
        ], 201);
    }
}