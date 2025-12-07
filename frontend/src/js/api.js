// frontend/src/js/api.js
const API_BASE_URL = 'http://localhost:3000';

export const fetchSales = async (params = {}) => {
  try {
    // Build query string from params
    const queryParams = new URLSearchParams();
    
    // Add all non-empty params to query
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });
    
    const queryString = queryParams.toString();
    const url = `${API_BASE_URL}/api/sales${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching sales:', error);
    throw error;
  }
};

export const fetchSaleById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/sales/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching sale with ID ${id}:`, error);
    throw error;
  }
};

export const fetchSalesSummary = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/sales/summary`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching sales summary:', error);
    throw error;
  }
};

export const fetchFilterValues = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/sales/filters`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching filter values:', error);
    throw error;
  }
};

export const createSale = async (saleData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/sales`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(saleData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating sale:', error);
    throw error;
  }
};

export const createCustomer = async (customerData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
};

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};