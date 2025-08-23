-- Sample Orders Data for University of Ruhuna Canteen (23+ Records)

INSERT INTO orders (user_id, canteen_id, order_number, items, total_amount, status, payment_status, payment_method, pickup_time, ready_at, created_at) VALUES

(1, 1, 'ORD-2024-001', '[{"name":"Rice & Chicken Curry","quantity":1,"price":200},{"name":"Ceylon Black Tea","quantity":1,"price":30}]', 230, 'completed', 'paid', 'digital', '2024-01-15 12:30:00', '2024-01-15 12:25:00', '2024-01-15 11:45:00'),

(1, 2, 'ORD-2024-002', '[{"name":"Chicken Biriyani","quantity":1,"price":200},{"name":"King Coconut","quantity":1,"price":50}]', 250, 'completed', 'paid', 'digital', '2024-01-14 13:00:00', '2024-01-14 12:55:00', '2024-01-14 12:15:00'),

(1, 1, 'ORD-2024-003', '[{"name":"Kottu Rotti","quantity":1,"price":150},{"name":"Lime Juice","quantity":1,"price":40}]', 190, 'completed', 'paid', 'cash', '2024-01-13 19:30:00', '2024-01-13 19:20:00', '2024-01-13 18:45:00'),

(1, 2, 'ORD-2024-004', '[{"name":"String Hoppers","quantity":2,"price":60},{"name":"Fish Curry","quantity":1,"price":180}]', 300, 'completed', 'paid', 'digital', '2024-01-12 08:00:00', '2024-01-12 07:55:00', '2024-01-12 07:30:00'),

(1, 1, 'ORD-2024-005', '[{"name":"Scientific Calculator","quantity":1,"price":800},{"name":"Notebook A4","quantity":2,"price":120}]', 1040, 'completed', 'paid', 'digital', '2024-01-11 10:00:00', '2024-01-11 09:50:00', '2024-01-11 09:15:00'),

(1, 2, 'ORD-2024-006', '[{"name":"Vegetable Fried Rice","quantity":1,"price":110},{"name":"Mango Juice","quantity":1,"price":70}]', 180, 'completed', 'paid', 'cash', '2024-01-10 12:45:00', '2024-01-10 12:40:00', '2024-01-10 12:00:00'),

(1, 1, 'ORD-2024-007', '[{"name":"Fish Cutlets","quantity":3,"price":60},{"name":"Milk Tea","quantity":1,"price":35}]', 215, 'completed', 'paid', 'digital', '2024-01-09 16:30:00', '2024-01-09 16:25:00', '2024-01-09 15:45:00'),

(1, 2, 'ORD-2024-008', '[{"name":"Mutton Biriyani","quantity":1,"price":280},{"name":"Faluda","quantity":1,"price":80}]', 360, 'completed', 'paid', 'digital', '2024-01-08 13:15:00', '2024-01-08 13:10:00', '2024-01-08 12:30:00'),

(1, 1, 'ORD-2024-009', '[{"name":"Egg Hoppers","quantity":2,"price":70},{"name":"Coconut Rotti","quantity":1,"price":50}]', 190, 'completed', 'paid', 'cash', '2024-01-07 08:30:00', '2024-01-07 08:25:00', '2024-01-07 07:50:00'),

(1, 2, 'ORD-2024-010', '[{"name":"Chicken Noodles","quantity":1,"price":150},{"name":"Orange Juice","quantity":1,"price":60}]', 210, 'completed', 'paid', 'digital', '2024-01-06 19:00:00', '2024-01-06 18:55:00', '2024-01-06 18:20:00'),

(1, 1, 'ORD-2024-011', '[{"name":"Rice & Fish Curry","quantity":1,"price":180},{"name":"Ginger Tea","quantity":1,"price":40}]', 220, 'ready', 'paid', 'digital', '2024-01-05 12:00:00', '2024-01-05 11:55:00', '2024-01-05 11:20:00'),

(1, 2, 'ORD-2024-012', '[{"name":"Geometry Box","quantity":1,"price":250},{"name":"Color Pencil Set 12","quantity":1,"price":180}]', 430, 'completed', 'paid', 'digital', '2024-01-04 14:30:00', '2024-01-04 14:20:00', '2024-01-04 13:45:00'),

