#!/usr/bin/env node

/**
 * Simple script to check if the sales_db database exists and is accessible
 */

import pkg from 'pg';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: 'sales_db', // Connect to our database
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
};

async function checkDatabase() {
  console.log('🔍 Checking if sales_db database exists and is accessible...\n');
  console.log('Using configuration:', {
    host: dbConfig.host,
    port: dbConfig.port,
    database: dbConfig.database,
    user: dbConfig.user
  });
  
  const client = new pkg.Client(dbConfig);
  
  try {
    // Connect to database
    await client.connect();
    console.log('✅ Connected to sales_db database successfully');
    
    // Test basic query
    const result = await client.query('SELECT COUNT(*) as count FROM sales');
    console.log(`📊 Sales table has ${result.rows[0].count} records`);
    
    console.log('\n🎉 Database check completed successfully!');
    
  } catch (error) {
    console.error('❌ Database check failed:', error.message);
    console.error('Error code:', error.code);
    
    // Try to connect to default database to see if our database exists
    const defaultConfig = {
      ...dbConfig,
      database: 'postgres'
    };
    
    const defaultClient = new pkg.Client(defaultConfig);
    try {
      await defaultClient.connect();
      console.log('✅ Connected to default postgres database');
      
      const dbResult = await defaultClient.query("SELECT datname FROM pg_database WHERE datname = 'sales_db'");
      if (dbResult.rows.length > 0) {
        console.log('✅ sales_db database exists');
      } else {
        console.log('❌ sales_db database does not exist');
      }
      
      await defaultClient.end();
    } catch (defaultError) {
      console.error('❌ Could not connect to default database either:', defaultError.message);
    }
  } finally {
    await client.end().catch(() => {});
  }
}

// Run the check
checkDatabase();