#!/usr/bin/env node

/**
 * Download CSV from Google Drive and Import Script
 * Usage: node scripts/download-and-import.js
 */

import fs from 'fs';
import https from 'https';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Google Drive file URL
const GOOGLE_DRIVE_URL = "https://drive.google.com/uc?export=download&id=1tzbyuxBmrBwMSXbL22r33FUMtO0V_lxb";
const CSV_FILE_PATH = path.join(__dirname, '..', 'dataset', 'truestate_assignment_dataset.csv');

// Function to download file from URL
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    
    console.log('Downloading CSV file from Google Drive...');
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download file. Status code: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log('Download completed successfully!');
        resolve();
      });
      
      file.on('error', (err) => {
        fs.unlink(dest, () => {}); // Delete partial file
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Function to run the import script
function runImport() {
  console.log('Running CSV import script...');
  try {
    execSync(`node "${path.join(__dirname, 'import-csv.js')}" "${CSV_FILE_PATH}"`, { stdio: 'inherit' });
    console.log('Import completed successfully!');
  } catch (error) {
    console.error('Import failed:', error.message);
    throw error;
  }
}

// Main function
async function main() {
  try {
    // Ensure dataset directory exists
    const datasetDir = path.join(__dirname, '..', 'dataset');
    if (!fs.existsSync(datasetDir)) {
      fs.mkdirSync(datasetDir, { recursive: true });
    }
    
    // Download the CSV file
    await downloadFile(GOOGLE_DRIVE_URL, CSV_FILE_PATH);
    
    // Run the import script
    await runImport();
    
    console.log('Download and import process completed successfully!');
  } catch (error) {
    console.error('Download and import process failed:', error.message);
    process.exit(1);
  }
}

// Execute main function
main();