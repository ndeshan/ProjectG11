<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DemoDataSeeder extends Seeder
{
    public function run(): void
    {
        // Create demo data without database for testing
        $canteens = [
            ['id' => 1, 'name' => 'Main Canteen', 'location' => 'Academic Block A'],
            ['id' => 2, 'name' => 'Food Court', 'location' => 'Student Center']
        ];
        
        $menuItems = [
            // Sri Lankan Foods
            ['id' => 1, 'canteen_id' => 1, 'name' => 'Rice & Curry', 'name_tamil' => 'சாதம் கறி', 'price' => 120, 'category' => 'lunch'],
            ['id' => 2, 'canteen_id' => 1, 'name' => 'Rotti & Curry', 'name_tamil' => 'ரொட்டி கறி', 'price' => 80, 'category' => 'breakfast'],
            ['id' => 3, 'canteen_id' => 1, 'name' => 'Kottu Rotti', 'name_tamil' => 'கொட்டு ரொட்டி', 'price' => 150, 'category' => 'lunch'],
            ['id' => 4, 'canteen_id' => 2, 'name' => 'Biriyani', 'name_tamil' => 'பிரியாணி', 'price' => 200, 'category' => 'lunch'],
            // School Items
            ['id' => 5, 'canteen_id' => 1, 'name' => 'Ball Point Pen', 'name_tamil' => 'பால் பாயிண்ட் பேனா', 'price' => 25, 'category' => 'stationery'],
            ['id' => 6, 'canteen_id' => 1, 'name' => 'Notebook A4', 'name_tamil' => 'குறிப்பேடு A4', 'price' => 120, 'category' => 'stationery'],
        ];
        
        echo "Demo data ready for Sri Lankan Campus Canteen System!\n";
        echo "Foods: Rice & Curry, Rotti, Kottu, Biriyani\n";
        echo "School Items: Pens, Notebooks, Calculators\n";
    }
}