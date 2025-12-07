// backend/src/services/databaseService.js
/**
 * Simple in-memory database service for demonstration purposes
 * In a real application, this would connect to a proper database
 */

// Sample data based on the provided schema
// Sample data based on the provided schema
let salesData = [
  {
    id: 1,
    transaction_id: "1",
    date: "23-03-2023",
    customer_id: "CUST-40823",
    customer_name: "Neha Khan",
    phone_number: "9720639364",
    gender: "Female",
    age: 21,
    customer_region: "East",
    customer_type: "Returning",
    product_id: "PROD-8721",
    product_name: "Herbal Face Wash",
    brand: "SilkSkin",
    category: "Beauty",
    subcategory: "organic",
    quantity: 1,
    price_per_unit: 500,
    discount_percentage: 10,
    total_amount: 450,
    final_amount: 450,
    payment_method: "UPI",
    order_status: "Completed",
    delivery_type: "Standard",
    store_id: "STORE-001",
    store_location: "Mumbai",
    salesperson_id: "EMP-001",
    employee_name: "Neha Khan",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 2,
    transaction_id: "2",
    date: "30-01-2021",
    customer_id: "CUST-79592",
    customer_name: "Prerna Mehta",
    phone_number: "9159953102",
    gender: "Female",
    age: 19,
    customer_region: "Central",
    customer_type: "Returning",
    product_id: "PROD-5451",
    product_name: "USB-C Charger",
    brand: "TechPulse",
    category: "Electronics",
    subcategory: "portable",
    quantity: 2,
    price_per_unit: 1500,
    discount_percentage: 5,
    total_amount: 2850,
    final_amount: 2850,
    payment_method: "Credit Card",
    order_status: "Completed",
    delivery_type: "Express",
    store_id: "STORE-002",
    store_location: "Delhi",
    salesperson_id: "EMP-002",
    employee_name: "Prerna Mehta",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 3,
    transaction_id: "3",
    date: "23-08-2022",
    customer_id: "CUST-53317",
    customer_name: "Arjun Das",
    phone_number: "9624084493",
    gender: "Male",
    age: 24,
    customer_region: "North",
    customer_type: "Returning",
    product_id: "PROD-8448",
    product_name: "Gaming Mouse",
    brand: "CyberCore",
    category: "Electronics",
    subcategory: "portable",
    quantity: 1,
    price_per_unit: 3500,
    discount_percentage: 0,
    total_amount: 3500,
    final_amount: 3500,
    payment_method: "Debit Card",
    order_status: "Completed",
    delivery_type: "Standard",
    store_id: "STORE-003",
    store_location: "Chennai",
    salesperson_id: "EMP-003",
    employee_name: "Arjun Das",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 4,
    transaction_id: "4",
    date: "03-02-2021",
    customer_id: "CUST-13864",
    customer_name: "Zoya Joshi",
    phone_number: "9396223918",
    gender: "Female",
    age: 60,
    customer_region: "South",
    customer_type: "Returning",
    product_id: "PROD-5915",
    product_name: "Slim Fit Jeans",
    brand: "UrbanWeave",
    category: "Clothing",
    subcategory: "casual",
    quantity: 2,
    price_per_unit: 1200,
    discount_percentage: 15,
    total_amount: 2040,
    final_amount: 2040,
    payment_method: "Cash",
    order_status: "Completed",
    delivery_type: "Standard",
    store_id: "STORE-004",
    store_location: "Bangalore",
    salesperson_id: "EMP-004",
    employee_name: "Zoya Joshi",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 5,
    transaction_id: "5",
    date: "31-03-2021",
    customer_id: "CUST-98319",
    customer_name: "Anjali Yadav",
    phone_number: "9669733171",
    gender: "Female",
    age: 25,
    customer_region: "North",
    customer_type: "Loyal",
    product_id: "PROD-5961",
    product_name: "Herbal Face Wash",
    brand: "SilkSkin",
    category: "Beauty",
    subcategory: "skincare",
    quantity: 1,
    price_per_unit: 450,
    discount_percentage: 0,
    total_amount: 450,
    final_amount: 450,
    payment_method: "UPI",
    order_status: "Completed",
    delivery_type: "Standard",
    store_id: "STORE-001",
    store_location: "Mumbai",
    salesperson_id: "EMP-001",
    employee_name: "Anjali Yadav",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 6,
    transaction_id: "6",
    date: "31-08-2021",
    customer_id: "CUST-53321",
    customer_name: "Suresh Iyer",
    phone_number: "9657125783",
    gender: "Male",
    age: 55,
    customer_region: "North",
    customer_type: "Returning",
    product_id: "PROD-9434",
    product_name: "Cotton T-Shirt",
    brand: "StreetLayer",
    category: "Clothing",
    subcategory: "unisex",
    quantity: 3,
    price_per_unit: 800,
    discount_percentage: 10,
    total_amount: 2160,
    final_amount: 2160,
    payment_method: "Credit Card",
    order_status: "Completed",
    delivery_type: "Express",
    store_id: "STORE-003",
    store_location: "Chennai",
    salesperson_id: "EMP-003",
    employee_name: "Suresh Iyer",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 7,
    transaction_id: "7",
    date: "28-04-2021",
    customer_id: "CUST-76213",
    customer_name: "Ritika Chopra",
    phone_number: "9100671247",
    gender: "Female",
    age: 42,
    customer_region: "West",
    customer_type: "New",
    product_id: "PROD-2486",
    product_name: "Bluetooth Speaker",
    brand: "VoltEdge",
    category: "Electronics",
    subcategory: "smart",
    quantity: 1,
    price_per_unit: 4500,
    discount_percentage: 5,
    total_amount: 4275,
    final_amount: 4275,
    payment_method: "Debit Card",
    order_status: "Completed",
    delivery_type: "Standard",
    store_id: "STORE-005",
    store_location: "Hyderabad",
    salesperson_id: "EMP-005",
    employee_name: "Ritika Chopra",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 8,
    transaction_id: "8",
    date: "12-07-2021",
    customer_id: "CUST-10839",
    customer_name: "Mahesh Mehta",
    phone_number: "9965297269",
    gender: "Male",
    age: 47,
    customer_region: "East",
    customer_type: "New",
    product_id: "PROD-9154",
    product_name: "Hooded Sweatshirt",
    brand: "ComfortLine",
    category: "Clothing",
    subcategory: "fashion",
    quantity: 1,
    price_per_unit: 2500,
    discount_percentage: 0,
    total_amount: 2500,
    final_amount: 2500,
    payment_method: "UPI",
    order_status: "Completed",
    delivery_type: "Standard",
    store_id: "STORE-006",
    store_location: "Kolkata",
    salesperson_id: "EMP-006",
    employee_name: "Mahesh Mehta",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 9,
    transaction_id: "9",
    date: "16-06-2023",
    customer_id: "CUST-43872",
    customer_name: "Suresh Sharma",
    phone_number: "9317845892",
    gender: "Male",
    age: 35,
    customer_region: "South",
    customer_type: "New",
    product_id: "PROD-7475",
    product_name: "Bluetooth Speaker",
    brand: "CyberCore",
    category: "Electronics",
    subcategory: "smart",
    quantity: 2,
    price_per_unit: 4000,
    discount_percentage: 10,
    total_amount: 7200,
    final_amount: 7200,
    payment_method: "Credit Card",
    order_status: "Completed",
    delivery_type: "Express",
    store_id: "STORE-004",
    store_location: "Bangalore",
    salesperson_id: "EMP-004",
    employee_name: "Suresh Sharma",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 10,
    transaction_id: "10",
    date: "17-07-2022",
    customer_id: "CUST-66880",
    customer_name: "Ritika Joshi",
    phone_number: "9642689633",
    gender: "Female",
    age: 47,
    customer_region: "North",
    customer_type: "Loyal",
    product_id: "PROD-2390",
    product_name: "Casual Kurta",
    brand: "StreetLayer",
    category: "Clothing",
    subcategory: "casual",
    quantity: 2,
    price_per_unit: 1800,
    discount_percentage: 5,
    total_amount: 3420,
    final_amount: 3420,
    payment_method: "Cash",
    order_status: "Completed",
    delivery_type: "Standard",
    store_id: "STORE-001",
    store_location: "Mumbai",
    salesperson_id: "EMP-001",
    employee_name: "Ritika Joshi",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 11,
    transaction_id: "11",
    date: "18-03-2023",
    customer_id: "CUST-64912",
    customer_name: "Sanjay Bansal",
    phone_number: "9268904111",
    gender: "Male",
    age: 57,
    customer_region: "West",
    customer_type: "New",
    product_id: "PROD-7692",
    product_name: "Matte Lipstick",
    brand: "VelvetTouch",
    category: "Beauty",
    subcategory: "organic",
    quantity: 3,
    price_per_unit: 600,
    discount_percentage: 0,
    total_amount: 1800,
    final_amount: 1800,
    payment_method: "UPI",
    order_status: "Completed",
    delivery_type: "Standard",
    store_id: "STORE-005",
    store_location: "Hyderabad",
    salesperson_id: "EMP-005",
    employee_name: "Sanjay Bansal",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 12,
    transaction_id: "12",
    date: "10-06-2022",
    customer_id: "CUST-58160",
    customer_name: "Mahesh Mehta",
    phone_number: "9266063747",
    gender: "Male",
    age: 53,
    customer_region: "West",
    customer_type: "New",
    product_id: "PROD-3174",
    product_name: "Wireless Headphones",
    brand: "NovaGear",
    category: "Electronics",
    subcategory: "smart",
    quantity: 1,
    price_per_unit: 8000,
    discount_percentage: 15,
    total_amount: 6800,
    final_amount: 6800,
    payment_method: "Debit Card",
    order_status: "Completed",
    delivery_type: "Express",
    store_id: "STORE-005",
    store_location: "Hyderabad",
    salesperson_id: "EMP-005",
    employee_name: "Mahesh Mehta",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 13,
    transaction_id: "13",
    date: "17-09-2023",
    customer_id: "CUST-26938",
    customer_name: "Farhan Khan",
    phone_number: "9491736503",
    gender: "Male",
    age: 40,
    customer_region: "Central",
    customer_type: "Loyal",
    product_id: "PROD-8823",
    product_name: "Bluetooth Speaker",
    brand: "TechPulse",
    category: "Electronics",
    subcategory: "portable",
    quantity: 1,
    price_per_unit: 5000,
    discount_percentage: 0,
    total_amount: 5000,
    final_amount: 5000,
    payment_method: "Credit Card",
    order_status: "Completed",
    delivery_type: "Standard",
    store_id: "STORE-007",
    store_location: "Pune",
    salesperson_id: "EMP-007",
    employee_name: "Farhan Khan",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 14,
    transaction_id: "14",
    date: "18-07-2021",
    customer_id: "CUST-23645",
    customer_name: "Prerna Chopra",
    phone_number: "9387515030",
    gender: "Female",
    age: 24,
    customer_region: "West",
    customer_type: "New",
    product_id: "PROD-6571",
    product_name: "Bluetooth Speaker",
    brand: "VoltEdge",
    category: "Electronics",
    subcategory: "accessories",
    quantity: 2,
    price_per_unit: 4500,
    discount_percentage: 10,
    total_amount: 8100,
    final_amount: 8100,
    payment_method: "UPI",
    order_status: "Completed",
    delivery_type: "Express",
    store_id: "STORE-005",
    store_location: "Hyderabad",
    salesperson_id: "EMP-005",
    employee_name: "Prerna Chopra",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 15,
    transaction_id: "15",
    date: "15-01-2023",
    customer_id: "CUST-56533",
    customer_name: "Anjali Agarwal",
    phone_number: "9069392523",
    gender: "Female",
    age: 54,
    customer_region: "West",
    customer_type: "Loyal",
    product_id: "PROD-7533",
    product_name: "Bluetooth Speaker",
    brand: "VoltEdge",
    category: "Electronics",
    subcategory: "gadgets",
    quantity: 1,
    price_per_unit: 6000,
    discount_percentage: 5,
    total_amount: 5700,
    final_amount: 5700,
    payment_method: "Cash",
    order_status: "Completed",
    delivery_type: "Standard",
    store_id: "STORE-005",
    store_location: "Hyderabad",
    salesperson_id: "EMP-005",
    employee_name: "Anjali Agarwal",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// Sample customer data
let customerData = [
  { id: 'CUST-40823', name: 'Neha Khan', email: 'neha.khan@example.com', phone: '9720639364', region: 'East', type: 'Returning' },
  { id: 'CUST-79592', name: 'Prerna Mehta', email: 'prerna.mehta@example.com', phone: '9159953102', region: 'Central', type: 'Returning' },
  { id: 'CUST-53317', name: 'Arjun Das', email: 'arjun.das@example.com', phone: '9624084493', region: 'North', type: 'Returning' },
  { id: 'CUST-13864', name: 'Zoya Joshi', email: 'zoya.joshi@example.com', phone: '9396223918', region: 'South', type: 'Returning' },
  { id: 'CUST-98319', name: 'Anjali Yadav', email: 'anjali.yadav@example.com', phone: '9669733171', region: 'North', type: 'Loyal' },
  { id: 'CUST-53321', name: 'Suresh Iyer', email: 'suresh.iyer@example.com', phone: '9657125783', region: 'North', type: 'Returning' },
  { id: 'CUST-76213', name: 'Ritika Chopra', email: 'ritika.chopra@example.com', phone: '9100671247', region: 'West', type: 'New' },
  { id: 'CUST-10839', name: 'Mahesh Mehta', email: 'mahesh.mehta@example.com', phone: '9965297269', region: 'East', type: 'New' },
  { id: 'CUST-43872', name: 'Suresh Sharma', email: 'suresh.sharma@example.com', phone: '9317845892', region: 'South', type: 'New' },
  { id: 'CUST-66880', name: 'Ritika Joshi', email: 'ritika.joshi@example.com', phone: '9642689633', region: 'North', type: 'Loyal' },
  { id: 'CUST-64912', name: 'Sanjay Bansal', email: 'sanjay.bansal@example.com', phone: '9268904111', region: 'West', type: 'New' },
  { id: 'CUST-58160', name: 'Mahesh Mehta', email: 'mahesh.mehta2@example.com', phone: '9266063747', region: 'West', type: 'New' },
  { id: 'CUST-26938', name: 'Farhan Khan', email: 'farhan.khan@example.com', phone: '9491736503', region: 'Central', type: 'Loyal' },
  { id: 'CUST-23645', name: 'Prerna Chopra', email: 'prerna.chopra2@example.com', phone: '9387515030', region: 'West', type: 'New' },
  { id: 'CUST-56533', name: 'Anjali Agarwal', email: 'anjali.agarwal@example.com', phone: '9069392523', region: 'West', type: 'Loyal' }
];

// Sample product data
let productData = [
  { id: 'PROD-8721', name: 'Herbal Face Wash', category: 'Beauty', brand: 'SilkSkin', price: 500, stock: 45, subcategory: 'organic' },
  { id: 'PROD-5451', name: 'USB-C Charger', category: 'Electronics', brand: 'TechPulse', price: 1500, stock: 120, subcategory: 'portable' },
  { id: 'PROD-8448', name: 'Gaming Mouse', category: 'Electronics', brand: 'CyberCore', price: 3500, stock: 35, subcategory: 'portable' },
  { id: 'PROD-5915', name: 'Slim Fit Jeans', category: 'Clothing', brand: 'UrbanWeave', price: 1200, stock: 78, subcategory: 'casual' },
  { id: 'PROD-5961', name: 'Herbal Face Wash', category: 'Beauty', brand: 'SilkSkin', price: 450, stock: 62, subcategory: 'skincare' },
  { id: 'PROD-9434', name: 'Cotton T-Shirt', category: 'Clothing', brand: 'StreetLayer', price: 800, stock: 156, subcategory: 'unisex' },
  { id: 'PROD-2486', name: 'Bluetooth Speaker', category: 'Electronics', brand: 'VoltEdge', price: 4500, stock: 28, subcategory: 'smart' },
  { id: 'PROD-9154', name: 'Hooded Sweatshirt', category: 'Clothing', brand: 'ComfortLine', price: 2500, stock: 42, subcategory: 'fashion' },
  { id: 'PROD-7475', name: 'Bluetooth Speaker', category: 'Electronics', brand: 'CyberCore', price: 4000, stock: 22, subcategory: 'smart' },
  { id: 'PROD-2390', name: 'Casual Kurta', category: 'Clothing', brand: 'StreetLayer', price: 1800, stock: 67, subcategory: 'casual' }
];

/**
 * Get all sales with optional filtering and sorting
 * @param {Object} filters - Filter parameters
 * @returns {Array} Array of sales records
 */
export const getAllSales = (filters = {}) => {
  let filteredSales = [...salesData];
  
  // Apply filters if provided
  if (filters.q) {
    const searchTerm = filters.q.toLowerCase();
    filteredSales = filteredSales.filter(sale => 
      sale.customer_name.toLowerCase().includes(searchTerm) ||
      (sale.phone_number && sale.phone_number.includes(searchTerm))
    );
  }
  
  if (filters.regions) {
    const regions = filters.regions.split(',');
    filteredSales = filteredSales.filter(sale => 
      regions.includes(sale.customer_region)
    );
  }
  
  if (filters.genders) {
    const genders = filters.genders.split(',');
    filteredSales = filteredSales.filter(sale => 
      genders.includes(sale.gender)
    );
  }
  
  if (filters.categories) {
    const categories = filters.categories.split(',');
    filteredSales = filteredSales.filter(sale => 
      categories.includes(sale.category)
    );
  }
  
  if (filters.paymentMethods) {
    const methods = filters.paymentMethods.split(',');
    filteredSales = filteredSales.filter(sale => 
      methods.includes(sale.payment_method)
    );
  }
  
  if (filters.tags) {
    const tags = filters.tags.split(',');
    filteredSales = filteredSales.filter(sale => 
      tags.some(tag => sale.subcategory && sale.subcategory.toLowerCase().includes(tag.toLowerCase()))
    );
  }
  
  // Age range filter
  if (filters.ageMin || filters.ageMax) {
    const minAge = filters.ageMin ? parseInt(filters.ageMin) : 0;
    const maxAge = filters.ageMax ? parseInt(filters.ageMax) : 100;
    filteredSales = filteredSales.filter(sale => 
      sale.age >= minAge && sale.age <= maxAge
    );
  }
  
  // Date range filter
  if (filters.dateFrom || filters.dateTo) {
    filteredSales = filteredSales.filter(sale => {
      const saleDate = new Date(sale.date.split('-').reverse().join('-'));
      const fromDate = filters.dateFrom ? new Date(filters.dateFrom) : new Date('1900-01-01');
      const toDate = filters.dateTo ? new Date(filters.dateTo) : new Date('2100-12-31');
      return saleDate >= fromDate && saleDate <= toDate;
    });
  }
  
  // Apply sorting
  if (filters.sortBy) {
    const sortField = filters.sortBy;
    const sortDirection = filters.sortDir === 'desc' ? -1 : 1;
    
    filteredSales.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      // Handle special cases
      if (sortField === 'date') {
        aValue = new Date(aValue.split('-').reverse().join('-'));
        bValue = new Date(bValue.split('-').reverse().join('-'));
      }
      
      if (aValue < bValue) return -1 * sortDirection;
      if (aValue > bValue) return 1 * sortDirection;
      return 0;
    });
  }
  
  return filteredSales;
};

