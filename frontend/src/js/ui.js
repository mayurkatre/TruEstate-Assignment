// frontend/src/js/ui.js
export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export const getStatusClass = (status) => {
  switch (status.toLowerCase()) {
    case 'paid':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'overdue':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getStockClass = (stock) => {
  if (stock > 100) return 'bg-green-100 text-green-800';
  if (stock > 50) return 'bg-yellow-100 text-yellow-800';
  return 'bg-red-100 text-red-800';
};