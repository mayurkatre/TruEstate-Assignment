#!/usr/bin/env node

/**
 * Database Setup Script
 * This script helps set up the PostgreSQL database for the sales management system
 */

import pkg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const { Client } = pkg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Database connection configuration for postgres database (to create our database)
const adminDbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: 'postgres',  // Connect to default postgres database
  user: process.env.DB_ADMIN_USER || 'postgres',
  password: process.env.DB_ADMIN_PASSWORD || 'postgres',
};

// Database connection configuration for our application database
const appDbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'sales_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
};

async function createDatabase() {
  const client = new Client(adminDbConfig);
  
  try {
    await client.connect();
    console.log('Connected to PostgreSQL server');
    
    // Create database if it doesn't exist
    const dbName = appDbConfig.database;
    const res = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = $1", 
      [dbName]
    );
    
    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE "${dbName}"`);
      console.log(`Database "${dbName}" created successfully`);
    } else {
      console.log(`Database "${dbName}" already exists`);
    }
  } catch (error) {
    console.error('Error creating database:', error.message);
    console.error('Connection config:', {
      host: adminDbConfig.host,
      port: adminDbConfig.port,
      database: adminDbConfig.database,
      user: adminDbConfig.user
    });
    throw error;
  } finally {
    await client.end();
  }
}

async function runMigrations() {
  const client = new Client(appDbConfig);
  
  try {
    await client.connect();
    console.log(`Connected to database "${appDbConfig.database}"`);
    
    // Read and execute the migration script
    const migrationPath = path.join(__dirname, '..', 'migrations', '01_create_sales_table.sql');
    const migrationSql = fs.readFileSync(migrationPath, 'utf8');
    
    await client.query(migrationSql);
    console.log('Database schema created successfully');
  } catch (error) {
    console.error('Error running migrations:', error.message);
    console.error('Connection config:', {
      host: appDbConfig.host,
      port: appDbConfig.port,
      database: appDbConfig.database,
      user: appDbConfig.user
    });
    throw error;
  } finally {
    await client.end();
  }
}

async function main() {
  try {
    console.log('Setting up PostgreSQL database for Sales Management System...\n');
    
    // Step 1: Create database
    console.log('Step 1: Creating database...');
    await createDatabase();
    
    // Step 2: Run migrations
    console.log('\nStep 2: Creating database schema...');
    await runMigrations();
    
    console.log('\nDatabase setup completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Set up environment variables:');
    console.log('   export DB_HOST=localhost');
    console.log('   export DB_PORT=5432');
    console.log('   export DB_NAME=sales_db');
    console.log('   export DB_USER=postgres');
    console.log('   export DB_PASSWORD=your_password');
    console.log('\n2. Import CSV data:');
    console.log('   node scripts/import-csv.js backend/dataset/truestate_assignment_dataset.csv');
  } catch (error) {
    console.error('Database setup failed:', error.message);
    console.error('Error stack:', error.stack);
    process.exit(1);
  }
}

main();