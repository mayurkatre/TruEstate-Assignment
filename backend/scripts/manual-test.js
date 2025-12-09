#!/usr/bin/env node

/**
 * Manual PostgreSQL connection test
 * Update the connection details below with your actual PostgreSQL credentials
 */

import pkg from 'pg';

const { Client } = pkg;

// Common PostgreSQL ports to test
const ports = [5432, 5433, 5434];

// UPDATE THESE VALUES WITH YOUR ACTUAL POSTGRESQL CREDENTIALS
const dbConfigBase = {
  host: 'localhost',      // Usually localhost
  database: 'postgres',    // Default database or your database name
  user: 'postgres',       // Your PostgreSQL username
  password: '',           // Your PostgreSQL password (leave empty if no password)
};

async function testConnection(port) {
  const dbConfig = { ...dbConfigBase, port };
  console.log(`\n🔍 Testing PostgreSQL connection on port ${port}...`);
  
  const client = new Client(dbConfig);
  
  try {
    await client.connect();
    console.log(`✅ Connected to PostgreSQL successfully on port ${port}!`);
    
    // Run a simple query
    const result = await client.query('SELECT version()');
    console.log('\n📊 PostgreSQL version:');
    console.log(result.rows[0].version);
    
    // List databases
    const dbResult = await client.query('SELECT datname FROM pg_database WHERE datistemplate = false');
    console.log('\n📚 Available databases:');
    dbResult.rows.forEach(row => {
      console.log(`  - ${row.datname}`);
    });
    
    await client.end();
    return true;
    
  } catch (error) {
    console.log(`❌ Connection failed on port ${port}: ${error.message}`);
    await client.end().catch(() => {});
    return false;
  }
}

async function findWorkingPort() {
  console.log('🔍 Testing PostgreSQL connection on common ports...\n');
  
  for (const port of ports) {
    if (await testConnection(port)) {
      console.log(`\n🎉 Found PostgreSQL running on port ${port}!`);
      console.log('\nUpdate your .env file with:');
      console.log(`DB_PORT=${port}`);
      return port;
    }
  }
  
  console.log('\n❌ Could not connect to PostgreSQL on any common ports');
  console.log('\nPlease check:');
  console.log('1. Is PostgreSQL service running?');
  console.log('2. Check pgAdmin for the correct port');
  console.log('3. Check PostgreSQL configuration files (postgresql.conf)');
  return null;
}

// Run the test
findWorkingPort();