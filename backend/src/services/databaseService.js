// backend/src/services/databaseService.js
/**
 * PostgreSQL database service for sales management system
 */

import dotenv from 'dotenv';
import pkg from 'pg';
const { Client, Pool } = pkg;

// Load environment variables
dotenv.config();

// Log environment variables for debugging
console.log('Environment variables:');
console.log('DB_HOST:', process.env.DB_HOST || 'localhost');
console.log('DB_PORT:', process.env.DB_PORT || 5432);
console.log('DB_NAME:', process.env.DB_NAME || 'sales_db');
console.log('DB_USER:', process.env.DB_USER || 'postgres');
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '[SET]' : '[NOT SET]');

// Database connection pool
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'sales_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
});

/**
 * Get all sales with optional filtering, sorting, and pagination
 * @param {Object} filters - Filter parameters
 * @returns {Promise<Object>} Paginated sales data with total count
 */
export const getAllSales = async (filters = {}) => {
  const client = await pool.connect();
  
  try {
    // Base query
    let query = 'SELECT * FROM sales';
    let countQuery = 'SELECT COUNT(*) FROM sales';
    const values = [];
    const countValues = [];
    let paramIndex = 1;
    
    // Build WHERE clause conditions
    const conditions = [];
    
    // Search filter (customer name or phone)
    if (filters.q) {
      conditions.push(`(customer_name ILIKE $${paramIndex} OR phone_number ILIKE $${paramIndex})`);
      values.push(`%${filters.q}%`);
      countValues.push(`%${filters.q}%`);
      paramIndex++;
    }
    
    // Regions filter (multi-select)
    if (filters.regions) {
      const regions = filters.regions.split(',');
      const placeholders = regions.map((_, i) => `$${paramIndex + i}`).join(',');
      conditions.push(`customer_region = ANY(ARRAY[${placeholders}]::VARCHAR[])`);
      values.push(...regions);
      countValues.push(...regions);
      paramIndex += regions.length;
    }
    
    // Genders filter (multi-select)
    if (filters.genders) {
      const genders = filters.genders.split(',');
      const placeholders = genders.map((_, i) => `$${paramIndex + i}`).join(',');
      conditions.push(`gender = ANY(ARRAY[${placeholders}]::VARCHAR[])`);
      values.push(...genders);
      countValues.push(...genders);
      paramIndex += genders.length;
    }
    
    // Categories filter (multi-select)
    if (filters.categories) {
      const categories = filters.categories.split(',');
      const placeholders = categories.map((_, i) => `$${paramIndex + i}`).join(',');
      conditions.push(`product_category = ANY(ARRAY[${placeholders}]::VARCHAR[])`);
      values.push(...categories);
      countValues.push(...categories);
      paramIndex += categories.length;
    }
    
    // Payment methods filter (multi-select)
    if (filters.paymentMethods) {
      const methods = filters.paymentMethods.split(',');
      const placeholders = methods.map((_, i) => `$${paramIndex + i}`).join(',');
      conditions.push(`payment_method = ANY(ARRAY[${placeholders}]::VARCHAR[])`);
      values.push(...methods);
      countValues.push(...methods);
      paramIndex += methods.length;
    }
    
    // Tags filter (multi-select)
    if (filters.tags) {
      const tags = filters.tags.split(',');
      // Use PostgreSQL array overlap operator &&
      conditions.push(`tags && ARRAY[${tags.map((_, i) => `$${paramIndex + i}`).join(',')}]::TEXT[]`);
      values.push(...tags);
      countValues.push(...tags);
      paramIndex += tags.length;
    }
    
    // Age range filter
    if (filters.ageMin || filters.ageMax) {
      if (filters.ageMin) {
        conditions.push(`age >= $${paramIndex}`);
        values.push(parseInt(filters.ageMin));
        countValues.push(parseInt(filters.ageMin));
        paramIndex++;
      }
      if (filters.ageMax) {
        conditions.push(`age <= $${paramIndex}`);
        values.push(parseInt(filters.ageMax));
        countValues.push(parseInt(filters.ageMax));
        paramIndex++;
      }
    }
    
    // Date range filter
    if (filters.dateFrom || filters.dateTo) {
      if (filters.dateFrom) {
        conditions.push(`date >= $${paramIndex}`);
        values.push(filters.dateFrom);
        countValues.push(filters.dateFrom);
        paramIndex++;
      }
      if (filters.dateTo) {
        conditions.push(`date <= $${paramIndex}`);
        values.push(filters.dateTo);
        countValues.push(filters.dateTo);
        paramIndex++;
      }
    }
    
    // Add WHERE clause if conditions exist
    if (conditions.length > 0) {
      const whereClause = ' WHERE ' + conditions.join(' AND ');
      query += whereClause;
      countQuery += whereClause;
    }
    
    // Add ORDER BY clause
    if (filters.sortBy) {
      const sortField = filters.sortBy;
      const sortDirection = filters.sortDir === 'desc' ? 'DESC' : 'ASC';
      // Validate sort field to prevent SQL injection
      const validFields = ['id', 'transaction_id', 'date', 'customer_name', 'customer_region', 
                          'product_category', 'quantity', 'final_amount', 'payment_method'];
      if (validFields.includes(sortField)) {
        query += ` ORDER BY ${sortField} ${sortDirection}`;
      }
    } else {
      query += ' ORDER BY id ASC';
    }
    
    // Add pagination
    const page = parseInt(filters.page) || 1;
    const pageSize = parseInt(filters.pageSize) || 10;
    const offset = (page - 1) * pageSize;
    
    query += ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    values.push(pageSize, offset);
    
    // Get total count
    const countResult = await client.query(countQuery, countValues);
    const total = parseInt(countResult.rows[0].count);
    
    // Get paginated results
    const result = await client.query(query, values);
    
    return {
      items: result.rows,
      total,
      page,
      pageSize
    };
  } finally {
    client.release();
  }
};