/**
 * Get a sale by ID
 * @param {number} id - Sale ID
 * @returns {Object|null} Sale record or null if not found
 */
export const getSaleById = (id) => {
  return salesData.find(sale => sale.id === parseInt(id)) || null;
};

/**
 * Create a new sale/invoice
 * @param {Object} saleData - Sale data
 * @returns {Object} Created sale record
 */
export const createSale = (saleData) => {
  // Generate new ID
  const newId = Math.max(...salesData.map(s => s.id), 0) + 1;
  
  // Generate transaction ID
  const transactionId = newId.toString();
  
  // Create new sale record
  const newSale = {
    id: newId,
    transaction_id: transactionId,
    date: saleData.date || new Date().toLocaleDateString('en-GB'),
    customer_id: saleData.customer_id,
    customer_name: saleData.customer_name,
    phone_number: saleData.phone_number,
    gender: saleData.gender,
    age: saleData.age,
    customer_region: saleData.customer_region,
    customer_type: saleData.customer_type || 'New',
    product_id: saleData.product_id,
    product_name: saleData.product_name,
    brand: saleData.brand,
    category: saleData.category,
    subcategory: saleData.subcategory,
    quantity: saleData.quantity,
    price_per_unit: saleData.price_per_unit,
    discount_percentage: saleData.discount_percentage || 0,
    total_amount: saleData.total_amount,
    final_amount: saleData.final_amount,
    payment_method: saleData.payment_method,
    order_status: 'Completed',
    delivery_type: saleData.delivery_type || 'Standard',
    store_id: saleData.store_id || 'STORE-001',
    store_location: saleData.store_location || 'Mumbai',
    salesperson_id: saleData.salesperson_id || 'EMP-001',
    employee_name: saleData.employee_name || 'Sales Person',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  // Add to sales data
  salesData.push(newSale);
  
  return newSale;
};

/**
 * Create a new customer
 * @param {Object} customerData - Customer data
 * @returns {Object} Created customer record
 */
export const createCustomer = (customerInfo) => {
  // Generate new customer ID
  const customerId = `CUST-${Math.floor(10000 + Math.random() * 90000)}`;
  
  // Create new customer record
  const newCustomer = {
    id: customerId,
    name: customerInfo.name,
    email: customerInfo.email,
    phone: customerInfo.phone,
    region: customerInfo.region,
    type: customerInfo.type || 'New',
    created_at: new Date().toISOString()
  };
  
  // Add to customer data
  customerData.push(newCustomer);
  
  return newCustomer;
};

/**
 * Get all products
 * @returns {Array} Array of product records
 */
export const getAllProducts = () => {
  return [...productData];
};

/**
 * Create a new product
 * @param {Object} productInfo - Product data
 * @returns {Object} Created product record
 */
export const createProduct = (productInfo) => {
  // Generate new product ID
  const productId = `PROD-${Math.floor(1000 + Math.random() * 9000)}`;
  
  // Create new product record
  const newProduct = {
    id: productId,
    name: productInfo.name,
    category: productInfo.category,
    brand: productInfo.brand,
    price: productInfo.price,
    stock: productInfo.stock || 0,
    subcategory: productInfo.subcategory || '',
    created_at: new Date().toISOString()
  };
  
  // Add to product data
  productData.push(newProduct);
  
  return newProduct;
};

/**
 * Get sales summary statistics
 * @returns {Object} Summary statistics
 */
export const getSalesSummary = () => {
  const totalUnits = salesData.reduce((sum, sale) => sum + (sale.quantity || 0), 0);
  const totalAmount = salesData.reduce((sum, sale) => sum + (sale.final_amount || 0), 0);
  const totalTransactions = salesData.length;
  const totalDiscount = salesData.reduce((sum, sale) => {
    const discount = (sale.total_amount || 0) - (sale.final_amount || 0);
    return sum + discount;
  }, 0);
  
  return {
    totalUnits,
    totalAmount,
    totalTransactions,
    totalDiscount
  };
};

/**
 * Get unique filter values
 * @returns {Object} Unique values for various filters
 */
export const getFilterValues = () => {
  const regions = [...new Set(salesData.map(sale => sale.customer_region).filter(Boolean))];
  const categories = [...new Set(salesData.map(sale => sale.category).filter(Boolean))];
  const paymentMethods = [...new Set(salesData.map(sale => sale.payment_method).filter(Boolean))];
  
  return {
    regions,
    categories,
    paymentMethods
  };
};