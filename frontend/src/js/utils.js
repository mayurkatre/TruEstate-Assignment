// frontend/src/js/utils.js
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const truncateText = (text, maxLength) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Build query params from filter state
export const buildQueryParams = (state) => {
  const params = {};
  
  // Add search query
  if (state.q) params.q = state.q;
  
  // Add filters
  if (state.regions && state.regions.length > 0) params.regions = state.regions.join(',');
  if (state.genders && state.genders.length > 0) params.genders = state.genders.join(',');
  if (state.categories && state.categories.length > 0) params.categories = state.categories.join(',');
  if (state.tags && state.tags.length > 0) params.tags = state.tags.join(',');
  if (state.paymentMethods && state.paymentMethods.length > 0) params.paymentMethods = state.paymentMethods.join(',');
  
  // Add age range
  if (state.ageMin !== '' && state.ageMin !== undefined) params.ageMin = state.ageMin;
  if (state.ageMax !== '' && state.ageMax !== undefined) params.ageMax = state.ageMax;
  
  // Add date range
  if (state.dateFrom) params.dateFrom = state.dateFrom;
  if (state.dateTo) params.dateTo = state.dateTo;
  
  // Add sorting
  if (state.sortBy) params.sortBy = state.sortBy;
  if (state.sortDir) params.sortDir = state.sortDir;
  
  // Add pagination
  if (state.page) params.page = state.page;
  if (state.pageSize) params.pageSize = state.pageSize;
  
  return params;
};