/**
 * Get a sale by ID
 * @param {number} id - Sale ID
 * @returns {Promise<Object|null>} Sale record or null if not found
 */
export const getSaleById = async (id) => {
  const client = await pool.connect();
  
  try {
    const result = await client.query('SELECT * FROM sales WHERE id = $1', [id]);
    return result.rows.length > 0 ? result.rows[0] : null;
  } finally {
    client.release();
  }
};

/**
 * Create a new sale/invoice
 * @param {Object} saleData - Sale data
 * @returns {Promise<Object>} Created sale record
 */
export const createSale = async (saleData) => {
  const client = await pool.connect();
  
  try {
    // Convert tags string to array if needed
    let tagsArray = saleData.tags || [];
    if (typeof tagsArray === 'string') {
      tagsArray = tagsArray.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    }
    
    const query = `
      INSERT INTO sales (
        transaction_id, date, customer_id, customer_name, phone_number,
        gender, age, customer_region, customer_type, product_id, product_name,
        brand, product_category, subcategory, tags, quantity, price_per_unit,
        discount_percentage, total_amount, final_amount, payment_method,
        order_status, delivery_type, store_id, store_location,
        salesperson_id, employee_name
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15,
                $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27)
      RETURNING *
    `;
    
    const values = [
      saleData.transaction_id || `TXN${Date.now()}`,
      saleData.date || new Date().toISOString().split('T')[0],
      saleData.customer_id,
      saleData.customer_name,
      saleData.phone_number,
      saleData.gender,
      saleData.age ? parseInt(saleData.age) : null,
      saleData.customer_region,
      saleData.customer_type || 'New',
      saleData.product_id,
      saleData.product_name,
      saleData.brand,
      saleData.product_category || saleData.category,
      saleData.subcategory,
      tagsArray,  // PostgreSQL array
      saleData.quantity ? parseInt(saleData.quantity) : null,
      saleData.price_per_unit ? parseFloat(saleData.price_per_unit) : null,
      saleData.discount_percentage ? parseFloat(saleData.discount_percentage) : null,
      saleData.total_amount ? parseFloat(saleData.total_amount) : null,
      saleData.final_amount ? parseFloat(saleData.final_amount) : null,
      saleData.payment_method,
      saleData.order_status || 'Completed',
      saleData.delivery_type || 'Standard',
      saleData.store_id || 'STORE-001',
      saleData.store_location || 'Mumbai',
      saleData.salesperson_id || 'EMP-001',
      saleData.employee_name || 'Sales Person'
    ];
    
    const result = await client.query(query, values);
    return result.rows[0];
  } finally {
    client.release();
  }
};

