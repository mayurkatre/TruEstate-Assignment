#!/usr/bin/env node

/**
 * Script to reset the database (drop and recreate)
 * Usage: node scripts/reset-db.js
 */

import pkg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const { Client } = pkg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Admin database connection configuration (to drop/create databases)
const adminDbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: 'postgres',  // Connect to default postgres database
  user: process.env.DB_ADMIN_USER || 'postgres',
  password: process.env.DB_ADMIN_PASSWORD || 'postgres',
};

// Application database configuration
const appDbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'sales_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
};

async function resetDatabase() {
  console.log('🔄 Resetting database...\n');
  
  // Step 1: Drop database if it exists
  console.log('1. Dropping existing database...');
  const adminClient = new Client(adminDbConfig);
  
  try {
    await adminClient.connect();
    
    // Terminate all connections to the database
    await adminClient.query(`
      SELECT pg_terminate_backend(pid) 
      FROM pg_stat_activity 
      WHERE datname = $1 AND pid <> pg_backend_pid()
    `, [appDbConfig.database]);
    
    // Drop database
    await adminClient.query(`DROP DATABASE IF EXISTS "${appDbConfig.database}"`);
    console.log(`   ✅ Database "${appDbConfig.database}" dropped successfully`);
    
  } catch (error) {
    console.error('   ❌ Error dropping database:', error.message);
  } finally {
    await adminClient.end();
  }
  
  // Step 2: Recreate database
  console.log('\n2. Creating fresh database...');
  const recreateClient = new Client(adminDbConfig);
  
  try {
    await recreateClient.connect();
    await recreateClient.query(`CREATE DATABASE "${appDbConfig.database}"`);
    console.log(`   ✅ Database "${appDbConfig.database}" created successfully`);
  } catch (error) {
    console.error('   ❌ Error creating database:', error.message);
    throw error;
  } finally {
    await recreateClient.end();
  }
  
  // Step 3: Run migrations
  console.log('\n3. Running database migrations...');
  const appClient = new Client(appDbConfig);
  
  try {
    await appClient.connect();
    
    // Read and execute the migration script
    const migrationPath = path.join(__dirname, '..', 'migrations', '01_create_sales_table.sql');
    const migrationSql = fs.readFileSync(migrationPath, 'utf8');
    
    await appClient.query(migrationSql);
    console.log('   ✅ Database schema created successfully');
  } catch (error) {
    console.error('   ❌ Error running migrations:', error.message);
    throw error;
  } finally {
    await appClient.end();
  }
  
  console.log('\n🎉 Database reset completed successfully!');
  console.log('\nNext steps:');
  console.log('1. Import CSV data:');
  console.log('   npm run import-csv');
}

// Confirm before proceeding
console.log('⚠️  This will DELETE all data in the database!');
console.log('Database:', appDbConfig.database);
console.log('Host:', appDbConfig.host);

if (process.argv.includes('--force')) {
  resetDatabase().catch(error => {
    console.error('❌ Database reset failed:', error.message);
    process.exit(1);
  });
} else {
  console.log('\nTo proceed, run with --force flag:');
  console.log('node scripts/reset-db.js --force');
  process.exit(0);
}