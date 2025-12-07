-- Migration 3: Updated sales data structure and sample data

-- Since we've updated the table structure, we need to recreate the table
DROP TABLE IF EXISTS sales;

CREATE TABLE sales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    transaction_id TEXT NOT NULL,
    date TEXT NOT NULL,
    customer_id TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    phone_number TEXT,
    gender TEXT,
    age INTEGER,
    customer_region TEXT,
    customer_type TEXT,
    product_id TEXT,
    product_name TEXT,
    brand TEXT,
    category TEXT,
    subcategory TEXT,
    quantity INTEGER,
    price_per_unit REAL,
    discount_percentage REAL,
    total_amount REAL,
    final_amount REAL,
    payment_method TEXT,
    order_status TEXT,
    delivery_type TEXT,
    store_id TEXT,
    store_location TEXT,
    salesperson_id TEXT,
    employee_name TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Insert the sample data
INSERT INTO sales (transaction_id, date, customer_id, customer_name, phone_number, gender, age, customer_region, customer_type, product_id, product_name, brand, category, subcategory, quantity, price_per_unit, discount_percentage, total_amount, final_amount, payment_method, order_status, delivery_type, store_id, store_location, salesperson_id, employee_name) VALUES
('1', '23-03-2023', 'CUST-40823', 'Neha Khan', '9720639364', 'Male', 21, 'East', 'Returning', 'PROD-8721', 'Herbal Face Wash', 'SilkSkin', 'Beauty', 'organic', 1, 500, 10, 450, 450, 'UPI', 'Completed', 'Standard', 'STORE-001', 'Mumbai', 'EMP-001', 'Neha Khan'),
('2', '30-01-2021', 'CUST-79592', 'Prerna Mehta', '9159953102', 'Female', 19, 'Central', 'Returning', 'PROD-5451', 'USB-C Charger', 'TechPulse', 'Electronics', 'portable', 2, 1500, 5, 2850, 2850, 'Credit Card', 'Completed', 'Express', 'STORE-002', 'Delhi', 'EMP-002', 'Prerna Mehta'),
('3', '23-08-2022', 'CUST-53317', 'Arjun Das', '9624084493', 'Male', 24, 'North', 'Returning', 'PROD-8448', 'Gaming Mouse', 'CyberCore', 'Electronics', 'portable', 1, 3500, 0, 3500, 3500, 'Debit Card', 'Completed', 'Standard', 'STORE-003', 'Chennai', 'EMP-003', 'Arjun Das'),
('4', '03-02-2021', 'CUST-13864', 'Zoya Joshi', '9396223918', 'Female', 60, 'South', 'Returning', 'PROD-5915', 'Slim Fit Jeans', 'UrbanWeave', 'Clothing', 'casual', 2, 1200, 15, 2040, 2040, 'Cash', 'Completed', 'Standard', 'STORE-004', 'Bangalore', 'EMP-004', 'Zoya Joshi'),
('5', '31-03-2021', 'CUST-98319', 'Anjali Yadav', '9669733171', 'Female', 25, 'North', 'Loyal', 'PROD-5961', 'Herbal Face Wash', 'SilkSkin', 'Beauty', 'skincare', 1, 450, 0, 450, 450, 'UPI', 'Completed', 'Standard', 'STORE-001', 'Mumbai', 'EMP-001', 'Anjali Yadav'),
('6', '31-08-2021', 'CUST-53321', 'Suresh Iyer', '9657125783', 'Male', 55, 'North', 'Returning', 'PROD-9434', 'Cotton T-Shirt', 'StreetLayer', 'Clothing', 'unisex', 3, 800, 10, 2160, 2160, 'Credit Card', 'Completed', 'Express', 'STORE-003', 'Chennai', 'EMP-003', 'Suresh Iyer'),
('7', '28-04-2021', 'CUST-76213', 'Ritika Chopra', '9100671247', 'Female', 42, 'West', 'New', 'PROD-2486', 'Bluetooth Speaker', 'VoltEdge', 'Electronics', 'smart', 1, 4500, 5, 4275, 4275, 'Debit Card', 'Completed', 'Standard', 'STORE-005', 'Hyderabad', 'EMP-005', 'Ritika Chopra'),
('8', '12-07-2021', 'CUST-10839', 'Mahesh Mehta', '9965297269', 'Male', 47, 'East', 'New', 'PROD-9154', 'Hooded Sweatshirt', 'ComfortLine', 'Clothing', 'fashion', 1, 2500, 0, 2500, 2500, 'UPI', 'Completed', 'Standard', 'STORE-006', 'Kolkata', 'EMP-006', 'Mahesh Mehta'),
('9', '16-06-2023', 'CUST-43872', 'Suresh Sharma', '9317845892', 'Male', 35, 'South', 'New', 'PROD-7475', 'Bluetooth Speaker', 'CyberCore', 'Electronics', 'smart', 2, 4000, 10, 7200, 7200, 'Credit Card', 'Completed', 'Express', 'STORE-004', 'Bangalore', 'EMP-004', 'Suresh Sharma'),
('10', '17-07-2022', 'CUST-66880', 'Ritika Joshi', '9642689633', 'Female', 47, 'North', 'Loyal', 'PROD-2390', 'Casual Kurta', 'StreetLayer', 'Clothing', 'casual', 2, 1800, 5, 3420, 3420, 'Cash', 'Completed', 'Standard', 'STORE-001', 'Mumbai', 'EMP-001', 'Ritika Joshi'),
('11', '18-03-2023', 'CUST-64912', 'Sanjay Bansal', '9268904111', 'Male', 57, 'West', 'New', 'PROD-7692', 'Matte Lipstick', 'VelvetTouch', 'Beauty', 'organic', 3, 600, 0, 1800, 1800, 'UPI', 'Completed', 'Standard', 'STORE-005', 'Hyderabad', 'EMP-005', 'Sanjay Bansal'),
('12', '10-06-2022', 'CUST-58160', 'Mahesh Mehta', '9266063747', 'Male', 53, 'West', 'New', 'PROD-3174', 'Wireless Headphones', 'NovaGear', 'Electronics', 'smart', 1, 8000, 15, 6800, 6800, 'Debit Card', 'Completed', 'Express', 'STORE-005', 'Hyderabad', 'EMP-005', 'Mahesh Mehta'),
('13', '17-09-2023', 'CUST-26938', 'Farhan Khan', '9491736503', 'Male', 40, 'Central', 'Loyal', 'PROD-8823', 'Bluetooth Speaker', 'TechPulse', 'Electronics', 'portable', 1, 5000, 0, 5000, 5000, 'Credit Card', 'Completed', 'Standard', 'STORE-007', 'Pune', 'EMP-007', 'Farhan Khan'),
('14', '18-07-2021', 'CUST-23645', 'Prerna Chopra', '9387515030', 'Female', 24, 'West', 'New', 'PROD-6571', 'Bluetooth Speaker', 'VoltEdge', 'Electronics', 'accessories', 2, 4500, 10, 8100, 8100, 'UPI', 'Completed', 'Express', 'STORE-005', 'Hyderabad', 'EMP-005', 'Prerna Chopra'),
('15', '15-01-2023', 'CUST-56533', 'Anjali Agarwal', '9069392523', 'Female', 54, 'West', 'Loyal', 'PROD-7533', 'Bluetooth Speaker', 'VoltEdge', 'Electronics', 'gadgets', 1, 6000, 5, 5700, 5700, 'Cash', 'Completed', 'Standard', 'STORE-005', 'Hyderabad', 'EMP-005', 'Anjali Agarwal');