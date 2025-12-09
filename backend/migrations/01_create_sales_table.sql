-- Create sales table with proper data types and constraints
CREATE TABLE IF NOT EXISTS sales (
    id SERIAL PRIMARY KEY,
    transaction_id VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    customer_id VARCHAR(50) NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    gender VARCHAR(10),
    age INTEGER,
    customer_region VARCHAR(50),
    customer_type VARCHAR(50),
    product_id VARCHAR(50),
    product_name VARCHAR(255),
    brand VARCHAR(100),
    product_category VARCHAR(100),
    tags TEXT[],  -- PostgreSQL array for tags
    quantity INTEGER,
    price_per_unit DECIMAL(10, 2),
    discount_percentage DECIMAL(5, 2),
    total_amount DECIMAL(12, 2),
    final_amount DECIMAL(12, 2),
    payment_method VARCHAR(50),
    order_status VARCHAR(50),
    delivery_type VARCHAR(50),
    store_id VARCHAR(50),
    store_location VARCHAR(100),
    salesperson_id VARCHAR(50),
    employee_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Create indexes for performance optimization
CREATE INDEX IF NOT EXISTS idx_sales_date ON sales(date);
CREATE INDEX IF NOT EXISTS idx_sales_customer_region ON sales(customer_region);
CREATE INDEX IF NOT EXISTS idx_sales_product_category ON sales(product_category);
CREATE INDEX IF NOT EXISTS idx_sales_gender ON sales(gender);
CREATE INDEX IF NOT EXISTS idx_sales_payment_method ON sales(payment_method);
CREATE INDEX IF NOT EXISTS idx_sales_customer_name ON sales(customer_name);
CREATE INDEX IF NOT EXISTS idx_sales_phone_number ON sales(phone_number);
CREATE INDEX IF NOT EXISTS idx_sales_tags ON sales USING GIN(tags);  -- GIN index for array field
CREATE INDEX IF NOT EXISTS idx_sales_final_amount ON sales(final_amount);
CREATE INDEX IF NOT EXISTS idx_sales_store_location ON sales(store_location);
CREATE INDEX IF NOT EXISTS idx_sales_order_status ON sales(order_status);