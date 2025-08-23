<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MenuItem;

class MenuItemSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            // MAIN CANTEEN - SRI LANKAN FOODS
            
            // Breakfast
            ['canteen_id' => 1, 'name' => 'Rice & Curry', 'name_tamil' => 'சாதம் கறி', 'description' => 'Traditional Sri Lankan rice with mixed curries', 'price' => 120, 'category' => 'breakfast', 'rating' => 4.8],
            ['canteen_id' => 1, 'name' => 'Rotti & Curry', 'name_tamil' => 'ரொட்டி கறி', 'description' => 'Fresh rotti with dhal curry and coconut sambol', 'price' => 80, 'category' => 'breakfast', 'rating' => 4.6],
            ['canteen_id' => 1, 'name' => 'String Hoppers', 'name_tamil' => 'இடியாப்பம்', 'description' => 'Steamed rice noodles with curry and sambol', 'price' => 90, 'category' => 'breakfast', 'rating' => 4.7],
            ['canteen_id' => 1, 'name' => 'Hoppers (Appa)', 'name_tamil' => 'ஆப்பம்', 'description' => 'Bowl-shaped pancakes with egg or plain', 'price' => 60, 'category' => 'breakfast', 'rating' => 4.5],
            
            // Lunch - Rice & Curries
            ['canteen_id' => 1, 'name' => 'Rice & Dhal Curry', 'name_tamil' => 'சாதம் பருப்பு கறி', 'description' => 'Steamed rice with traditional dhal curry', 'price' => 100, 'category' => 'lunch', 'rating' => 4.9],
            ['canteen_id' => 1, 'name' => 'Rice & Chicken Curry', 'name_tamil' => 'சாதம் கோழி கறி', 'description' => 'Rice with spicy Sri Lankan chicken curry', 'price' => 180, 'category' => 'lunch', 'rating' => 4.8],
            ['canteen_id' => 1, 'name' => 'Rice & Fish Curry', 'name_tamil' => 'சாதம் மீன் கறி', 'description' => 'Rice with coconut fish curry', 'price' => 160, 'category' => 'lunch', 'rating' => 4.7],
            ['canteen_id' => 1, 'name' => 'Rice & Vegetable Curry', 'name_tamil' => 'சாதம் காய்கறி கறி', 'description' => 'Rice with mixed vegetable curries', 'price' => 110, 'category' => 'lunch', 'rating' => 4.6],
            ['canteen_id' => 1, 'name' => 'Kottu Rotti', 'name_tamil' => 'கொட்டு ரொட்டி', 'description' => 'Chopped rotti stir-fried with vegetables/meat', 'price' => 150, 'category' => 'lunch', 'rating' => 4.9],
            
            // Dinner
            ['canteen_id' => 1, 'name' => 'Fried Rice Sri Lankan Style', 'name_tamil' => 'ஃப்ரைட் ரைஸ்', 'description' => 'Spiced fried rice with vegetables and egg', 'price' => 130, 'category' => 'dinner', 'rating' => 4.5],
            ['canteen_id' => 1, 'name' => 'Noodles Sri Lankan', 'name_tamil' => 'நூடுல்ஸ்', 'description' => 'Stir-fried noodles with local spices', 'price' => 120, 'category' => 'dinner', 'rating' => 4.4],
            
            // FOOD COURT - VARIETY FOODS
            
            // Breakfast
            ['canteen_id' => 2, 'name' => 'Pol Rotti', 'name_tamil' => 'பொல் ரொட்டி', 'description' => 'Coconut flatbread with lunu miris', 'price' => 50, 'category' => 'breakfast', 'rating' => 4.6],
            ['canteen_id' => 2, 'name' => 'Kiribath', 'name_tamil' => 'கிரிபத்', 'description' => 'Milk rice with lunu miris and jaggery', 'price' => 70, 'category' => 'breakfast', 'rating' => 4.3],
            ['canteen_id' => 2, 'name' => 'Sandwich', 'name_tamil' => 'சாண்ட்விச்', 'description' => 'Grilled vegetable or chicken sandwich', 'price' => 80, 'category' => 'breakfast', 'rating' => 4.2],
            
            // Lunch
            ['canteen_id' => 2, 'name' => 'Biriyani', 'name_tamil' => 'பிரியாணி', 'description' => 'Fragrant spiced rice with chicken or mutton', 'price' => 200, 'category' => 'lunch', 'rating' => 4.7],
            ['canteen_id' => 2, 'name' => 'Pittu', 'name_tamil' => 'பிட்டு', 'description' => 'Steamed rice flour cylinders with coconut', 'price' => 90, 'category' => 'lunch', 'rating' => 4.5],
            ['canteen_id' => 2, 'name' => 'Lamprais', 'name_tamil' => 'லம்ப்ரைஸ்', 'description' => 'Dutch Burgher rice packet with mixed curries', 'price' => 250, 'category' => 'lunch', 'rating' => 4.8],
            
            // Dinner
            ['canteen_id' => 2, 'name' => 'Devilled Chicken', 'name_tamil' => 'டெவில்ட் சிக்கன்', 'description' => 'Spicy stir-fried chicken with peppers', 'price' => 180, 'category' => 'dinner', 'rating' => 4.6],
            ['canteen_id' => 2, 'name' => 'Chinese Rolls', 'name_tamil' => 'சைனீஸ் ரோல்ஸ்', 'description' => 'Crispy vegetable or chicken rolls', 'price' => 100, 'category' => 'dinner', 'rating' => 4.4],
        ];

        foreach ($items as $item) {
            MenuItem::create($item);
        }
        
        // SCHOOL SUPPLIES
        $schoolItems = [
            // Stationery
            ['canteen_id' => 1, 'name' => 'Ball Point Pen', 'name_tamil' => 'பால் பாயிண்ட் பேனா', 'description' => 'Blue/Black ink pen', 'price' => 25, 'category' => 'stationery', 'rating' => 4.0],
            ['canteen_id' => 1, 'name' => 'Pencil', 'name_tamil' => 'பென்சில்', 'description' => 'HB graphite pencil', 'price' => 15, 'category' => 'stationery', 'rating' => 4.2],
            ['canteen_id' => 1, 'name' => 'Eraser', 'name_tamil' => 'அழிப்பான்', 'description' => 'White rubber eraser', 'price' => 10, 'category' => 'stationery', 'rating' => 4.1],
            ['canteen_id' => 1, 'name' => 'Ruler', 'name_tamil' => 'அளவுகோல்', 'description' => '30cm plastic ruler', 'price' => 30, 'category' => 'stationery', 'rating' => 4.0],
            ['canteen_id' => 1, 'name' => 'Notebook A4', 'name_tamil' => 'குறிப்பேடு A4', 'description' => '200 pages ruled notebook', 'price' => 120, 'category' => 'stationery', 'rating' => 4.3],
            ['canteen_id' => 1, 'name' => 'Exercise Book', 'name_tamil' => 'பயிற்சி புத்தகம்', 'description' => '80 pages exercise book', 'price' => 60, 'category' => 'stationery', 'rating' => 4.2],
            
            // Books & References
            ['canteen_id' => 2, 'name' => 'Graph Paper', 'name_tamil' => 'வரைபட காகிதம்', 'description' => 'A4 graph paper pack', 'price' => 50, 'category' => 'stationery', 'rating' => 4.1],
            ['canteen_id' => 2, 'name' => 'Highlighter', 'name_tamil' => 'ஹைலைட்டர்', 'description' => 'Fluorescent marker pen', 'price' => 40, 'category' => 'stationery', 'rating' => 4.0],
            ['canteen_id' => 2, 'name' => 'Calculator', 'name_tamil' => 'கணிப்பான்', 'description' => 'Scientific calculator', 'price' => 800, 'category' => 'stationery', 'rating' => 4.5],
            ['canteen_id' => 2, 'name' => 'File Folder', 'name_tamil' => 'கோப்பு அடைவு', 'description' => 'Plastic document folder', 'price' => 80, 'category' => 'stationery', 'rating' => 4.2],
        ];
        
        foreach ($schoolItems as $item) {
            MenuItem::create($item);
        }
    }
}