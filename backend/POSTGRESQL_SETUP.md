# PostgreSQL Setup Guide for TruEstate R.S.M.S.

This guide provides instructions for setting up PostgreSQL for the TruEstate R.S.M.S. project. You have two options:

1. Install PostgreSQL locally
2. Use a cloud PostgreSQL service

## Option 1: Local PostgreSQL Installation (Recommended for Development)

### Windows Installation

1. Download PostgreSQL for Windows from the official website: https://www.postgresql.org/download/windows/
2. Run the installer and follow these steps:
   - Select default installation directory
   - Choose all default components
   - Set password for the `postgres` user (remember this password)
   - Choose port `5432` (default)
   - Select locale as `[Default locale]`
3. Complete the installation

### Post-Installation Steps

1. Add PostgreSQL to your PATH (usually done automatically):
   - Add `C:\Program Files\PostgreSQL\[version]\bin` to your system PATH

2. Verify installation:
   ```bash
   psql --version
   ```

3. Start PostgreSQL service:
   - Open Services (services.msc)
   - Find "postgresql-x64-[version]-PostgreSQL Server"
   - Right-click and select "Start" if it's not already running

4. Test connection:
   ```bash
   psql -U postgres -h localhost -p 5432
   ```
   (Use the password you set during installation)

## Option 2: Cloud PostgreSQL Service

### Using Supabase (Free Tier Available)

1. Go to https://supabase.com/
2. Sign up for a free account
3. Create a new project
4. Get your database connection details:
   - Host
   - Port (usually 5432)
   - Database name
   - User
   - Password

### Using ElephantSQL (Free Tier Available)

1. Go to https://www.elephantsql.com/
2. Sign up for a free account
3. Create a new instance
4. Get your database connection details

### Using Render (Free Tier Available)

1. Go to https://render.com/
2. Sign up for a free account
3. Create a new PostgreSQL database
4. Get your database connection details

## Configuring Environment Variables

Update your `.env` file with the appropriate values:

```env
# Database Configuration
DB_HOST=your_host_here        # localhost for local, cloud host for cloud services
DB_PORT=5432                  # Usually 5432
DB_NAME=sales_db              # Database name
DB_USER=your_username_here    # postgres for local, cloud username for cloud services
DB_PASSWORD=your_password_here # Password set during installation or provided by cloud service
DB_ADMIN_USER=your_admin_user # Usually same as DB_USER
DB_ADMIN_PASSWORD=your_admin_password # Usually same as DB_PASSWORD

# Application Configuration
NODE_ENV=development
PORT=3000
```

## Setting Up the Database

Once PostgreSQL is running and environment variables are configured:

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Run the database setup script:
   ```bash
   npm run setup-db
   ```

3. Import the CSV data:
   ```bash
   npm run import-csv
   ```

4. Verify the setup:
   ```bash
   npm run verify-db
   ```

## Troubleshooting

### Common Issues

1. **Connection Refused**: Make sure PostgreSQL service is running
2. **Authentication Failed**: Check username and password in `.env` file
3. **Database Does Not Exist**: Run `npm run setup-db` first
4. **Permission Denied**: Make sure your user has permission to create databases

### Checking PostgreSQL Service Status (Windows)

1. Open Services (services.msc)
2. Find "postgresql-x64-[version]-PostgreSQL Server"
3. Check if the status is "Running"

### Restarting PostgreSQL Service (Windows)

1. Open Services (services.msc)
2. Find "postgresql-x64-[version]-PostgreSQL Server"
3. Right-click and select "Restart"

### Connecting via psql

To connect directly to your database using psql:

```bash
psql -h localhost -p 5432 -U postgres -d sales_db
```

### Useful psql Commands

Once connected to the database:

- `\dt` - List all tables
- `\d sales` - Describe the sales table
- `SELECT COUNT(*) FROM sales;` - Count records in sales table
- `\q` - Quit psql

## Database Schema

The sales table contains the following columns:

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

## Performance Considerations

The database includes the following indexes for optimal performance:

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