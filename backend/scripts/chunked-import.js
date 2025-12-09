#!/usr/bin/env node

/**
 * Chunked CSV to PostgreSQL Import Script
 * Processes large CSV files in small chunks to avoid memory issues
 */

import fs from 'fs';
import { parse } from 'csv-parse';
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
  // Connection settings for stability
  keepAlive: true,
  keepAliveInitialDelayMillis: 10000,
};

const { Client } = pkg;

// Get CSV file path from command line argument
const csvFilePath = process.argv[2];

if (!csvFilePath) {
  console.error('Error: Please provide the path to the CSV file as an argument.');
  console.log('Usage: node scripts/chunked-import.js <csv-file-path>');
  process.exit(1);
}

if (!fs.existsSync(csvFilePath)) {
  console.error(`Error: File not found - ${csvFilePath}`);
  process.exit(1);
}

// Function to convert string to array
function stringToArray(str) {
  if (!str || str === '') return [];
  // Handle quoted strings and split by comma
  let cleanedStr = str;
  // Remove surrounding quotes if present
  if (cleanedStr.startsWith('"') && cleanedStr.endsWith('"')) {
    cleanedStr = cleanedStr.substring(1, cleanedStr.length - 1);
  }
  // Split by comma and clean up each tag
  return cleanedStr.split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0);
}

// Function to insert a batch of records with retries
async function insertBatchWithRetry(client, batch, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      if (batch.length === 0) return;
      
      const query = `
        INSERT INTO sales (
          transaction_id, date, customer_id, customer_name, phone_number,
          gender, age, customer_region, customer_type, product_id, product_name,
          brand, product_category, tags, quantity, price_per_unit,
          discount_percentage, total_amount, final_amount, payment_method,
          order_status, delivery_type, store_id, store_location,
          salesperson_id, employee_name
        ) VALUES ${batch.map((_, i) => 
          `($${i * 26 + 1}, $${i * 26 + 2}, $${i * 26 + 3}, $${i * 26 + 4}, $${i * 26 + 5}, $${i * 26 + 6}, $${i * 26 + 7}, $${i * 26 + 8}, $${i * 26 + 9}, $${i * 26 + 10}, $${i * 26 + 11}, $${i * 26 + 12}, $${i * 26 + 13}, $${i * 26 + 14}, $${i * 26 + 15}, $${i * 26 + 16}, $${i * 26 + 17}, $${i * 26 + 18}, $${i * 26 + 19}, $${i * 26 + 20}, $${i * 26 + 21}, $${i * 26 + 22}, $${i * 26 + 23}, $${i * 26 + 24}, $${i * 26 + 25}, $${i * 26 + 26})`
        ).join(', ')}
      `;
      
      // Flatten the batch data into a single array of values
      const values = batch.flatMap(record => [
        record.transaction_id,
        record.date,
        record.customer_id,
        record.customer_name,
        record.phone_number,
        record.gender,
        record.age ? parseInt(record.age, 10) : null,
        record.customer_region,
        record.customer_type,
        record.product_id,
        record.product_name,
        record.brand,
        record.product_category,
        record.tags,  // PostgreSQL array
        record.quantity ? parseInt(record.quantity, 10) : null,
        record.price_per_unit ? parseFloat(record.price_per_unit) : null,
        record.discount_percentage ? parseFloat(record.discount_percentage) : null,
        record.total_amount ? parseFloat(record.total_amount) : null,
        record.final_amount ? parseFloat(record.final_amount) : null,
        record.payment_method,
        record.order_status,
        record.delivery_type,
        record.store_id,
        record.store_location,
        record.salesperson_id,
        record.employee_name
      ]);
      
      await client.query(query, values);
      return; // Success
    } catch (error) {
      console.log(`Attempt ${attempt} failed:`, error.message);
      if (attempt === maxRetries) {
        throw error;
      }
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
}

// Function to import CSV data in chunks
async function importCSVInChunks(filePath) {
  console.log(`Starting chunked CSV import from: ${filePath}`);
  
  // Create a new client for each chunk to avoid connection issues
  let client = new Client(dbConfig);
  await client.connect();
  console.log('Connected to database');
  
  try {
    // Create a parser for the CSV file
    const parser = fs
      .createReadStream(filePath)
      .pipe(parse({
        columns: true,
        skip_empty_lines: true,
        trim: true,
        skip_records_with_empty_values: false,
        bom: true
      }));
    
    let totalRows = 0;
    let chunk = [];
    const chunkSize = 50; // Very small chunks for stability
    
    // Process each row
    for await (const record of parser) {
      // Skip header row if it appears again
      if (record['Transaction ID'] === 'Transaction ID') {
        continue;
      }
      
      // Convert tags string to array
      const tagsArray = stringToArray(record['Tags'] || record.Tags || record.tags || '');
      
      // Add record to chunk
      chunk.push({
        transaction_id: record['Transaction ID'] || record.transaction_id,
        date: record['Date'] || record.Date || record.date,
        customer_id: record['Customer ID'] || record.customer_id,
        customer_name: record['Customer Name'] || record.customer_name,
        phone_number: record['Phone Number'] || record.phone_number,
        gender: record['Gender'] || record.gender,
        age: record['Age'] || record.age,
        customer_region: record['Customer Region'] || record.customer_region,
        customer_type: record['Customer Type'] || record.customer_type,
        product_id: record['Product ID'] || record.product_id,
        product_name: record['Product Name'] || record.product_name,
        brand: record['Brand'] || record.brand,
        product_category: record['Product Category'] || record.product_category,
        tags: tagsArray,
        quantity: record['Quantity'] || record.quantity,
        price_per_unit: record['Price per Unit'] || record.price_per_unit,
        discount_percentage: record['Discount Percentage'] || record.discount_percentage,
        total_amount: record['Total Amount'] || record.total_amount,
        final_amount: record['Final Amount'] || record.final_amount,
        payment_method: record['Payment Method'] || record.payment_method,
        order_status: record['Order Status'] || record.order_status,
        delivery_type: record['Delivery Type'] || record.delivery_type,
        store_id: record['Store ID'] || record.store_id,
        store_location: record['Store Location'] || record.store_location,
        salesperson_id: record['Salesperson ID'] || record.salesperson_id,
        employee_name: record['Employee Name'] || record.employee_name
      });
      
      // When chunk is full, insert into database
      if (chunk.length >= chunkSize) {
        try {
          await insertBatchWithRetry(client, chunk);
          totalRows += chunk.length;
          console.log(`Imported ${totalRows} rows...`);
          
          // Close and reopen connection to prevent timeouts
          await client.end();
          client = new Client(dbConfig);
          await client.connect();
          
          chunk = []; // Reset chunk
        } catch (error) {
          console.error('Error inserting chunk:', error.message);
          throw error;
        }
      }
    }
    
    // Insert remaining records
    if (chunk.length > 0) {
      try {
        await insertBatchWithRetry(client, chunk);
        totalRows += chunk.length;
        console.log(`Imported ${totalRows} rows...`);
      } catch (error) {
        console.error('Error inserting final chunk:', error.message);
        throw error;
      }
    }
    
    console.log(`Successfully imported ${totalRows} rows from ${filePath}`);
  } finally {
    await client.end();
  }
}

// Run the import process
async function main() {
  try {
    await importCSVInChunks(csvFilePath);
    console.log('CSV import completed successfully!');
  } catch (error) {
    console.error('CSV import failed:', error.message);
    process.exit(1);
  }
}

// Execute main function
main();