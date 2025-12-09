# Backend Setup Guide

## Prerequisites

1. Node.js (version 14 or higher)
2. PostgreSQL database server
3. Git

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Database Setup

### Option 1: Automated Setup (Recommended)

1. Set up environment variables:
   ```bash
   export DB_HOST=localhost
   export DB_PORT=5432
   export DB_NAME=sales_db
   export DB_USER=postgres
   export DB_PASSWORD=your_password
   export DB_ADMIN_USER=postgres  # User with permissions to create databases
   export DB_ADMIN_PASSWORD=your_admin_password
   ```

2. Run the automated setup script:
   ```bash
   npm run setup-db
   ```

3. Import the CSV data:
   ```bash
   npm run import-csv
   ```

### Option 2: Manual Setup

1. Create a PostgreSQL database:
   ```sql
   CREATE DATABASE sales_db;
   ```

2. Connect to the database and run the migration:
   ```bash
   psql -h localhost -p 5432 -U postgres -d sales_db -f migrations/01_create_sales_table.sql
   ```

3. Import the CSV data:
   ```bash
   node scripts/import-csv.js backend/dataset/truestate_assignment_dataset.csv
   ```

## CSV Data Import

The sales data CSV file is hosted on Google Drive. You can import the data in two ways:

### Option 1: Automatic Download and Import (Recommended)
This will automatically download the CSV file from Google Drive and import it:

```bash
npm run download-and-import
```

### Option 2: Manual Download and Import
1. Download the CSV file:
   ```bash
   curl -L "https://drive.google.com/uc?export=download&id=1tzbyuxBmrBwMSXbL22r33FUMtO0V_lxb" -o backend/dataset/truestate_assignment_dataset.csv
   ```

2. Run the import script:
   ```bash
   npm run import-csv
   ```

## Database Maintenance Scripts

### Reset Database
To completely reset the database (drop and recreate):
```bash
npm run reset-db
```

### Verify Database Connection
To verify the database connection and run basic queries:
```bash
npm run verify-db
```

### Test Database Setup
To run a comprehensive test of the database setup:
```bash
npm run test-db
```

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```
DB_HOST=${DATABASE_URL}
DB_PORT=5432
DB_NAME=sales_db
DB_USER=postgres
DB_PASSWORD=Neet@123
NODE_ENV=production
```

## Starting the Server

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## Database Schema

The database contains a single `sales` table with the following columns:

- `id` - Primary key (SERIAL)
- `transaction_id` - Transaction identifier (VARCHAR)
- `date` - Transaction date (DATE)
- `customer_id` - Customer identifier (VARCHAR)
- `customer_name` - Customer name (VARCHAR)
- `phone_number` - Customer phone number (VARCHAR)
- `gender` - Customer gender (VARCHAR)
- `age` - Customer age (INTEGER)
- `customer_region` - Customer region (VARCHAR)
- `customer_type` - Customer type (VARCHAR)
- `product_id` - Product identifier (VARCHAR)
- `product_name` - Product name (VARCHAR)
- `brand` - Product brand (VARCHAR)
- `product_category` - Product category (VARCHAR)
- `tags` - Product tags (TEXT[])
- `quantity` - Quantity purchased (INTEGER)
- `price_per_unit` - Price per unit (DECIMAL)
- `discount_percentage` - Discount percentage (DECIMAL)
- `total_amount` - Total amount before discount (DECIMAL)
- `final_amount` - Final amount after discount (DECIMAL)
- `payment_method` - Payment method (VARCHAR)
- `order_status` - Order status (VARCHAR)
- `delivery_type` - Delivery type (VARCHAR)
- `store_id` - Store identifier (VARCHAR)
- `store_location` - Store location (VARCHAR)
- `salesperson_id` - Salesperson identifier (VARCHAR)
- `employee_name` - Employee name (VARCHAR)
- `created_at` - Record creation timestamp (TIMESTAMP)
- `updated_at` - Record update timestamp (TIMESTAMP)

## Indexes

The following indexes are created for performance optimization:

- `idx_sales_date` - For date-based queries
- `idx_sales_customer_region` - For region-based filtering
- `idx_sales_product_category` - For category-based filtering
- `idx_sales_gender` - For gender-based filtering
- `idx_sales_payment_method` - For payment method filtering
- `idx_sales_customer_name` - For customer name searches
- `idx_sales_phone_number` - For phone number searches
- `idx_sales_tags` - GIN index for tag-based filtering
- `idx_sales_final_amount` - For amount-based queries
- `idx_sales_store_location` - For location-based filtering
- `idx_sales_order_status` - For status-based filtering

## API Endpoints

- `GET /api/sales` - Get sales data with filtering and pagination
- `GET /api/sales/summary` - Get sales summary statistics
- `GET /api/sales/filters` - Get unique filter values
- `POST /api/sales` - Create a new sale
- `POST /api/customers` - Create a new customer
- `GET /api/products` - Get all products
- `POST /api/products` - Create a new product

## Performance Considerations

1. The database is optimized with indexes on commonly filtered columns
2. The tags column uses PostgreSQL's array type with a GIN index for efficient multi-value filtering
3. Pagination is implemented at the database level to handle large datasets
4. Batch processing is used when importing CSV data to improve performance

## Troubleshooting

### Database Connection Issues

1. Ensure PostgreSQL is running
2. Verify database credentials in environment variables
3. Check firewall settings if connecting to a remote database

### CSV Import Issues

1. Ensure the CSV file is in the correct format
2. Check that the database schema matches the CSV structure
3. Verify sufficient disk space for the import operation

### Performance Issues

1. Monitor database query performance with `EXPLAIN ANALYZE`
2. Consider adding additional indexes for specific query patterns
3. Optimize batch sizes for imports based on available memory

## Testing the Database Setup

To verify that the database setup and CSV import are working correctly, run:

```bash
npm run test-db
```

This will:
1. Create a test database
2. Run the setup script
3. Import sample data from the CSV file
4. Verify that all operations complete successfully

## ☁️ Render Deployment Instructions

To deploy this backend to Render with PostgreSQL:

1. Create a PostgreSQL database on Render
2. Deploy the backend as a Web Service with the following settings:
   - Build command: `npm install`
   - Start command: `npm start`
   - Environment variables:
     - `DATABASE_URL` (provided by Render PostgreSQL service)
     - `NODE_ENV=production`

3. After deployment, initialize the database by running:
   ```bash
   render run npm run setup-db
   ```
   
4. Import the CSV data by running:
   ```bash
   render run npm run download-and-import
   ```

5. The backend will be accessible at your Render service URL