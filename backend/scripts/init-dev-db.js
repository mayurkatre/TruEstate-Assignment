#!/usr/bin/env node

/**
 * Script to initialize a development database for testing
 * This creates a simple in-memory SQLite database for development/testing purposes
 */

import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import fs from 'fs';
import path from 'path';

// Ensure sqlite3 is available
try {
  require('sqlite3');
} catch (error) {
  console.log('SQLite3 not available. Installing...');
  console.log('Please run: npm install sqlite3 sqlite');
  process.exit(1);
}

async function initDevDatabase() {
  console.log('🔧 Initializing development database...\n');
  
  try {
    // Open database (creates file if it doesn't exist)
    const db = await open({
      filename: './dev-database.sqlite',
      driver: sqlite3.Database
    });
    
    console.log('✅ SQLite database opened successfully');
    
    // Create sales table (simplified version for development)
    await db.exec(`
      CREATE TABLE IF NOT EXISTS sales (
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
        product_category TEXT,
        tags TEXT,  -- Comma-separated tags for simplicity
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
      )
    `);
    
    console.log('✅ Sales table created');
    
    // Create indexes
    await db.exec(`CREATE INDEX IF NOT EXISTS idx_sales_date ON sales(date)`);
    await db.exec(`CREATE INDEX IF NOT EXISTS idx_sales_customer_region ON sales(customer_region)`);
    await db.exec(`CREATE INDEX IF NOT EXISTS idx_sales_product_category ON sales(product_category)`);
    await db.exec(`CREATE INDEX IF NOT EXISTS idx_sales_gender ON sales(gender)`);
    await db.exec(`CREATE INDEX IF NOT EXISTS idx_sales_payment_method ON sales(payment_method)`);
    await db.exec(`CREATE INDEX IF NOT EXISTS idx_sales_customer_name ON sales(customer_name)`);
    await db.exec(`CREATE INDEX IF NOT EXISTS idx_sales_phone_number ON sales(phone_number)`);
    await db.exec(`CREATE INDEX IF NOT EXISTS idx_sales_final_amount ON sales(final_amount)`);
    await db.exec(`CREATE INDEX IF NOT EXISTS idx_sales_store_location ON sales(store_location)`);
    await db.exec(`CREATE INDEX IF NOT EXISTS idx_sales_order_status ON sales(order_status)`);
    
    console.log('✅ Indexes created');
    
    // Insert sample data if table is empty
    const count = await db.get('SELECT COUNT(*) as count FROM sales');
    if (count.count === 0) {
      console.log('📝 Inserting sample data...');
      
      // Sample data
      const sampleData = [
        {
          transaction_id: 'TXN-001',
          date: '2023-01-15',
          customer_id: 'CUST-1001',
          customer_name: 'John Doe',
          phone_number: '1234567890',
          gender: 'Male',
          age: 30,
          customer_region: 'North',
          customer_type: 'Regular',
          product_id: 'PROD-2001',
          product_name: 'Wireless Headphones',
          brand: 'TechCorp',
          product_category: 'Electronics',
          tags: 'wireless,electronics,audio',
          quantity: 1,
          price_per_unit: 99.99,
          discount_percentage: 10,
          total_amount: 99.99,
          final_amount: 89.99,
          payment_method: 'Credit Card',
          order_status: 'Completed',
          delivery_type: 'Standard',
          store_id: 'STORE-001',
          store_location: 'New York',
          salesperson_id: 'EMP-101',
          employee_name: 'Alice Smith'
        },
        {
          transaction_id: 'TXN-002',
          date: '2023-01-16',
          customer_id: 'CUST-1002',
          customer_name: 'Jane Smith',
          phone_number: '0987654321',
          gender: 'Female',
          age: 25,
          customer_region: 'South',
          customer_type: 'New',
          product_id: 'PROD-2002',
          product_name: 'Skincare Set',
          brand: 'BeautyPlus',
          product_category: 'Beauty',
          tags: 'skincare,beauty,organic',
          quantity: 2,
          price_per_unit: 49.99,
          discount_percentage: 5,
          total_amount: 99.98,
          final_amount: 94.98,
          payment_method: 'PayPal',
          order_status: 'Completed',
          delivery_type: 'Express',
          store_id: 'STORE-002',
          store_location: 'Los Angeles',
          salesperson_id: 'EMP-102',
          employee_name: 'Bob Johnson'
        }
      ];
      
      for (const record of sampleData) {
        await db.run(`
          INSERT INTO sales (
            transaction_id, date, customer_id, customer_name, phone_number,
            gender, age, customer_region, customer_type, product_id, product_name,
            brand, product_category, tags, quantity, price_per_unit,
            discount_percentage, total_amount, final_amount, payment_method,
            order_status, delivery_type, store_id, store_location,
            salesperson_id, employee_name
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
          record.transaction_id, record.date, record.customer_id, record.customer_name, record.phone_number,
          record.gender, record.age, record.customer_region, record.customer_type, record.product_id, record.product_name,
          record.brand, record.product_category, record.tags, record.quantity, record.price_per_unit,
          record.discount_percentage, record.total_amount, record.final_amount, record.payment_method,
          record.order_status, record.delivery_type, record.store_id, record.store_location,
          record.salesperson_id, record.employee_name
        ]);
      }
      
      console.log(`✅ ${sampleData.length} sample records inserted`);
    } else {
      console.log(`ℹ️  Database already contains ${count.count} records`);
    }
    
    // Close database
    await db.close();
    console.log('\n🎉 Development database initialized successfully!');
    console.log('\n📁 Database file: dev-database.sqlite');
    console.log('🚀 You can now run the application in development mode');
    
  } catch (error) {
    console.error('❌ Failed to initialize development database:', error.message);
    process.exit(1);
  }
}

// Run the initialization
initDevDatabase();