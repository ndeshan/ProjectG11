// 200+ Sri Lankan Menu Items for University of Ruhuna Canteen
export const menuItems = [
  // Rice & Curry Varieties
  { id: 1, name: 'Rice & Fish Curry', name_tamil: 'சாதம் மீன் கறி', description: 'Fresh fish curry with coconut milk and spices', price: 180, category: 'lunch', rating: 4.8, canteen_id: 1, image: '/images/rice_fish_curry.jpg' },
  { id: 2, name: 'Rice & Chicken Curry', name_tamil: 'சாதம் கோழி கறி', description: 'Spicy chicken curry with traditional spices', price: 200, category: 'lunch', rating: 4.9, canteen_id: 1, image: '/images/rice_chicken_curry.jpg' },
  { id: 3, name: 'Rice & Mutton Curry', name_tamil: 'சாதம் ஆட்டு கறி', description: 'Tender mutton curry with aromatic spices', price: 250, category: 'lunch', rating: 4.7, canteen_id: 1, image: '/images/rice_mutton_curry.jpg' },
  { id: 4, name: 'Rice & Beef Curry', name_tamil: 'சாதம் மாட்டு கறி', description: 'Rich beef curry with coconut gravy', price: 220, category: 'lunch', rating: 4.6, canteen_id: 1, image: '/images/rice_beef_curry.jpg' },
  { id: 5, name: 'Rice & Prawn Curry', name_tamil: 'சாதம் இறால் கறி', description: 'Fresh prawn curry with coconut milk', price: 280, category: 'lunch', rating: 4.8, canteen_id: 1, image: '/images/rice_prawn_curry.jpg' },
  { id: 6, name: 'Rice & Crab Curry', name_tamil: 'சாதம் நண்டு கறி', description: 'Spicy crab curry with traditional spices', price: 350, category: 'lunch', rating: 4.9, canteen_id: 1, image: '/images/rice_crab_curry.jpg' },
  { id: 7, name: 'Rice & Dhal Curry', name_tamil: 'சாதம் பருப்பு கறி', description: 'Red lentil curry with coconut', price: 100, category: 'lunch', rating: 4.7, canteen_id: 1, image: '/images/rice_dhal_curry.jpg' },
  { id: 8, name: 'Rice & Potato Curry', name_tamil: 'சாதம் உருளை கறி', description: 'Spiced potato curry with curry leaves', price: 90, category: 'lunch', rating: 4.3, canteen_id: 1, image: '/images/rice_potato_curry.jpg' },
  { id: 9, name: 'Rice & Brinjal Curry', name_tamil: 'சாதம் கத்தரிக்காய் கறி', description: 'Eggplant curry with coconut gravy', price: 95, category: 'lunch', rating: 4.4, canteen_id: 1, image: '/images/rice_brinjal_curry.jpg' },
  { id: 10, name: 'Rice & Jackfruit Curry', name_tamil: 'சாதம் பலாப்பழ கறி', description: 'Young jackfruit curry with spices', price: 110, category: 'lunch', rating: 4.5, canteen_id: 1, image: '/images/rice_jackfruit_curry.jpg' },

  // Rotti Varieties
  { id: 11, name: 'Plain Rotti', name_tamil: 'வெற்று ரொட்டி', description: 'Traditional Sri Lankan flatbread', price: 40, category: 'breakfast', rating: 4.2, canteen_id: 1, image: '/images/plain_rotti.jpg' },
  { id: 12, name: 'Coconut Rotti', name_tamil: 'தேங்காய் ரொட்டி', description: 'Rotti mixed with fresh coconut', price: 50, category: 'breakfast', rating: 4.4, canteen_id: 1, image: '/images/coconut_rotti.jpg' },
  { id: 13, name: 'Onion Rotti', name_tamil: 'வெங்காய ரொட்டி', description: 'Rotti with caramelized onions', price: 55, category: 'breakfast', rating: 4.3, canteen_id: 1, image: '/images/onion_rotti.jpg' },
  { id: 14, name: 'Egg Rotti', name_tamil: 'முட்டை ரொட்டி', description: 'Rotti mixed with scrambled eggs', price: 70, category: 'breakfast', rating: 4.6, canteen_id: 1, image: '/images/egg_rotti.jpg' },
  { id: 15, name: 'Fish Rotti', name_tamil: 'மீன் ரொட்டி', description: 'Rotti with spiced fish filling', price: 85, category: 'breakfast', rating: 4.4, canteen_id: 1, image: '/images/fish_rotti.jpg' },

  // Hoppers & String Hoppers
  { id: 16, name: 'Plain Hoppers', name_tamil: 'வெற்று ஆப்பம்', description: 'Traditional bowl-shaped pancakes', price: 50, category: 'breakfast', rating: 4.3, canteen_id: 2, image: '/images/plain_hoppers.jpg' },
  { id: 17, name: 'Egg Hoppers', name_tamil: 'முட்டை ஆப்பம்', description: 'Hoppers with fried egg in center', price: 70, category: 'breakfast', rating: 4.7, canteen_id: 2, image: '/images/egg_hoppers.jpg' },
  { id: 18, name: 'String Hoppers', name_tamil: 'இடியாப்பம்', description: 'Steamed rice flour noodles', price: 60, category: 'breakfast', rating: 4.6, canteen_id: 2, image: '/images/string_hoppers.jpg' },
  { id: 19, name: 'Red String Hoppers', name_tamil: 'சிவப்பு இடியாப்பம்', description: 'String hoppers with red rice flour', price: 70, category: 'breakfast', rating: 4.4, canteen_id: 2, image: '/images/red_string_hoppers.jpg' },

  // Kottu Varieties
  { id: 20, name: 'Vegetable Kottu', name_tamil: 'காய்கறி கொட்டு', description: 'Mixed vegetable kottu rotti', price: 120, category: 'dinner', rating: 4.5, canteen_id: 1, image: '/images/vegetable_kottu.jpg' },
  { id: 21, name: 'Egg Kottu', name_tamil: 'முட்டை கொட்டு', description: 'Kottu with scrambled eggs', price: 140, category: 'dinner', rating: 4.6, canteen_id: 1, image: '/images/egg_kottu.jpg' },
  { id: 22, name: 'Chicken Kottu', name_tamil: 'கோழி கொட்டு', description: 'Spicy chicken kottu rotti', price: 180, category: 'dinner', rating: 4.8, canteen_id: 1, image: '/images/chicken_kottu.jpg' },
  { id: 23, name: 'Beef Kottu', name_tamil: 'மாட்டு கொட்டு', description: 'Rich beef kottu with vegetables', price: 200, category: 'dinner', rating: 4.7, canteen_id: 1, image: '/images/beef_kottu.jpg' },
  { id: 24, name: 'Seafood Kottu', name_tamil: 'கடல் உணவு கொட்டு', description: 'Mixed seafood kottu rotti', price: 250, category: 'dinner', rating: 4.8, canteen_id: 1, image: '/images/seafood_kottu.jpg' },

  // Fried Rice Varieties
  { id: 25, name: 'Vegetable Fried Rice', name_tamil: 'காய்கறி பொரித்த சாதம்', description: 'Mixed vegetable fried rice', price: 110, category: 'lunch', rating: 4.3, canteen_id: 2, image: '/images/vegetable_fried_rice.jpg' },
  { id: 26, name: 'Egg Fried Rice', name_tamil: 'முட்டை பொரித்த சாதம்', description: 'Fried rice with scrambled eggs', price: 130, category: 'lunch', rating: 4.5, canteen_id: 2, image: '/images/egg_fried_rice.jpg' },
  { id: 27, name: 'Chicken Fried Rice', name_tamil: 'கோழி பொரித்த சாதம்', description: 'Chicken fried rice with vegetables', price: 160, category: 'lunch', rating: 4.7, canteen_id: 2, image: '/images/chicken_fried_rice.jpg' },
  { id: 28, name: 'Seafood Fried Rice', name_tamil: 'கடல் உணவு பொரித்த சாதம்', description: 'Mixed seafood fried rice', price: 200, category: 'lunch', rating: 4.8, canteen_id: 2, image: '/images/seafood_fried_rice.jpg' },

  // Biriyani Varieties
  { id: 29, name: 'Chicken Biriyani', name_tamil: 'கோழி பிரியாணி', description: 'Traditional chicken biriyani', price: 200, category: 'lunch', rating: 4.8, canteen_id: 2, image: '/images/chicken_biriyani.jpg' },
  { id: 30, name: 'Mutton Biriyani', name_tamil: 'ஆட்டு பிரியாணி', description: 'Rich mutton biriyani with spices', price: 280, category: 'lunch', rating: 4.9, canteen_id: 2, image: '/images/mutton_biriyani.jpg' },
  { id: 31, name: 'Fish Biriyani', name_tamil: 'மீன் பிரியாணி', description: 'Coastal style fish biriyani', price: 220, category: 'lunch', rating: 4.6, canteen_id: 2, image: '/images/fish_biriyani.jpg' },

  // Short Eats & Snacks
  { id: 32, name: 'Fish Cutlets', name_tamil: 'மீன் கட்லெட்', description: 'Deep-fried fish patties', price: 60, category: 'breakfast', rating: 4.5, canteen_id: 1, image: '/images/fish_cutlets.jpg' },
  { id: 33, name: 'Chicken Cutlets', name_tamil: 'கோழி கட்லெட்', description: 'Spiced chicken cutlets', price: 70, category: 'breakfast', rating: 4.6, canteen_id: 1, image: '/images/chicken_cutlets.jpg' },
  { id: 34, name: 'Vegetable Cutlets', name_tamil: 'காய்கறி கட்லெட்', description: 'Mixed vegetable patties', price: 50, category: 'breakfast', rating: 4.3, canteen_id: 1, image: '/images/vegetable_cutlets.jpg' },
  { id: 35, name: 'Fish Rolls', name_tamil: 'மீன் ரோல்', description: 'Crispy fish rolls', price: 55, category: 'breakfast', rating: 4.4, canteen_id: 1, image: '/images/fish_rolls.jpg' },
  { id: 36, name: 'Chicken Rolls', name_tamil: 'கோழி ரோல்', description: 'Spiced chicken rolls', price: 65, category: 'breakfast', rating: 4.5, canteen_id: 1, image: '/images/chicken_rolls.jpg' },

  // Beverages
  { id: 37, name: 'Ceylon Black Tea', name_tamil: 'இலங்கை கருப்பு தேநீர்', description: 'Premium Ceylon black tea', price: 30, category: 'breakfast', rating: 4.7, canteen_id: 1, image: '/images/ceylon_black_tea.jpg' },
  { id: 38, name: 'Milk Tea', name_tamil: 'பால் தேநீர்', description: 'Tea with fresh milk', price: 35, category: 'breakfast', rating: 4.5, canteen_id: 1, image: '/images/milk_tea.jpg' },
  { id: 39, name: 'King Coconut', name_tamil: 'தேங்காய் நீர்', description: 'Fresh king coconut water', price: 50, category: 'breakfast', rating: 4.8, canteen_id: 2, image: '/images/king_coconut.jpg' },
  { id: 40, name: 'Lime Juice', name_tamil: 'எலுமிச்சை சாறு', description: 'Fresh lime juice', price: 40, category: 'breakfast', rating: 4.5, canteen_id: 2, image: '/images/lime_juice.jpg' },

  // School Supplies - Writing Materials
  { id: 41, name: 'Blue Ballpoint Pen', name_tamil: 'நீல பால்பாயிண்ட் பேனா', description: 'Smooth writing blue ink pen', price: 25, category: 'stationery', rating: 4.2, canteen_id: 1, image: '/images/blue_ballpoint_pen.jpg' },
  { id: 42, name: 'Black Ballpoint Pen', name_tamil: 'கருப்பு பால்பாயிண்ட் பேனா', description: 'Reliable black ink pen', price: 25, category: 'stationery', rating: 4.2, canteen_id: 1, image: '/images/black_ballpoint_pen.jpg' },
  { id: 43, name: 'Gel Pen Blue', name_tamil: 'ஜெல் பேனா நீலம்', description: 'Smooth gel ink pen', price: 35, category: 'stationery', rating: 4.3, canteen_id: 1, image: '/images/gel_pen_blue.jpg' },
  { id: 44, name: 'Fountain Pen', name_tamil: 'நீரூற்று பேனா', description: 'Classic fountain pen', price: 150, category: 'stationery', rating: 4.5, canteen_id: 1, image: '/images/fountain_pen.jpg' },
  { id: 45, name: 'Highlighter Yellow', name_tamil: 'மஞ்சள் ஹைலைட்டர்', description: 'Fluorescent yellow highlighter', price: 40, category: 'stationery', rating: 4.2, canteen_id: 1, image: '/images/highlighter_yellow.jpg' },

  // Pencils & Drawing
  { id: 46, name: 'HB Pencil', name_tamil: 'HB பென்சில்', description: 'Standard HB graphite pencil', price: 15, category: 'stationery', rating: 4.3, canteen_id: 1, image: '/images/hb_pencil.jpg' },
  { id: 47, name: '2B Pencil', name_tamil: '2B பென்சில்', description: 'Soft 2B graphite pencil', price: 18, category: 'stationery', rating: 4.2, canteen_id: 1, image: '/images/2b_pencil.jpg' },
  { id: 48, name: 'Mechanical Pencil', name_tamil: 'இயந்திர பென்சில்', description: '0.5mm mechanical pencil', price: 80, category: 'stationery', rating: 4.4, canteen_id: 1, image: '/images/mechanical_pencil.jpg' },
  { id: 49, name: 'Color Pencil Set 12', name_tamil: '12 வண்ண பென்சில் செட்', description: 'Set of 12 colored pencils', price: 180, category: 'stationery', rating: 4.5, canteen_id: 1, image: '/images/color_pencil_set_12.jpg' },
  { id: 50, name: 'Color Pencil Set 24', name_tamil: '24 வண்ண பென்சில் செட்', description: 'Set of 24 colored pencils', price: 320, category: 'stationery', rating: 4.6, canteen_id: 1, image: '/images/color_pencil_set_24.jpg' },

  // Notebooks & Paper
  { id: 51, name: 'Exercise Book 80 Pages', name_tamil: '80 பக்க பயிற்சி புத்தகம்', description: 'Ruled exercise book', price: 60, category: 'stationery', rating: 4.3, canteen_id: 2, image: '/images/exercise_book_80_pages.jpg' },
  { id: 52, name: 'Exercise Book 120 Pages', name_tamil: '120 பக்க பயிற்சி புத்தகம்', description: 'Large exercise book', price: 85, category: 'stationery', rating: 4.4, canteen_id: 2, image: '/images/exercise_book_120_pages.jpg' },
  { id: 53, name: 'Notebook A4 200 Pages', name_tamil: 'A4 200 பக்க குறிப்பேடு', description: 'A4 ruled notebook', price: 120, category: 'stationery', rating: 4.5, canteen_id: 2, image: '/images/notebook_a4_200_pages.jpg' },
  { id: 54, name: 'Graph Book A4', name_tamil: 'A4 வரைபட புத்தகம்', description: 'A4 graph paper book', price: 90, category: 'stationery', rating: 4.2, canteen_id: 2, image: '/images/graph_book_a4.jpg' },
  { id: 55, name: 'Drawing Book A4', name_tamil: 'A4 வரைதல் புத்தகம்', description: 'A4 drawing paper book', price: 100, category: 'stationery', rating: 4.3, canteen_id: 2, image: '/images/drawing_book_a4.jpg' },

  // More Rice & Curry Varieties
  { id: 59, name: 'Rice & Squid Curry', name_tamil: 'சாதம் கணவாய் கறி', description: 'Tender squid curry with onions', price: 200, category: 'lunch', rating: 4.4, canteen_id: 1, image: '/images/rice_squid_curry.jpg' },
  { id: 60, name: 'Rice & Okra Curry', name_tamil: 'சாதம் வெண்டைக்காய் கறி', description: 'Lady finger curry with onions', price: 85, category: 'lunch', rating: 4.2, canteen_id: 1, image: '/images/rice_okra_curry.jpg' },
  { id: 61, name: 'Rice & Pumpkin Curry', name_tamil: 'சாதம் பூசணி கறி', description: 'Sweet pumpkin curry with coconut', price: 80, category: 'lunch', rating: 4.3, canteen_id: 1, image: '/images/rice_pumpkin_curry.jpg' },
  { id: 62, name: 'Rice & Drumstick Curry', name_tamil: 'சாதம் முருங்கைக்காய் கறி', description: 'Drumstick curry with coconut milk', price: 95, category: 'lunch', rating: 4.4, canteen_id: 1, image: '/images/rice_drumstick_curry.jpg' },
  { id: 63, name: 'Rice & Bitter Gourd Curry', name_tamil: 'சாதம் பாகல் கறி', description: 'Bitter gourd curry with onions', price: 90, category: 'lunch', rating: 4.1, canteen_id: 1, image: '/images/rice_bitter_gourd_curry.jpg' },
  { id: 64, name: 'Rice & Green Bean Curry', name_tamil: 'சாதம் பீன்ஸ் கறி', description: 'Fresh green beans with coconut', price: 85, category: 'lunch', rating: 4.3, canteen_id: 1, image: '/images/rice_green_bean_curry.jpg' },
  { id: 65, name: 'Rice & Cabbage Curry', name_tamil: 'சாதம் முட்டைகோஸ் கறி', description: 'Spiced cabbage with curry leaves', price: 75, category: 'lunch', rating: 4.2, canteen_id: 1, image: '/images/rice_cabbage_curry.jpg' },
  { id: 66, name: 'Rice & Carrot Curry', name_tamil: 'சாதம் கேரட் கறி', description: 'Sweet carrot curry with coconut', price: 80, category: 'lunch', rating: 4.3, canteen_id: 1, image: '/images/rice_carrot_curry.jpg' },

  // More Rotti Varieties
  { id: 67, name: 'Chili Rotti', name_tamil: 'மிளகாய் ரொட்டி', description: 'Spicy rotti with green chilies', price: 60, category: 'breakfast', rating: 4.5, canteen_id: 1, image: '/images/chili_rotti.jpg' },
  { id: 68, name: 'Chicken Rotti', name_tamil: 'கோழி ரொட்டி', description: 'Rotti with chicken curry filling', price: 90, category: 'breakfast', rating: 4.7, canteen_id: 1, image: '/images/chicken_rotti.jpg' },
  { id: 69, name: 'Mutton Rotti', name_tamil: 'ஆட்டு ரொட்டி', description: 'Rotti with spiced mutton filling', price: 110, category: 'breakfast', rating: 4.6, canteen_id: 1, image: '/images/mutton_rotti.jpg' },
  { id: 70, name: 'Cheese Rotti', name_tamil: 'சீஸ் ரொட்டி', description: 'Rotti with melted cheese', price: 80, category: 'breakfast', rating: 4.4, canteen_id: 1, image: '/images/cheese_rotti.jpg' },

  // More Hoppers
  { id: 71, name: 'Milk Hoppers', name_tamil: 'பால் ஆப்பம்', description: 'Sweet hoppers made with coconut milk', price: 60, category: 'breakfast', rating: 4.4, canteen_id: 2, image: '/images/milk_hoppers.jpg' },
  { id: 72, name: 'Honey Hoppers', name_tamil: 'தேன் ஆப்பம்', description: 'Hoppers drizzled with pure honey', price: 80, category: 'breakfast', rating: 4.5, canteen_id: 2, image: '/images/honey_hoppers.jpg' },
  { id: 73, name: 'Kiri Hodi with Hoppers', name_tamil: 'கிரி ஹொடி ஆப்பம்', description: 'Hoppers with coconut milk gravy', price: 90, category: 'breakfast', rating: 4.6, canteen_id: 2, image: '/images/kiri_hodi_with_hoppers.jpg' },

  // More Kottu Varieties
  { id: 74, name: 'Mutton Kottu', name_tamil: 'ஆட்டு கொட்டு', description: 'Traditional mutton kottu rotti', price: 220, category: 'dinner', rating: 4.6, canteen_id: 1, image: '/images/mutton_kottu.jpg' },
  { id: 75, name: 'Cheese Kottu', name_tamil: 'சீஸ் கொட்டு', description: 'Kottu with melted cheese', price: 160, category: 'dinner', rating: 4.4, canteen_id: 1, image: '/images/cheese_kottu.jpg' },
  { id: 76, name: 'Mixed Kottu', name_tamil: 'கலப்பு கொட்டு', description: 'Kottu with chicken and egg', price: 190, category: 'dinner', rating: 4.7, canteen_id: 1, image: '/images/mixed_kottu.jpg' },

  // More Fried Rice
  { id: 77, name: 'Beef Fried Rice', name_tamil: 'மாட்டு பொரித்த சாதம்', description: 'Spicy beef fried rice', price: 180, category: 'lunch', rating: 4.6, canteen_id: 2, image: '/images/beef_fried_rice.jpg' },
  { id: 78, name: 'Pineapple Fried Rice', name_tamil: 'அன்னாசி பொரித்த சாதம்', description: 'Sweet pineapple fried rice', price: 150, category: 'lunch', rating: 4.4, canteen_id: 2, image: '/images/pineapple_fried_rice.jpg' },
  { id: 79, name: 'Mixed Fried Rice', name_tamil: 'கலப்பு பொரித்த சாதம்', description: 'Fried rice with chicken and prawns', price: 220, category: 'lunch', rating: 4.8, canteen_id: 2, image: '/images/mixed_fried_rice.jpg' },

  // More Noodles
  { id: 80, name: 'Vegetable Noodles', name_tamil: 'காய்கறி நூடுல்ஸ்', description: 'Stir-fried vegetable noodles', price: 100, category: 'dinner', rating: 4.2, canteen_id: 2, image: '/images/vegetable_noodles.jpg' },
  { id: 81, name: 'Egg Noodles', name_tamil: 'முட்டை நூடுல்ஸ்', description: 'Noodles with scrambled eggs', price: 120, category: 'dinner', rating: 4.4, canteen_id: 2, image: '/images/egg_noodles.jpg' },
  { id: 82, name: 'Chicken Noodles', name_tamil: 'கோழி நூடுல்ஸ்', description: 'Chicken noodles with vegetables', price: 150, category: 'dinner', rating: 4.6, canteen_id: 2, image: '/images/chicken_noodles.jpg' },
  { id: 83, name: 'Beef Noodles', name_tamil: 'மாட்டு நூடுல்ஸ்', description: 'Spicy beef noodles', price: 170, category: 'dinner', rating: 4.5, canteen_id: 2, image: '/images/beef_noodles.jpg' },
  { id: 84, name: 'Seafood Noodles', name_tamil: 'கடல் உணவு நூடுல்ஸ்', description: 'Mixed seafood noodles', price: 190, category: 'dinner', rating: 4.7, canteen_id: 2, image: '/images/seafood_noodles.jpg' },

  // More Biriyani
  { id: 85, name: 'Vegetable Biriyani', name_tamil: 'காய்கறி பிரியாணி', description: 'Fragrant vegetable biriyani', price: 150, category: 'lunch', rating: 4.4, canteen_id: 2, image: '/images/vegetable_biriyani.jpg' },
  { id: 86, name: 'Prawn Biriyani', name_tamil: 'இறால் பிரியாணி', description: 'Spicy prawn biriyani', price: 300, category: 'lunch', rating: 4.8, canteen_id: 2, image: '/images/prawn_biriyani.jpg' },
  { id: 87, name: 'Mixed Biriyani', name_tamil: 'கலப்பு பிரியாணி', description: 'Biriyani with chicken and mutton', price: 320, category: 'lunch', rating: 4.9, canteen_id: 2, image: '/images/mixed_biriyani.jpg' },

  // More Short Eats
  { id: 88, name: 'Vegetable Rolls', name_tamil: 'காய்கறி ரோல்', description: 'Mixed vegetable rolls', price: 45, category: 'breakfast', rating: 4.2, canteen_id: 1, image: '/images/vegetable_rolls.jpg' },
  { id: 89, name: 'Fish Patties', name_tamil: 'மீன் பாட்டி', description: 'Flaky pastry with fish filling', price: 70, category: 'breakfast', rating: 4.4, canteen_id: 2, image: '/images/fish_patties.jpg' },
  { id: 90, name: 'Chicken Patties', name_tamil: 'கோழி பாட்டி', description: 'Chicken filled pastries', price: 75, category: 'breakfast', rating: 4.5, canteen_id: 2, image: '/images/chicken_patties.jpg' },
  { id: 91, name: 'Vegetable Patties', name_tamil: 'காய்கறி பாட்டி', description: 'Vegetable filled pastries', price: 60, category: 'breakfast', rating: 4.3, canteen_id: 2, image: '/images/vegetable_patties.jpg' },
  { id: 92, name: 'Fish Buns', name_tamil: 'மீன் பன்', description: 'Soft buns with spicy fish', price: 65, category: 'breakfast', rating: 4.4, canteen_id: 2, image: '/images/fish_buns.jpg' },
  { id: 93, name: 'Chicken Buns', name_tamil: 'கோழி பன்', description: 'Chicken filled soft buns', price: 70, category: 'breakfast', rating: 4.5, canteen_id: 2, image: '/images/chicken_buns.jpg' },
  { id: 94, name: 'Egg Buns', name_tamil: 'முட்டை பன்', description: 'Soft buns with boiled egg', price: 55, category: 'breakfast', rating: 4.3, canteen_id: 2, image: '/images/egg_buns.jpg' },

  // More Beverages
  { id: 95, name: 'Ginger Tea', name_tamil: 'இஞ்சி தேநீர்', description: 'Spiced ginger tea', price: 40, category: 'breakfast', rating: 4.4, canteen_id: 1, image: '/images/ginger_tea.jpg' },
  { id: 96, name: 'Lemon Tea', name_tamil: 'எலுமிச்சை தேநீர்', description: 'Refreshing lemon tea', price: 35, category: 'breakfast', rating: 4.3, canteen_id: 1, image: '/images/lemon_tea.jpg' },
  { id: 97, name: 'Plain Coffee', name_tamil: 'வெற்று காபி', description: 'Strong black coffee', price: 40, category: 'breakfast', rating: 4.2, canteen_id: 1, image: '/images/plain_coffee.jpg' },
  { id: 98, name: 'Milk Coffee', name_tamil: 'பால் காபி', description: 'Coffee with fresh milk', price: 45, category: 'breakfast', rating: 4.4, canteen_id: 1, image: '/images/milk_coffee.jpg' },
  { id: 99, name: 'Orange Juice', name_tamil: 'ஆரஞ்சு சாறு', description: 'Fresh orange juice', price: 60, category: 'breakfast', rating: 4.6, canteen_id: 2, image: '/images/orange_juice.jpg' },
  { id: 100, name: 'Pineapple Juice', name_tamil: 'அன்னாசி சாறு', description: 'Fresh pineapple juice', price: 55, category: 'breakfast', rating: 4.4, canteen_id: 2, image: '/images/pineapple_juice.jpg' },
  { id: 101, name: 'Mango Juice', name_tamil: 'மாம்பழ சாறு', description: 'Fresh mango juice', price: 70, category: 'breakfast', rating: 4.7, canteen_id: 2, image: '/images/mango_juice.jpg' },
  { id: 102, name: 'Passion Fruit Juice', name_tamil: 'பேஷன் பழ சாறு', description: 'Tangy passion fruit juice', price: 65, category: 'breakfast', rating: 4.5, canteen_id: 2, image: '/images/passion_fruit_juice.jpg' },
  { id: 103, name: 'Wood Apple Juice', name_tamil: 'விளாம்பழ சாறு', description: 'Traditional wood apple juice', price: 60, category: 'breakfast', rating: 4.3, canteen_id: 2, image: '/images/wood_apple_juice.jpg' },
  { id: 104, name: 'Faluda', name_tamil: 'பலூடா', description: 'Sweet drink with jelly and ice cream', price: 80, category: 'dinner', rating: 4.6, canteen_id: 2, image: '/images/faluda.jpg' },

  // Traditional Sri Lankan Desserts
  { id: 105, name: 'Watalappan', name_tamil: 'வட்டலப்பன்', description: 'Traditional coconut custard pudding', price: 60, category: 'dinner', rating: 4.8, canteen_id: 2, image: '/images/watalappan.jpg' },
  { id: 106, name: 'Kokis', name_tamil: 'கொக்கிஸ்', description: 'Crispy deep-fried sweet snack', price: 40, category: 'breakfast', rating: 4.5, canteen_id: 1, image: '/images/kokis.jpg' },
  { id: 107, name: 'Kavum', name_tamil: 'கவும்', description: 'Traditional oil cake', price: 35, category: 'breakfast', rating: 4.4, canteen_id: 1, image: '/images/kavum.jpg' },
  { id: 108, name: 'Athirasa', name_tamil: 'அதிரசா', description: 'Sweet rice flour pancake', price: 45, category: 'breakfast', rating: 4.6, canteen_id: 1, image: '/images/athirasa.jpg' },
  { id: 109, name: 'Kiribath', name_tamil: 'கிரிபத்', description: 'Coconut milk rice', price: 50, category: 'breakfast', rating: 4.3, canteen_id: 2, image: '/images/kiribath.jpg' },
  { id: 110, name: 'Curd & Treacle', name_tamil: 'தயிர் பனிவெல்லம்', description: 'Buffalo curd with palm treacle', price: 70, category: 'dinner', rating: 4.7, canteen_id: 2, image: '/images/curd_treacle.jpg' },

  // More School Supplies
  { id: 111, name: 'Red Ballpoint Pen', name_tamil: 'சிவப்பு பால்பாயிண்ட் பேனா', description: 'Red ink pen for corrections', price: 25, category: 'stationery', rating: 4.0, canteen_id: 1, image: '/images/red_ballpoint_pen.jpg' },
  { id: 112, name: 'Gel Pen Black', name_tamil: 'ஜெல் பேனா கருப்பு', description: 'Premium gel ink pen', price: 35, category: 'stationery', rating: 4.3, canteen_id: 1, image: '/images/gel_pen_black.jpg' },
  { id: 113, name: 'Marker Pen Black', name_tamil: 'மார்க்கர் பேனா கருப்பு', description: 'Permanent marker pen', price: 45, category: 'stationery', rating: 4.1, canteen_id: 1, image: '/images/marker_pen_black.jpg' },
  { id: 114, name: 'Highlighter Pink', name_tamil: 'இளஞ்சிவப்பு ஹைலைட்டர்', description: 'Pink fluorescent highlighter', price: 40, category: 'stationery', rating: 4.2, canteen_id: 1, image: '/images/highlighter_pink.jpg' },
  { id: 115, name: '4B Pencil', name_tamil: '4B பென்சில்', description: 'Very soft 4B pencil', price: 20, category: 'stationery', rating: 4.1, canteen_id: 1, image: '/images/4b_pencil.jpg' },
  { id: 116, name: 'White Eraser', name_tamil: 'வெள்ளை அழிப்பான்', description: 'Standard white rubber eraser', price: 10, category: 'stationery', rating: 4.2, canteen_id: 1, image: '/images/white_eraser.jpg' },
  { id: 117, name: '15cm Ruler', name_tamil: '15 செ.மீ அளவுகோல்', description: '15cm plastic ruler', price: 25, category: 'stationery', rating: 4.1, canteen_id: 1, image: '/images/15cm_ruler.jpg' },
  { id: 118, name: 'Geometry Box', name_tamil: 'வடிவியல் பெட்டி', description: 'Complete geometry set', price: 250, category: 'stationery', rating: 4.5, canteen_id: 1, image: '/images/geometry_box.jpg' },
  { id: 119, name: 'Notebook A5 100 Pages', name_tamil: 'A5 100 பக்க குறிப்பேடு', description: 'Compact A5 notebook', price: 80, category: 'stationery', rating: 4.3, canteen_id: 2, image: '/images/notebook_a5_100_pages.jpg' },
  { id: 120, name: 'Spiral Notebook', name_tamil: 'சுழல் குறிப்பேடு', description: 'Wire-bound spiral notebook', price: 95, category: 'stationery', rating: 4.4, canteen_id: 2, image: '/images/spiral_notebook.jpg' },

  // More Traditional Sri Lankan Foods
  { id: 124, name: 'Pittu', name_tamil: 'பிட்டு', description: 'Steamed rice flour with coconut', price: 65, category: 'breakfast', rating: 4.5, canteen_id: 2, image: '/images/pittu.jpg' },
  { id: 125, name: 'Appa', name_tamil: 'ஆப்பா', description: 'Fermented rice pancake', price: 45, category: 'breakfast', rating: 4.3, canteen_id: 2, image: '/images/appa.jpg' },
  { id: 126, name: 'Pol Sambol', name_tamil: 'பொல் சம்பொல்', description: 'Spicy coconut relish', price: 30, category: 'lunch', rating: 4.6, canteen_id: 1, image: '/images/pol_sambol.jpg' },
  { id: 127, name: 'Seeni Sambol', name_tamil: 'சீனி சம்பொல்', description: 'Sweet onion relish', price: 35, category: 'lunch', rating: 4.4, canteen_id: 1, image: '/images/seeni_sambol.jpg' },
  { id: 128, name: 'Lunu Miris', name_tamil: 'லுனு மிரிஸ்', description: 'Spicy chili paste', price: 25, category: 'lunch', rating: 4.7, canteen_id: 1, image: '/images/lunu_miris.jpg' },
  { id: 129, name: 'Gotukola Sambol', name_tamil: 'கொட்டுகொல சம்பொல்', description: 'Pennywort salad', price: 40, category: 'lunch', rating: 4.2, canteen_id: 1, image: '/images/gotukola_sambol.jpg' },
  { id: 130, name: 'Mallum', name_tamil: 'மல்லும்', description: 'Chopped green leaves with coconut', price: 45, category: 'lunch', rating: 4.3, canteen_id: 1, image: '/images/mallum.jpg' },
  { id: 131, name: 'Parippu', name_tamil: 'பரிப்பு', description: 'Spiced lentil curry', price: 55, category: 'lunch', rating: 4.5, canteen_id: 1, image: '/images/parippu.jpg' },
  { id: 132, name: 'Ambulthiyal', name_tamil: 'அம்புல்தியல்', description: 'Sour fish curry', price: 120, category: 'lunch', rating: 4.6, canteen_id: 1, image: '/images/ambulthiyal.jpg' },
  { id: 133, name: 'Mas Curry', name_tamil: 'மாஸ் கறி', description: 'Traditional fish curry', price: 140, category: 'lunch', rating: 4.7, canteen_id: 1, image: '/images/mas_curry.jpg' },

  // More Rice Varieties
  { id: 134, name: 'Red Rice & Curry', name_tamil: 'சிவப்பு சாதம் கறி', description: 'Healthy red rice with curry', price: 95, category: 'lunch', rating: 4.4, canteen_id: 1, image: '/images/red_rice_curry.jpg' },
  { id: 135, name: 'Basmati Rice & Curry', name_tamil: 'பாஸ்மதி சாதம் கறி', description: 'Fragrant basmati rice with curry', price: 110, category: 'lunch', rating: 4.5, canteen_id: 1, image: '/images/basmati_rice_curry.jpg' },
  { id: 136, name: 'Mixed Rice', name_tamil: 'கலப்பு சாதம்', description: 'Rice with multiple curries', price: 160, category: 'lunch', rating: 4.6, canteen_id: 1, image: '/images/mixed_rice.jpg' },
  { id: 137, name: 'Ghee Rice', name_tamil: 'நெய் சாதம்', description: 'Fragrant rice cooked in ghee', price: 85, category: 'lunch', rating: 4.3, canteen_id: 2, image: '/images/ghee_rice.jpg' },
  { id: 138, name: 'Coconut Rice', name_tamil: 'தேங்காய் சாதம்', description: 'Rice cooked with coconut milk', price: 75, category: 'lunch', rating: 4.4, canteen_id: 2, image: '/images/coconut_rice.jpg' },

  // More Breakfast Items
  { id: 139, name: 'Thosai', name_tamil: 'தோசை', description: 'South Indian crepe', price: 50, category: 'breakfast', rating: 4.5, canteen_id: 2, image: '/images/thosai.jpg' },
  { id: 140, name: 'Masala Thosai', name_tamil: 'மசாலா தோசை', description: 'Thosai with spiced potato filling', price: 70, category: 'breakfast', rating: 4.6, canteen_id: 2, image: '/images/masala_thosai.jpg' },
  { id: 141, name: 'Rava Thosai', name_tamil: 'ரவா தோசை', description: 'Crispy semolina crepe', price: 60, category: 'breakfast', rating: 4.4, canteen_id: 2, image: '/images/rava_thosai.jpg' },
  { id: 142, name: 'Idli', name_tamil: 'இட்லி', description: 'Steamed rice cakes', price: 45, category: 'breakfast', rating: 4.3, canteen_id: 2, image: '/images/idli.jpg' },
  { id: 143, name: 'Vada', name_tamil: 'வடை', description: 'Fried lentil donuts', price: 40, category: 'breakfast', rating: 4.4, canteen_id: 2, image: '/images/vada.jpg' },
  { id: 144, name: 'Upma', name_tamil: 'உப்மா', description: 'Semolina porridge with vegetables', price: 55, category: 'breakfast', rating: 4.2, canteen_id: 2, image: '/images/upma.jpg' },
  { id: 145, name: 'Pongal', name_tamil: 'பொங்கல்', description: 'Rice and lentil porridge', price: 60, category: 'breakfast', rating: 4.5, canteen_id: 2, image: '/images/pongal.jpg' },

  // More Dinner Items
  { id: 146, name: 'Lamprais', name_tamil: 'லம்ப்ரைஸ்', description: 'Dutch Burgher rice packet', price: 280, category: 'dinner', rating: 4.8, canteen_id: 2, image: '/images/lamprais.jpg' },
  { id: 147, name: 'String Hopper Biriyani', name_tamil: 'இடியாப்பம் பிரியாணி', description: 'String hoppers with biriyani spices', price: 150, category: 'dinner', rating: 4.5, canteen_id: 2, image: '/images/string_hopper_biriyani.jpg' },
  { id: 148, name: 'Devilled Chicken', name_tamil: 'டெவில்ட் சிக்கன்', description: 'Spicy stir-fried chicken', price: 220, category: 'dinner', rating: 4.7, canteen_id: 1, image: '/images/devilled_chicken.jpg' },
  { id: 149, name: 'Devilled Beef', name_tamil: 'டெவில்ட் பீஃப்', description: 'Spicy stir-fried beef', price: 240, category: 'dinner', rating: 4.6, canteen_id: 1, image: '/images/devilled_beef.jpg' },
  { id: 150, name: 'Devilled Pork', name_tamil: 'டெவில்ட் போர்க்', description: 'Spicy stir-fried pork', price: 250, category: 'dinner', rating: 4.5, canteen_id: 1, image: '/images/devilled_pork.jpg' },

  // More Beverages
  { id: 151, name: 'Thambili', name_tamil: 'தம்பிலி', description: 'Young coconut water', price: 45, category: 'breakfast', rating: 4.8, canteen_id: 2, image: '/images/thambili.jpg' },
  { id: 152, name: 'Beli Juice', name_tamil: 'பேலி ஜூஸ்', description: 'Wood apple juice', price: 55, category: 'breakfast', rating: 4.3, canteen_id: 2, image: '/images/beli_juice.jpg' },
  { id: 153, name: 'Nelli Juice', name_tamil: 'நெல்லி ஜூஸ்', description: 'Indian gooseberry juice', price: 50, category: 'breakfast', rating: 4.4, canteen_id: 2, image: '/images/nelli_juice.jpg' },
  { id: 154, name: 'Kurumba', name_tamil: 'குரும்பா', description: 'Fresh tender coconut', price: 60, category: 'breakfast', rating: 4.7, canteen_id: 2, image: '/images/kurumba.jpg' },
  { id: 155, name: 'Lassi', name_tamil: 'லஸ்ஸி', description: 'Yogurt-based drink', price: 65, category: 'breakfast', rating: 4.5, canteen_id: 2, image: '/images/lassi.jpg' },
  { id: 156, name: 'Buttermilk', name_tamil: 'மோர்', description: 'Spiced buttermilk', price: 40, category: 'breakfast', rating: 4.3, canteen_id: 2, image: '/images/buttermilk.jpg' },

  // More Stationery Items
  { id: 157, name: 'Pink Eraser', name_tamil: 'இளஞ்சிவப்பு அழிப்பான்', description: 'Soft pink eraser', price: 12, category: 'stationery', rating: 4.1, canteen_id: 1, image: '/images/pink_eraser.jpg' },
  { id: 158, name: 'Correction Pen', name_tamil: 'திருத்தும் பேனா', description: 'White correction fluid pen', price: 45, category: 'stationery', rating: 4.0, canteen_id: 1, image: '/images/correction_pen.jpg' },
  { id: 159, name: '30cm Ruler', name_tamil: '30 செ.மீ அளவுகோல்', description: '30cm plastic ruler', price: 30, category: 'stationery', rating: 4.2, canteen_id: 1, image: '/images/30cm_ruler.jpg' },
  { id: 160, name: 'Compass', name_tamil: 'திசைகாட்டி', description: 'Mathematical compass', price: 120, category: 'stationery', rating: 4.3, canteen_id: 1, image: '/images/compass.jpg' },
  { id: 161, name: 'Protractor', name_tamil: 'கோணமானி', description: 'Semicircular protractor', price: 35, category: 'stationery', rating: 4.2, canteen_id: 1, image: '/images/protractor.jpg' },
  { id: 162, name: 'Plain Book A4', name_tamil: 'A4 வெற்று புத்தகம்', description: 'A4 plain paper book', price: 85, category: 'stationery', rating: 4.1, canteen_id: 2, image: '/images/plain_book_a4.jpg' },
  { id: 163, name: 'Manila Folder', name_tamil: 'மணிலா கோப்பு', description: 'Brown manila folder', price: 20, category: 'stationery', rating: 4.1, canteen_id: 2, image: '/images/manila_folder.jpg' },
  { id: 164, name: 'Stapler Small', name_tamil: 'சிறிய ஸ்டேப்லர்', description: 'Desktop stapler', price: 120, category: 'stationery', rating: 4.2, canteen_id: 2, image: '/images/stapler_small.jpg' },
  { id: 165, name: 'Glue Stick', name_tamil: 'பசை குச்சி', description: 'Non-toxic glue stick', price: 35, category: 'stationery', rating: 4.1, canteen_id: 2, image: '/images/glue_stick.jpg' },
  { id: 166, name: 'Sticky Notes', name_tamil: 'ஒட்டும் குறிப்புகள்', description: 'Yellow sticky note pad', price: 60, category: 'stationery', rating: 4.3, canteen_id: 2, image: '/images/sticky_notes.jpg' },

  // More Traditional Sweets
  { id: 167, name: 'Aluwa', name_tamil: 'அலுவா', description: 'Traditional sweet made with rice flour', price: 50, category: 'breakfast', rating: 4.4, canteen_id: 1, image: '/images/aluwa.jpg' },
  { id: 168, name: 'Dodol', name_tamil: 'டோடோல்', description: 'Sticky sweet made with coconut', price: 45, category: 'breakfast', rating: 4.5, canteen_id: 1, image: '/images/dodol.jpg' },
  { id: 169, name: 'Halapa', name_tamil: 'ஹலாபா', description: 'Steamed rice flour cake', price: 40, category: 'breakfast', rating: 4.3, canteen_id: 1, image: '/images/halapa.jpg' },
  { id: 170, name: 'Aggala', name_tamil: 'அக்கல', description: 'Sesame and jaggery balls', price: 35, category: 'breakfast', rating: 4.4, canteen_id: 1, image: '/images/aggala.jpg' },
  { id: 171, name: 'Thalaguli', name_tamil: 'தலகுலி', description: 'Sesame oil cake', price: 30, category: 'breakfast', rating: 4.2, canteen_id: 1, image: '/images/thalaguli.jpg' },

  // More Curries
  { id: 172, name: 'Kankun Curry', name_tamil: 'கங்குன் கறி', description: 'Water spinach curry', price: 70, category: 'lunch', rating: 4.3, canteen_id: 1, image: '/images/kankun_curry.jpg' },
  { id: 173, name: 'Mukunuwenna Curry', name_tamil: 'முகுனுவென்னா கறி', description: 'Balloon vine curry', price: 65, category: 'lunch', rating: 4.2, canteen_id: 1, image: '/images/mukunuwenna_curry.jpg' },
  { id: 174, name: 'Hathawariya Curry', name_tamil: 'ஹதவரியா கறி', description: 'Asparagus curry', price: 85, category: 'lunch', rating: 4.4, canteen_id: 1, image: '/images/hathawariya_curry.jpg' },
  { id: 175, name: 'Kohila Curry', name_tamil: 'கொஹிலா கறி', description: 'Lasia spinosa curry', price: 90, category: 'lunch', rating: 4.3, canteen_id: 1, image: '/images/kohila_curry.jpg' },
  { id: 176, name: 'Nelum Ala Curry', name_tamil: 'நேலும் அலா கறி', description: 'Lotus root curry', price: 95, category: 'lunch', rating: 4.5, canteen_id: 1, image: '/images/nelum_ala_curry.jpg' },

  // More Seafood
  { id: 177, name: 'Tuna Curry', name_tamil: 'டுனா கறி', description: 'Spicy tuna fish curry', price: 160, category: 'lunch', rating: 4.6, canteen_id: 1, image: '/images/tuna_curry.jpg' },
  { id: 178, name: 'Mackerel Curry', name_tamil: 'மேக்கரல் கறி', description: 'Traditional mackerel curry', price: 140, category: 'lunch', rating: 4.5, canteen_id: 1, image: '/images/mackerel_curry.jpg' },
  { id: 179, name: 'Sardine Curry', name_tamil: 'சார்டின் கறி', description: 'Spiced sardine curry', price: 120, category: 'lunch', rating: 4.4, canteen_id: 1, image: '/images/sardine_curry.jpg' },
  { id: 180, name: 'Dried Fish Curry', name_tamil: 'காய்ந்த மீன் கறி', description: 'Traditional dried fish curry', price: 100, category: 'lunch', rating: 4.3, canteen_id: 1, image: '/images/dried_fish_curry.jpg' },

  // More Snacks
  { id: 181, name: 'Isso Vadai', name_tamil: 'இஸ்ஸோ வடை', description: 'Prawn fritters', price: 80, category: 'breakfast', rating: 4.5, canteen_id: 2, image: '/images/isso_vadai.jpg' },
  { id: 182, name: 'Ulundu Vadai', name_tamil: 'உளுந்து வடை', description: 'Black gram fritters', price: 45, category: 'breakfast', rating: 4.3, canteen_id: 2, image: '/images/ulundu_vadai.jpg' },
  { id: 183, name: 'Masala Vadai', name_tamil: 'மசாலா வடை', description: 'Spiced lentil fritters', price: 50, category: 'breakfast', rating: 4.4, canteen_id: 2, image: '/images/masala_vadai.jpg' },
  { id: 184, name: 'Bondas', name_tamil: 'போண்டாஸ்', description: 'Deep-fried potato balls', price: 40, category: 'breakfast', rating: 4.2, canteen_id: 2, image: '/images/bondas.jpg' },
  { id: 185, name: 'Samosas', name_tamil: 'சமோசா', description: 'Triangular pastry with filling', price: 35, category: 'breakfast', rating: 4.3, canteen_id: 2, image: '/images/samosas.jpg' },

  // More Noodle Varieties
  { id: 186, name: 'Singapore Noodles', name_tamil: 'சிங்கப்பூர் நூடுல்ஸ்', description: 'Curry-flavored rice noodles', price: 160, category: 'dinner', rating: 4.5, canteen_id: 2, image: '/images/singapore_noodles.jpg' },
  { id: 187, name: 'Hakka Noodles', name_tamil: 'ஹக்கா நூடுல்ஸ்', description: 'Indo-Chinese style noodles', price: 140, category: 'dinner', rating: 4.4, canteen_id: 2, image: '/images/hakka_noodles.jpg' },
  { id: 188, name: 'Schezwan Noodles', name_tamil: 'ஷெஸ்வான் நூடுல்ஸ்', description: 'Spicy Schezwan noodles', price: 150, category: 'dinner', rating: 4.6, canteen_id: 2, image: '/images/schezwan_noodles.jpg' },
  { id: 189, name: 'Pad Thai', name_tamil: 'பேட் தாய்', description: 'Thai-style stir-fried noodles', price: 180, category: 'dinner', rating: 4.7, canteen_id: 2, image: '/images/pad_thai.jpg' },

  // More Rice Dishes
  { id: 190, name: 'Yang Chow Fried Rice', name_tamil: 'யாங் சௌ பொரித்த சாதம்', description: 'Chinese-style fried rice', price: 170, category: 'lunch', rating: 4.5, canteen_id: 2, image: '/images/yang_chow_fried_rice.jpg' },
  { id: 191, name: 'Thai Fried Rice', name_tamil: 'தாய் பொரித்த சாதம்', description: 'Thai-style fried rice', price: 160, category: 'lunch', rating: 4.4, canteen_id: 2, image: '/images/thai_fried_rice.jpg' },
  { id: 192, name: 'Mushroom Fried Rice', name_tamil: 'காளான் பொரித்த சாதம்', description: 'Fried rice with mushrooms', price: 140, category: 'lunch', rating: 4.3, canteen_id: 2, image: '/images/mushroom_fried_rice.jpg' },

  // More Beverages
  { id: 193, name: 'Iced Coffee', name_tamil: 'பனிக்கட்டி காபி', description: 'Cold coffee with ice', price: 60, category: 'breakfast', rating: 4.4, canteen_id: 1, image: '/images/iced_coffee.jpg' },
  { id: 194, name: 'Iced Tea', name_tamil: 'பனிக்கட்டி தேநீர்', description: 'Cold tea with ice', price: 50, category: 'breakfast', rating: 4.3, canteen_id: 1, image: '/images/iced_tea.jpg' },
  { id: 195, name: 'Fresh Lime Soda', name_tamil: 'புதிய எலுமிச்சை சோடா', description: 'Fresh lime with soda', price: 45, category: 'breakfast', rating: 4.5, canteen_id: 2, image: '/images/fresh_lime_soda.jpg' },
  { id: 196, name: 'Ginger Lime', name_tamil: 'இஞ்சி எலுமிச்சை', description: 'Ginger and lime drink', price: 50, category: 'breakfast', rating: 4.4, canteen_id: 2, image: '/images/ginger_lime.jpg' },
  { id: 197, name: 'Mint Lime', name_tamil: 'புதினா எலுமிச்சை', description: 'Mint and lime cooler', price: 55, category: 'breakfast', rating: 4.6, canteen_id: 2, image: '/images/mint_lime.jpg' },

  // Final Items to Complete 200+
  { id: 198, name: 'Chocolate Milk', name_tamil: 'சாக்லேட் பால்', description: 'Cold chocolate flavored milk', price: 70, category: 'breakfast', rating: 4.5, canteen_id: 2, image: '/images/chocolate_milk.jpg' },
  { id: 199, name: 'Vanilla Milk', name_tamil: 'வெனிலா பால்', description: 'Vanilla flavored milk', price: 65, category: 'breakfast', rating: 4.3, canteen_id: 2, image: '/images/vanilla_milk.jpg' },
  { id: 200, name: 'Strawberry Milk', name_tamil: 'ஸ்ட்ராபெரி பால்', description: 'Strawberry flavored milk', price: 70, category: 'breakfast', rating: 4.4, canteen_id: 2, image: '/images/strawberry_milk.jpg' },

  // Calculators & Electronics
  { id: 201, name: 'Basic Calculator', name_tamil: 'அடிப்படை கணிப்பான்', description: '8-digit basic calculator', price: 300, category: 'stationery', rating: 4.2, canteen_id: 2, image: '/images/basic_calculator.jpg' },
  { id: 202, name: 'Scientific Calculator', name_tamil: 'அறிவியல் கணிப்பான்', description: 'Advanced scientific calculator', price: 800, category: 'stationery', rating: 4.6, canteen_id: 2, image: '/images/scientific_calculator.jpg' },
  { id: 203, name: 'Graphing Calculator', name_tamil: 'வரைபட கணிப்பான்', description: 'Programmable graphing calculator', price: 2500, category: 'stationery', rating: 4.8, canteen_id: 2, image: '/images/graphing_calculator.jpg' }
];

export const getMenuByCategory = (canteenId, category) => {
  return menuItems.filter(item => 
    item.canteen_id == canteenId && item.category === category
  );
};

export const getAllMenuItems = () => menuItems;