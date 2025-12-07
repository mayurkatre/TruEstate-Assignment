
CREATE TABLE sales (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  transaction_id TEXT NOT NULL,
  date DATE NOT NULL,
  customer_id TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  phone_number TEXT,
  gender TEXT,
  age INTEGER,
  product_category TEXT,
  quantity INTEGER,
  total_amount REAL,
  customer_region TEXT,
  product_id TEXT,
  employee_name TEXT,
  tags TEXT,
  payment_method TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_sales_date ON sales(date);
CREATE INDEX idx_sales_customer_region ON sales(customer_region);
CREATE INDEX idx_sales_product_category ON sales(product_category);
CREATE INDEX idx_sales_gender ON sales(gender);
CREATE INDEX idx_sales_payment_method ON sales(payment_method);
CREATE INDEX idx_sales_customer_name ON sales(customer_name);
CREATE INDEX idx_sales_phone_number ON sales(phone_number);
