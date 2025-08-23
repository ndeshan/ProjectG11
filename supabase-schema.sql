-- Supabase Database Schema for Sri Lankan Campus Canteen

-- Canteens table
CREATE TABLE canteens (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  current_queue_count INTEGER DEFAULT 0,
  estimated_wait_time INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Menu Items table
CREATE TABLE menu_items (
  id BIGSERIAL PRIMARY KEY,
  canteen_id BIGINT REFERENCES canteens(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  name_tamil VARCHAR(255),
  description TEXT,
  price DECIMAL(8,2) NOT NULL,
  category VARCHAR(50) NOT NULL,
  image_url VARCHAR(500),
  is_available BOOLEAN DEFAULT true,
  preparation_time INTEGER DEFAULT 5,
  rating DECIMAL(3,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT DEFAULT 1,
  canteen_id BIGINT REFERENCES canteens(id) ON DELETE CASCADE,
  order_number VARCHAR(255) UNIQUE NOT NULL,
  items JSONB NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  payment_status VARCHAR(50) DEFAULT 'pending',
  payment_method VARCHAR(100),
  pickup_time TIMESTAMP WITH TIME ZONE,
  ready_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Queue Status table
CREATE TABLE queue_status (
  id BIGSERIAL PRIMARY KEY,
  canteen_id BIGINT REFERENCES canteens(id) ON DELETE CASCADE,
  current_queue_length INTEGER NOT NULL,
  estimated_wait_time INTEGER NOT NULL,
  peak_status VARCHAR(20) DEFAULT 'low',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample data
INSERT INTO canteens (name, location, current_queue_count, estimated_wait_time) VALUES
('Main Canteen', 'Academic Block A', 12, 8),
('Food Court', 'Student Center', 25, 15);

-- Insert Sri Lankan menu items
INSERT INTO menu_items (canteen_id, name, name_tamil, description, price, category, rating) VALUES
-- Main Canteen Foods
(1, 'Rice & Curry', 'சாதம் கறி', 'Traditional Sri Lankan rice with mixed curries', 120, 'lunch', 4.8),
(1, 'Rotti & Curry', 'ரொட்டி கறி', 'Fresh rotti with dhal curry and coconut sambol', 80, 'breakfast', 4.6),
(1, 'String Hoppers', 'இடியாப்பம்', 'Steamed rice noodles with curry and sambol', 90, 'breakfast', 4.7),
(1, 'Kottu Rotti', 'கொட்டு ரொட்டி', 'Chopped rotti stir-fried with vegetables/meat', 150, 'lunch', 4.9),
(1, 'Rice & Dhal Curry', 'சாதம் பருப்பு கறி', 'Steamed rice with traditional dhal curry', 100, 'lunch', 4.9),

-- Food Court Items
(2, 'Biriyani', 'பிரியாணி', 'Fragrant spiced rice with chicken or mutton', 200, 'lunch', 4.7),
(2, 'Pol Rotti', 'பொல் ரொட்டி', 'Coconut flatbread with lunu miris', 50, 'breakfast', 4.6),
(2, 'Pittu', 'பிட்டு', 'Steamed rice flour cylinders with coconut', 90, 'lunch', 4.5),
(2, 'Devilled Chicken', 'டெவில்ட் சிக்கன்', 'Spicy stir-fried chicken with peppers', 180, 'dinner', 4.6),

-- School Supplies
(1, 'Ball Point Pen', 'பால் பாயிண்ட் பேனா', 'Blue/Black ink pen', 25, 'stationery', 4.0),
(1, 'Notebook A4', 'குறிப்பேடு A4', '200 pages ruled notebook', 120, 'stationery', 4.3),
(1, 'Pencil', 'பென்சில்', 'HB graphite pencil', 15, 'stationery', 4.2),
(2, 'Calculator', 'கணிப்பான்', 'Scientific calculator', 800, 'stationery', 4.5),
(2, 'Eraser', 'அழிப்பான்', 'White rubber eraser', 10, 'stationery', 4.1);