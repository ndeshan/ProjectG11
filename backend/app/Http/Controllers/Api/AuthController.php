<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'student_id' => 'required|string|unique:users',
            'phone' => 'required|string'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'student_id' => $request->student_id,
            'phone' => $request->phone,
        ]);

        return response()->json([
            'user' => $user,
            'token' => 'demo-token-' . $user->id,
            'message' => 'Registration successful!'
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        // Demo login - in production, verify password
        $user = User::where('email', $request->email)->first();
        
        if (!$user) {
            // Create demo user if not exists
            $user = User::create([
                'name' => 'Demo Student',
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'student_id' => 'STU' . rand(1000, 9999),
                'phone' => '0771234567'
            ]);
        }

        return response()->json([
            'user' => $user,
            'token' => 'demo-token-' . $user->id,
            'message' => 'Login successful!'
        ]);
    }

    public function profile(Request $request)
    {
        // Demo profile data
        return response()->json([
            'user' => [
                'id' => 1,
                'name' => 'Demo Student',
                'email' => 'student@campus.lk',
                'student_id' => 'STU2024001',
                'phone' => '0771234567',
                'total_orders' => 25,
                'favorite_items' => ['Rice & Curry', 'Kottu Rotti']
            ]
        ]);
    }
}