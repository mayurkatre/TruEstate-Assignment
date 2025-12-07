import Layout from "../components/Layout.jsx";
import { BarChart3, TrendingUp, DollarSign, Users } from 'lucide-react';

export default function Reports() {
  return (
    <Layout title="Reports & Analytics">
      <p className="text-gray-600 mb-8">View comprehensive sales and performance analytics</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-md border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold uppercase text-gray-500 tracking-wide">Revenue Growth</div>
            <TrendingUp className="w-6 h-6 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-2">+24.5%</div>
          <div className="text-sm text-gray-500">Compared to last month</div>
        </div>

        <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-md border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-400"></div>
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold uppercase text-gray-500 tracking-wide">Total Revenue</div>
            <DollarSign className="w-6 h-6 text-blue-500" />
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-2">₹8.54L</div>
          <div className="text-sm text-gray-500">This month</div>
        </div>

        <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-md border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-400"></div>
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold uppercase text-gray-500 tracking-wide">Active Customers</div>
            <Users className="w-6 h-6 text-purple-500" />
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-2">1,247</div>
          <div className="text-sm text-gray-500">Last 30 days</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-6 h-6 text-blue-500" />
            <h3 className="text-xl font-bold text-slate-900">Sales by Region</h3>
          </div>
          <div className="space-y-4">
            {[
              { region: 'North', sales: 245000, percentage: 35 },
              { region: 'South', sales: 198000, percentage: 28 },
              { region: 'East', sales: 156000, percentage: 22 },
              { region: 'West', sales: 105000, percentage: 15 },
            ].map((item) => (
              <div key={item.region}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-900">{item.region}</span>
                  <span className="text-sm text-gray-500">₹{item.sales.toLocaleString()} ({item.percentage}%)</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-6 h-6 text-green-500" />
            <h3 className="text-xl font-bold text-slate-900">Top Product Categories</h3>
          </div>
          <div className="space-y-4">
            {[
              { category: 'Electronics', sales: 312000, percentage: 42 },
              { category: 'Clothing', sales: 234000, percentage: 32 },
              { category: 'Home Appliances', sales: 156000, percentage: 21 },
              { category: 'Books', sales: 42000, percentage: 5 },
            ].map((item) => (
              <div key={item.category}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-900">{item.category}</span>
                  <span className="text-sm text-gray-500">₹{item.sales.toLocaleString()} ({item.percentage}%)</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
