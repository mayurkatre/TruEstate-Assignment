#!/usr/bin/env node

/**
 * Simple script to test database insertion
 */

import pkg from 'pg';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'sales_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
};

async function testInsert() {
  const client = new pkg.Client(dbConfig);
  
  try {
    // Connect to database
    await client.connect();
    console.log('Connected to database successfully');
    
    // Insert a single test record
    const query = `
      INSERT INTO sales (
        transaction_id, date, customer_id, customer_name, phone_number,
        gender, age, customer_region, customer_type, product_id, product_name,
        brand, product_category, tags, quantity, price_per_unit,
        discount_percentage, total_amount, final_amount, payment_method,
        order_status, delivery_type, store_id, store_location,
        salesperson_id, employee_name
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26)
    `;
    
    const values = [
      'TEST001',
      '2023-01-01',
      'CUST001',
      'Test Customer',
      '1234567890',
      'Male',
      30,
      'North',
      'Regular',
      'PROD001',
      'Test Product',
      'Test Brand',
      'Electronics',
      ['tag1', 'tag2'],
      2,
      100.00,
      10.00,
      200.00,
      180.00,
      'Credit Card',
      'Completed',
      'Standard',
      'STORE001',
      'New York',
      'EMP001',
      'John Doe'
    ];
    
    await client.query(query, values);
    console.log('✅ Test record inserted successfully');
    
    // Query the record back
    const result = await client.query('SELECT * FROM sales WHERE transaction_id = $1', ['TEST001']);
    console.log('📊 Retrieved record:', result.rows[0]);
    
  } catch (error) {
    console.error('❌ Test insert failed:', error.message);
    console.error('Error code:', error.code);
  } finally {
    await client.end();
  }
}

// Run the test
testInsert();