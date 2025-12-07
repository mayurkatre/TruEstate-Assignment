/**
 * @typedef {Object} Sale
 * @property {number} id
 * @property {string} transaction_id
 * @property {string} date
 * @property {string} customer_id
 * @property {string} customer_name
 * @property {string|null} phone_number
 * @property {string|null} gender
 * @property {number|null} age
 * @property {string|null} customer_region
 * @property {string|null} customer_type
 * @property {string|null} product_id
 * @property {string|null} product_name
 * @property {string|null} brand
 * @property {string|null} category
 * @property {string|null} subcategory
 * @property {number|null} quantity
 * @property {number|null} price_per_unit
 * @property {number|null} discount_percentage
 * @property {number|null} total_amount
 * @property {number|null} final_amount
 * @property {string|null} payment_method
 * @property {string|null} order_status
 * @property {string|null} delivery_type
 * @property {string|null} store_id
 * @property {string|null} store_location
 * @property {string|null} salesperson_id
 * @property {string|null} employee_name
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * @typedef {Object} SalesQuery
 * @property {string} [q]
 * @property {string} [regions]
 * @property {string} [genders]
 * @property {number} [ageMin]
 * @property {number} [ageMax]
 * @property {string} [categories]
 * @property {string} [tags]
 * @property {string} [paymentMethods]
 * @property {string} [dateFrom]
 * @property {string} [dateTo]
 * @property {'date'|'quantity'|'customer_name'} [sortBy]
 * @property {'asc'|'desc'} [sortDir]
 * @property {number} [page=1]
 * @property {number} [pageSize=10]
 */

/**
 * @typedef {Object} SalesResponse
 * @property {number} total
 * @property {number} page
 * @property {number} pageSize
 * @property {Sale[]} items
 */

// Schema validation functions (simplified)
const validateSale = (data) => {
  // In a real implementation, you would validate the data structure here
  return typeof data === 'object' && data !== null;
};

const validateSalesQuery = (query) => {
  // In a real implementation, you would validate the query parameters here
  return typeof query === 'object' && query !== null;
};

module.exports = {
  validateSale,
  validateSalesQuery
};
