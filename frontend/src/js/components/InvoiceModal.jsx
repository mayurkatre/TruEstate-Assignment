import { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

const InvoiceModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_id: '',
    phone_number: '',
    gender: '',
    age: '',
    customer_region: '',
    product_name: '',
    product_id: '',
    brand: '',
    category: '',
    quantity: 1,
    price_per_unit: 0,
    discount_percentage: 0,
    payment_method: 'Cash',
    delivery_type: 'Standard',
    store_location: 'Mumbai',
    employee_name: 'Sales Person'
  });

  const [items, setItems] = useState([
    {
      product_name: '',
      product_id: '',
      brand: '',
      category: '',
      quantity: 1,
      price_per_unit: 0,
      discount_percentage: 0
    }
  ]);

  useEffect(() => {
    if (isOpen) {
      // Reset form when modal opens
      setFormData({
        customer_name: '',
        customer_id: '',
        phone_number: '',
        gender: '',
        age: '',
        customer_region: '',
        product_name: '',
        product_id: '',
        brand: '',
        category: '',
        quantity: 1,
        price_per_unit: 0,
        discount_percentage: 0,
        payment_method: 'Cash',
        delivery_type: 'Standard',
        store_location: 'Mumbai',
        employee_name: 'Sales Person'
      });
      setItems([
        {
          product_name: '',
          product_id: '',
          brand: '',
          category: '',
          quantity: 1,
          price_per_unit: 0,
          discount_percentage: 0
        }
      ]);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems(prev => [...prev, {
      product_name: '',
      product_id: '',
      brand: '',
      category: '',
      quantity: 1,
      price_per_unit: 0,
      discount_percentage: 0
    }]);
  };

  const removeItem = (index) => {
    if (items.length > 1) {
      setItems(prev => prev.filter((_, i) => i !== index));
    }
  };

  const calculateItemTotal = (item) => {
    const subtotal = item.quantity * item.price_per_unit;
    const discount = (subtotal * item.discount_percentage) / 100;
    return subtotal - discount;
  };

  const calculateGrandTotal = () => {
    return items.reduce((total, item) => total + calculateItemTotal(item), 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // For simplicity, we'll submit the first item as the main sale
    // In a real app, you'd want to create multiple sales or a single sale with line items
    const firstItem = items[0];
    const submissionData = {
      ...formData,
      ...firstItem,
      total_amount: firstItem.quantity * firstItem.price_per_unit,
      final_amount: calculateItemTotal(firstItem),
      date: new Date().toLocaleDateString('en-GB')
    };
    
    onSubmit(submissionData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Create New Invoice</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          {/* Customer Information */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Customer Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Customer Name *</label>
                <input
                  type="text"
                  name="customer_name"
                  value={formData.customer_name}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Region</label>
                <input
                  type="text"
                  name="customer_region"
                  value={formData.customer_region}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>
          
          {/* Items */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Items</h3>
              <button
                type="button"
                onClick={addItem}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold transition-all"
              >
                <Plus className="w-4 h-4" />
                Add Item
              </button>
            </div>
            
            {items.map((item, index) => (
              <div key={index} className="mb-4 p-4 border border-gray-200 rounded-xl bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-slate-900">Item {index + 1}</h4>
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Product Name *</label>
                    <input
                      type="text"
                      value={item.product_name}
                      onChange={(e) => handleItemChange(index, 'product_name', e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Brand</label>
                    <input
                      type="text"
                      value={item.brand}
                      onChange={(e) => handleItemChange(index, 'brand', e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                    <input
                      type="text"
                      value={item.category}
                      onChange={(e) => handleItemChange(index, 'category', e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Quantity *</label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 1)}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Price per Unit *</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.price_per_unit}
                      onChange={(e) => handleItemChange(index, 'price_per_unit', parseFloat(e.target.value) || 0)}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Discount (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={item.discount_percentage}
                      onChange={(e) => handleItemChange(index, 'discount_percentage', parseFloat(e.target.value) || 0)}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="text-sm text-slate-700">
                    Item Total: <span className="font-semibold">₹{calculateItemTotal(item).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Payment Details */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Payment Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Payment Method</label>
                <select
                  name="payment_method"
                  value={formData.payment_method}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                >
                  <option value="Cash">Cash</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="UPI">UPI</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Delivery Type</label>
                <select
                  name="delivery_type"
                  value={formData.delivery_type}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                >
                  <option value="Standard">Standard</option>
                  <option value="Express">Express</option>
                  <option value="Same Day">Same Day</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Store Location</label>
                <input
                  type="text"
                  name="store_location"
                  value={formData.store_location}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Salesperson</label>
                <input
                  type="text"
                  name="employee_name"
                  value={formData.employee_name}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>
          
          {/* Grand Total */}
          <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Grand Total</h3>
                <p className="text-sm text-slate-600">Total amount for all items</p>
              </div>
              <div className="text-3xl font-bold text-slate-900">₹{calculateGrandTotal().toFixed(2)}</div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border-2 border-gray-200 text-slate-900 rounded-xl font-semibold hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-all shadow-md hover:shadow-lg"
            >
              Create Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvoiceModal;