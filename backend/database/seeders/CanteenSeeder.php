<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Canteen;

class CanteenSeeder extends Seeder
{
    public function run(): void
    {
        Canteen::create([
            'name' => 'Main Canteen',
            'location' => 'Academic Block A',
            'is_active' => true,
            'current_queue_count' => 12,
            'estimated_wait_time' => 8
        ]);

        Canteen::create([
            'name' => 'Food Court',
            'location' => 'Student Center',
            'is_active' => true,
            'current_queue_count' => 25,
            'estimated_wait_time' => 15
        ]);
    }
}