#!/usr/bin/env node

/**
 * Simple script to check if a port is open
 */

import { createConnection } from 'net';

const host = 'localhost';
const port = 5432;

function checkPort() {
  return new Promise((resolve, reject) => {
    console.log(`🔍 Checking if port ${host}:${port} is open...`);
    
    const socket = createConnection(port, host, () => {
      console.log('✅ Port is open and accepting connections!');
      socket.end();
      resolve(true);
    });
    
    socket.setTimeout(3000); // 3 second timeout
    
    socket.on('timeout', () => {
      console.log('❌ Connection timed out - port may be closed or blocked');
      socket.destroy();
      resolve(false);
    });
    
    socket.on('error', (err) => {
      console.log(`❌ Port is not accessible: ${err.message}`);
      socket.destroy();
      resolve(false);
    });
  });
}

async function main() {
  try {
    const isOpen = await checkPort();
    if (isOpen) {
      console.log('\n🎉 PostgreSQL appears to be running and accessible!');
      console.log('\nTry running the database setup now:');
      console.log('npm run setup-db');
    } else {
      console.log('\n🔧 Troubleshooting steps:');
      console.log('1. Check if PostgreSQL service is running');
      console.log('2. Verify PostgreSQL is configured to accept TCP connections');
      console.log('3. Check Windows Firewall settings');
      console.log('4. Try connecting through pgAdmin to confirm the service is running');
    }
  } catch (error) {
    console.error('Error checking port:', error.message);
  }
}

main();