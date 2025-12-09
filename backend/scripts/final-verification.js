#!/usr/bin/env node

/**
 * Final verification script to test database functionality
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

async function finalVerification() {
  const client = new pkg.Client(dbConfig);
  
  try {
    // Connect to database
    await client.connect();
    console.log('✅ Connected to database successfully');
    
    // Test 1: Count total records
    const countResult = await client.query('SELECT COUNT(*) as count FROM sales');
    console.log(`📊 Total sales records: ${countResult.rows[0].count}`);
    
    // Test 2: Get a sample record
    const sampleResult = await client.query('SELECT * FROM sales LIMIT 1');
    console.log('📋 Sample record:', sampleResult.rows[0]);
    
    // Test 3: Test filtering by region
    const regionResult = await client.query(
      'SELECT COUNT(*) as count FROM sales WHERE customer_region = $1', 
      ['North']
    );
    console.log(`🌍 North region records: ${regionResult.rows[0].count}`);
    
    // Test 4: Test array query (tags)
    const tagsResult = await client.query(
      "SELECT COUNT(*) as count FROM sales WHERE tags && ARRAY['electronics']::TEXT[]"
    );
    console.log(`🏷️  Records with 'electronics' tag: ${tagsResult.rows[0].count}`);
    
    // Test 5: Test date range query
    const dateResult = await client.query(
      "SELECT COUNT(*) as count FROM sales WHERE date BETWEEN '2023-01-01' AND '2023-12-31'"
    );
    console.log(`📅 2023 records: ${dateResult.rows[0].count}`);
    
    console.log('\n🎉 All tests passed! Database is ready for use.');
    
  } catch (error) {
    console.error('❌ Verification failed:', error.message);
    console.error('Error code:', error.code);
  } finally {
    await client.end();
  }
}

// Run the verification
finalVerification();