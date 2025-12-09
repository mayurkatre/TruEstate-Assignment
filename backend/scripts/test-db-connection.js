#!/usr/bin/env node

/**
 * Test database connection with the same configuration as the backend
 */

import pkg from 'pg';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Database connection configuration (same as backend)
const pool = new pkg.Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'sales_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

async function testConnection() {
  console.log('Testing database connection with backend configuration...');
  console.log('Configuration:', {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'sales_db',
    user: process.env.DB_USER || 'postgres'
  });
  
  const client = await pool.connect();
  
  try {
    // Test connection
    await client.query('SELECT NOW()');
    console.log('✅ Database connection established successfully');
    
    // Test a simple query
    const result = await client.query('SELECT COUNT(*) as count FROM sales');
    console.log(`📊 Sales table has ${result.rows[0].count} records`);
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('Error code:', error.code);
  } finally {
    client.release();
    await pool.end();
  }
}

testConnection();