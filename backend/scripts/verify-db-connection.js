#!/usr/bin/env node

/**
 * Simple script to verify database connection and basic operations
 */

import { createConnection } from 'net';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 5432;

function testTcpConnection() {
  return new Promise((resolve, reject) => {
    console.log(`🔍 Testing TCP connection to ${host}:${port}...`);
    
    const socket = createConnection(port, host, () => {
      console.log('✅ TCP connection successful!');
      socket.end();
      resolve(true);
    });
    
    socket.setTimeout(5000); // 5 second timeout
    
    socket.on('timeout', () => {
      console.log('❌ TCP connection timed out');
      socket.destroy();
      reject(new Error('Connection timeout'));
    });
    
    socket.on('error', (err) => {
      console.log(`❌ TCP connection failed: ${err.message}`);
      socket.destroy();
      reject(err);
    });
  });
}

async function verifyConnection() {
  console.log('🔍 Verifying PostgreSQL connection...\n');
  console.log('Using configuration:', {
    host: host,
    port: port
  });
  
  try {
    await testTcpConnection();
    console.log('\n🎉 Network connectivity verified!');
    console.log('\nNext steps:');
    console.log('1. Make sure PostgreSQL is configured to accept connections');
    console.log('2. Check PostgreSQL configuration files (postgresql.conf, pg_hba.conf)');
    console.log('3. Ensure the postgres user has the correct password');
  } catch (error) {
    console.error('❌ Network connectivity failed:', error.message);
    console.log('\nTroubleshooting steps:');
    console.log('1. Check if PostgreSQL service is running');
    console.log('2. Verify the host and port are correct');
    console.log('3. Check Windows Firewall settings');
    console.log('4. Verify PostgreSQL is configured to accept TCP/IP connections');
  }
}

// Run the verification
verifyConnection();