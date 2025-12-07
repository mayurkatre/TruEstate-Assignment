import { useState } from 'react';
import Layout from "../components/Layout.jsx";
import { UserPlus, Mail, Phone, MapPin } from 'lucide-react';
import { createCustomer } from '../api.js';

export default function Customers() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [customers, setCustomers] = useState([
    { id: 'C001', name: 'John Doe', email: 'john@example.com', phone: '+91 98765 43210', region: 'North', totalPurchases: 125000 },
    { id: 'C002', name: 'Jane Smith', email: 'jane@example.com', phone: '+91 98765 43211', region: 'South', totalPurchases: 98000 },
    { id: 'C003', name: 'Bob Johnson', email: 'bob@example.com', phone: '+91 98765 43212', region: 'East', totalPurchases: 156000 },
    { id: 'C004', name: 'Alice Williams', email: 'alice@example.com', phone: '+91 98765 43213', region: 'West', totalPurchases: 89000 },
  ]);
  
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    region: '',
    type: 'New'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    try {
      // Create the customer in the backend
      const createdCustomer = await createCustomer(newCustomer);
      
      // Add to local state
      const customer = {
        id: createdCustomer.id, 
        name: createdCustomer.name, 
        email: createdCustomer.email, 
        phone: createdCustomer.phone, 
        region: createdCustomer.region, 
        totalPurchases: 0
      };
      
      setCustomers(prev => [customer, ...prev]);
      setShowAddForm(false);
      setNewCustomer({ name: '', email: '', phone: '', region: '', type: 'New' });
      
      // Show success message
      alert('Customer added successfully!');
    } catch (error) {
      console.error('Error adding customer:', error);
      alert('Failed to add customer. Please try again.');
    }
  };

  return (
    <Layout title="Customers">
      <div className="flex items-center justify-between mb-8">
        <p className="text-gray-600">Manage customer relationships and data</p>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg"
        >
          <UserPlus className="w-5 h-5" />
          Add Customer
        </button>
      </div>
      
      {/* Add Customer Form */}
      {showAddForm && (
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-gray-100">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Add New Customer</h3>
          <form onSubmit={handleAddCustomer} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Name *</label>
              <input
                type="text"
                name="name"
                value={newCustomer.name}
                onChange={handleInputChange}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={newCustomer.email}
                onChange={handleInputChange}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={newCustomer.phone}
                onChange={handleInputChange}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Region</label>
              <input
                type="text"
                name="region"
                value={newCustomer.region}
                onChange={handleInputChange}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
            <div className="flex items-center gap-4 md:col-span-2 mt-4">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-all shadow-md hover:shadow-lg"
              >
                Add Customer
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-6 py-3 border-2 border-gray-200 text-slate-900 rounded-xl font-semibold hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-md border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
          <div className="text-sm font-semibold uppercase text-gray-500 tracking-wide mb-2">Total Customers</div>
          <div className="text-3xl font-bold text-slate-900">{customers.length}</div>
        </div>

        <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-md border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-400"></div>
          <div className="text-sm font-semibold uppercase text-gray-500 tracking-wide mb-2">Active This Month</div>
          <div className="text-3xl font-bold text-slate-900">127</div>
        </div>

        <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-md border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-yellow-400"></div>
          <div className="text-sm font-semibold uppercase text-gray-500 tracking-wide mb-2">New This Week</div>
          <div className="text-3xl font-bold text-slate-900">12</div>
        </div>

        <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-md border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-400"></div>
          <div className="text-sm font-semibold uppercase text-gray-500 tracking-wide mb-2">Lifetime Value</div>
          <div className="text-3xl font-bold text-slate-900">₹468K</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max">
            <thead className="bg-gradient-to-r from-gray-50 to-white border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider whitespace-nowrap">Customer ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider whitespace-nowrap">Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider whitespace-nowrap">Email</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider whitespace-nowrap">Phone</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider whitespace-nowrap">Region</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider whitespace-nowrap">Total Purchases</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900 whitespace-nowrap">{customer.id}</td>
                  <td className="px-6 py-4 text-sm text-slate-900 whitespace-nowrap">{customer.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-900 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      {customer.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-900 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      {customer.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-900 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      {customer.region}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900 whitespace-nowrap">₹{customer.totalPurchases.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