(1, 1, 'ORD-2024-013', '[{"name":"Beef Kottu","quantity":1,"price":200},{"name":"Passion Fruit Juice","quantity":1,"price":65}]', 265, 'completed', 'paid', 'cash', '2024-01-03 20:00:00', '2024-01-03 19:50:00', '2024-01-03 19:15:00'),

(1, 2, 'ORD-2024-014', '[{"name":"Prawn Biriyani","quantity":1,"price":300},{"name":"Wood Apple Juice","quantity":1,"price":60}]', 360, 'completed', 'paid', 'digital', '2024-01-02 13:30:00', '2024-01-02 13:25:00', '2024-01-02 12:50:00'),

(1, 1, 'ORD-2024-015', '[{"name":"Plain Hoppers","quantity":3,"price":50},{"name":"Fish Curry","quantity":1,"price":180}]', 330, 'completed', 'paid', 'digital', '2024-01-01 08:15:00', '2024-01-01 08:10:00', '2024-01-01 07:35:00'),

(1, 2, 'ORD-2024-016', '[{"name":"Chicken Fried Rice","quantity":1,"price":160},{"name":"Pineapple Juice","quantity":1,"price":55}]', 215, 'preparing', 'paid', 'digital', '2023-12-31 12:30:00', NULL, '2023-12-31 11:50:00'),

(1, 1, 'ORD-2024-017', '[{"name":"Vegetable Cutlets","quantity":2,"price":50},{"name":"Lemon Tea","quantity":1,"price":35}]', 135, 'completed', 'paid', 'cash', '2023-12-30 16:45:00', '2023-12-30 16:40:00', '2023-12-30 16:00:00'),

(1, 2, 'ORD-2024-018', '[{"name":"Seafood Kottu","quantity":1,"price":250},{"name":"King Coconut","quantity":1,"price":50}]', 300, 'completed', 'paid', 'digital', '2023-12-29 19:15:00', '2023-12-29 19:05:00', '2023-12-29 18:30:00'),

(1, 1, 'ORD-2024-019', '[{"name":"Rice & Mutton Curry","quantity":1,"price":250},{"name":"Plain Coffee","quantity":1,"price":40}]', 290, 'completed', 'paid', 'digital', '2023-12-28 12:15:00', '2023-12-28 12:10:00', '2023-12-28 11:35:00'),

(1, 2, 'ORD-2024-020', '[{"name":"Egg Noodles","quantity":1,"price":120},{"name":"Lime Juice","quantity":1,"price":40}]', 160, 'completed', 'paid', 'cash', '2023-12-27 19:45:00', '2023-12-27 19:40:00', '2023-12-27 19:00:00'),

(1, 1, 'ORD-2024-021', '[{"name":"Fountain Pen","quantity":1,"price":150},{"name":"Exercise Book 120 Pages","quantity":3,"price":85}]', 405, 'completed', 'paid', 'digital', '2023-12-26 15:00:00', '2023-12-26 14:50:00', '2023-12-26 14:20:00'),

(1, 2, 'ORD-2024-022', '[{"name":"Fish Biriyani","quantity":1,"price":220},{"name":"Mango Juice","quantity":1,"price":70}]', 290, 'confirmed', 'paid', 'digital', '2023-12-25 13:00:00', NULL, '2023-12-25 12:25:00'),

(1, 1, 'ORD-2024-023', '[{"name":"Cheese Kottu","quantity":1,"price":160},{"name":"Milk Coffee","quantity":1,"price":45}]', 205, 'pending', 'paid', 'digital', '2023-12-24 18:30:00', NULL, '2023-12-24 17:55:00'),

(1, 2, 'ORD-2024-024', '[{"name":"Graphing Calculator","quantity":1,"price":2500},{"name":"Ring Binder A4","quantity":2,"price":150}]', 2800, 'completed', 'paid', 'digital', '2023-12-23 11:00:00', '2023-12-23 10:45:00', '2023-12-23 10:15:00'),

(1, 1, 'ORD-2024-025', '[{"name":"Pineapple Fried Rice","quantity":1,"price":150},{"name":"Ceylon Black Tea","quantity":1,"price":30}]', 180, 'completed', 'paid', 'cash', '2023-12-22 12:45:00', '2023-12-22 12:40:00', '2023-12-22 12:05:00');