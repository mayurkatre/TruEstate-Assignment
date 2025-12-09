#!/usr/bin/env node

/**
 * Script to check if prerequisites for PostgreSQL setup are met
 */

import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

function checkPostgreSQL() {
  return new Promise((resolve) => {
    const ps = spawn('psql', ['--version'], { shell: true });
    
    let stdout = '';
    let stderr = '';
    
    ps.stdout.on('data', (data) => {
      stdout += data.toString();
    });
    
    ps.stderr.on('data', (data) => {
      stderr += data.toString();
    });
    
    ps.on('close', (code) => {
      if (code === 0 && stdout.includes('psql')) {
        resolve({ installed: true, version: stdout.trim() });
      } else {
        resolve({ installed: false });
      }
    });
    
    // Timeout after 5 seconds
    setTimeout(() => {
      resolve({ installed: false });
    }, 5000);
  });
}

function checkDocker() {
  return new Promise((resolve) => {
    const ps = spawn('docker', ['--version'], { shell: true });
    
    let stdout = '';
    
    ps.stdout.on('data', (data) => {
      stdout += data.toString();
    });
    
    ps.on('close', (code) => {
      if (code === 0 && stdout.includes('Docker')) {
        resolve({ installed: true, version: stdout.trim() });
      } else {
        resolve({ installed: false });
      }
    });
    
    // Timeout after 5 seconds
    setTimeout(() => {
      resolve({ installed: false });
    }, 5000);
  });
}

function checkEnvFile() {
  const envPath = path.join(process.cwd(), '.env');
  return fs.existsSync(envPath);
}

async function main() {
  console.log('🔍 Checking prerequisites for PostgreSQL setup...\n');
  
  // Check if .env file exists
  const envExists = checkEnvFile();
  console.log(`📄 .env file: ${envExists ? '✅ Found' : '❌ Not found (will create template)'}`);
  
  // Check PostgreSQL installation
  const pgStatus = await checkPostgreSQL();
  console.log(`🐘 PostgreSQL: ${pgStatus.installed ? '✅ Installed (' + pgStatus.version + ')' : '❌ Not installed or not in PATH'}`);
  
  // Check Docker installation
  const dockerStatus = await checkDocker();
  console.log(`🐳 Docker: ${dockerStatus.installed ? '✅ Installed (' + dockerStatus.version + ')' : '❌ Not installed or not in PATH'}\n`);
  
  // Provide recommendations
  console.log('💡 Recommendations:\n');
  
  if (pgStatus.installed) {
    console.log('✅ PostgreSQL is installed! You can proceed with database setup.');
    console.log('   Run: npm run setup-db');
    console.log('   Then: npm run import-csv\n');
  } else if (dockerStatus.installed) {
    console.log('🐳 Docker is available. You can run PostgreSQL in a container:');
    console.log('   docker run --name postgres-db -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres\n');
    console.log('   Then run: npm run setup-db');
    console.log('   Then run: npm run import-csv\n');
  } else {
    console.log('❌ Neither PostgreSQL nor Docker is installed.');
    console.log('   Please install one of the following:');
    console.log('   1. PostgreSQL: https://www.postgresql.org/download/');
    console.log('   2. Docker Desktop: https://www.docker.com/products/docker-desktop/\n');
  }
  
  if (!envExists) {
    console.log('📄 Creating .env file template...');
    const envTemplate = `# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sales_db
DB_USER=postgres
DB_PASSWORD=your_password_here
DB_ADMIN_USER=postgres
DB_ADMIN_PASSWORD=your_admin_password_here

# Application Configuration
NODE_ENV=development
PORT=3000
`;
    
    fs.writeFileSync(path.join(process.cwd(), '.env'), envTemplate);
    console.log('   ✅ .env file created. Please update with your actual credentials.\n');
  }
  
  console.log('📖 For detailed instructions, see: POSTGRESQL_SETUP.md');
}

main().catch(console.error);