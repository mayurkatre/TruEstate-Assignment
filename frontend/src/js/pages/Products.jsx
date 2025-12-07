import { useState, useEffect } from 'react';
import Layout from "../components/Layout.jsx";
import { Package, Plus, TrendingUp, TrendingDown } from 'lucide-react';
import { fetchProducts, createProduct } from '../api.js';

export default function Products() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [products, setProducts] = useState([
    { id: 'P001', name: 'Electronics - Smartphone', category: 'Electronics', stock: 145, price: 25000, sales: 89, trend: 'up' },
    { id: 'P002', name: 'Clothing - T-Shirt', category: 'Clothing', stock: 423, price: 800, sales: 234, trend: 'up' },
    { id: 'P003', name: 'Home Appliances - Mixer', category: 'Home Appliances', stock: 67, price: 3500, sales: 45, trend: 'down' },
    { id: 'P004', name: 'Books - Novel', category: 'Books', stock: 298, price: 450, sales: 156, trend: 'up' },
  ]);
  
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    brand: '',
    price: 0,
    stock: 0,
    subcategory: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value
    }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      // Create the product in the backend
      const createdProduct = await createProduct(newProduct);
      
      // Add to local state
      const product = {
        id: createdProduct.id, 
        name: `${createdProduct.brand} - ${createdProduct.name}`, 
        category: createdProduct.category, 
        stock: createdProduct.stock, 
        price: createdProduct.price, 
        sales: 0, 
        trend: 'up'
      };
      
      setProducts(prev => [product, ...prev]);
      setShowAddForm(false);
      setNewProduct({ name: '', category: '', brand: '', price: 0, stock: 0, subcategory: '' });
      
      // Show success message
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
    }
  };

  return (
    <Layout title="Products">
      <div className="flex items-center justify-between mb-8">
        <p className="text-gray-600">Manage product catalog and inventory</p>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>
      
      {/* Add Product Form */}
      {showAddForm && (
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-gray-100">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Add New Product</h3>
          <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Product Name *</label>
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Brand</label>
              <input
                type="text"
                name="brand"
                value={newProduct.brand}
                onChange={handleInputChange}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Category *</label>
              <input
                type="text"
                name="category"
                value={newProduct.category}
                onChange={handleInputChange}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Subcategory</label>
              <input
                type="text"
                name="subcategory"
                value={newProduct.subcategory}
                onChange={handleInputChange}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Price (₹) *</label>
              <input
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Stock *</label>
              <input
                type="number"
                name="stock"
                value={newProduct.stock}
                onChange={handleInputChange}
                min="0"
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                required
              />
            </div>
            <div className="flex items-center gap-4 md:col-span-2 mt-4">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-all shadow-md hover:shadow-lg"
              >
                Add Product
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
          <div className="text-sm font-semibold uppercase text-gray-500 tracking-wide mb-2">Total Products</div>
          <div className="text-3xl font-bold text-slate-900">{products.length}</div>
        </div>

        <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-md border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-400"></div>
          <div className="text-sm font-semibold uppercase text-gray-500 tracking-wide mb-2">In Stock</div>
          <div className="text-3xl font-bold text-slate-900">933</div>
        </div>

        <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-md border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-yellow-400"></div>
          <div className="text-sm font-semibold uppercase text-gray-500 tracking-wide mb-2">Low Stock</div>
          <div className="text-3xl font-bold text-slate-900">8</div>
        </div>

        <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-md border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-pink-400"></div>
          <div className="text-sm font-semibold uppercase text-gray-500 tracking-wide mb-2">Out of Stock</div>
          <div className="text-3xl font-bold text-slate-900">3</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max">
            <thead className="bg-gradient-to-r from-gray-50 to-white border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider whitespace-nowrap">Product ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider whitespace-nowrap">Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider whitespace-nowrap">Category</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider whitespace-nowrap">Stock</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider whitespace-nowrap">Price</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider whitespace-nowrap">Sales</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider whitespace-nowrap">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900 whitespace-nowrap">{product.id}</td>
                  <td className="px-6 py-4 text-sm text-slate-900 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Package className="w-5 h-5 text-blue-600" />
                      </div>
                      {product.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-900 whitespace-nowrap">{product.category}</td>
                  <td className="px-6 py-4 text-sm text-slate-900 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                      product.stock > 100 ? 'bg-green-100 text-green-800' :
                      product.stock > 50 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {product.stock} units
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-900 whitespace-nowrap">₹{product.price.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-slate-900 whitespace-nowrap">{product.sales}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.trend === 'up' ? (
                      <TrendingUp className="w-5 h-5 text-green-500" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-red-500" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