/**
 * Create a new customer
 * @param {Object} customerInfo - Customer data
 * @returns {Promise<Object>} Created customer record
 */
export const createCustomer = async (customerInfo) => {
  // In a real application, this would insert into a customers table
  // For now, we'll simulate by returning the data with a generated ID
  return {
    id: `CUST-${Math.floor(10000 + Math.random() * 90000)}`,
    name: customerInfo.name,
    email: customerInfo.email,
    phone: customerInfo.phone,
    region: customerInfo.region,
    type: customerInfo.type || 'New',
    created_at: new Date().toISOString()
  };
};

/**
 * Get all products
 * @returns {Promise<Array>} Array of product records
 */
export const getAllProducts = async () => {
  // In a real application, this would query a products table
  // For now, we'll return an empty array
  return [];
};

/**
 * Create a new product
 * @param {Object} productInfo - Product data
 * @returns {Promise<Object>} Created product record
 */
export const createProduct = async (productInfo) => {
  // In a real application, this would insert into a products table
  // For now, we'll simulate by returning the data with a generated ID
  return {
    id: `PROD-${Math.floor(1000 + Math.random() * 9000)}`,
    name: productInfo.name,
    category: productInfo.category,
    brand: productInfo.brand,
    price: productInfo.price,
    stock: productInfo.stock || 0,
    subcategory: productInfo.subcategory || '',
    created_at: new Date().toISOString()
  };
};

/**
 * Get sales summary statistics
 * @returns {Promise<Object>} Summary statistics
 */
export const getSalesSummary = async () => {
  const client = await pool.connect();
  
  try {
    const query = `
      SELECT 
        COALESCE(SUM(quantity), 0) as total_units,
        COALESCE(SUM(final_amount), 0) as total_amount,
        COUNT(*) as total_transactions,
        COALESCE(SUM(total_amount - final_amount), 0) as total_discount
      FROM sales
    `;
    
    const result = await client.query(query);
    const row = result.rows[0];
    
    return {
      totalUnits: parseInt(row.total_units) || 0,
      totalAmount: parseFloat(row.total_amount) || 0,
      totalTransactions: parseInt(row.total_transactions) || 0,
      totalDiscount: parseFloat(row.total_discount) || 0
    };
  } finally {
    client.release();
  }
};

/**
 * Get unique filter values
 * @returns {Promise<Object>} Unique values for various filters
 */
export const getFilterValues = async () => {
  const client = await pool.connect();
  
  try {
    // Get unique regions
    const regionsResult = await client.query('SELECT DISTINCT customer_region FROM sales WHERE customer_region IS NOT NULL ORDER BY customer_region');
    const regions = regionsResult.rows.map(row => row.customer_region);
    
    // Get unique categories
    const categoriesResult = await client.query('SELECT DISTINCT product_category FROM sales WHERE product_category IS NOT NULL ORDER BY product_category');
    const categories = categoriesResult.rows.map(row => row.product_category);
    
    // Get unique payment methods
    const paymentMethodsResult = await client.query('SELECT DISTINCT payment_method FROM sales WHERE payment_method IS NOT NULL ORDER BY payment_method');
    const paymentMethods = paymentMethodsResult.rows.map(row => row.payment_method);
    
    return {
      regions,
      categories,
      paymentMethods
    };
  } finally {
    client.release();
  }
};

/**
 * Initialize database connection
 * @returns {Promise<void>}
 */
export const initDatabase = async () => {
  const client = await pool.connect();
  
  try {
    // Test connection
    await client.query('SELECT NOW()');
    console.log('Database connection established successfully');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    console.error('Error code:', error.code);
    console.error('Error detail:', error.detail);
    console.error('Database config used:', {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      database: process.env.DB_NAME || 'sales_db',
      user: process.env.DB_USER || 'postgres'
    });
    throw error;
  } finally {
    client.release();
  }
};
