import { useState, useEffect } from 'react';
import Layout from "../components/Layout.jsx";
import { Loader2 } from 'lucide-react';
import { fetchSales, fetchSalesSummary, fetchFilterValues } from '../api.js';

export default function Dashboard() {
  // State for sales data and summary
  const [sales, setSales] = useState([]);
  const [summary, setSummary] = useState({ totalUnits: 0, totalAmount: 0, totalDiscount: 0 });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 10;

  // State for filter values
  const [filterOptions, setFilterOptions] = useState({
    regions: [],
    categories: [],
    paymentMethods: [],
  });

  // State for filters
  const [filters, setFilters] = useState({
    q: '', // Search term for name and phone
    region: '',
    gender: '',
    ageRange: '',
    category: '',
    tags: '',
    paymentMethod: '',
    date: '',
    sortBy: 'customer_name_asc',
  });

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchFilterValues();
        setFilterOptions(data);
      } catch {}
    })();
  }, []);

  useEffect(() => {
    loadSummary();
    loadSales();
  }, [filters, page]);

  const loadSummary = async () => {
    try {
      const data = await fetchSalesSummary();
      setSummary(data);
    } catch {}
  };

  const loadSales = async () => {
    setLoading(true);
    try {
      // Convert ageRange to min/max ages
      let ageMin, ageMax;
      switch (filters.ageRange) {
        case '18-25':
          ageMin = 18;
          ageMax = 25;
          break;
        case '26-35':
          ageMin = 26;
          ageMax = 35;
          break;
        case '36-50':
          ageMin = 36;
          ageMax = 50;
          break;
        case '51+':
          ageMin = 51;
          ageMax = 100;
          break;
        default:
          ageMin = undefined;
          ageMax = undefined;
      }

      const params = {
        q: filters.q,
        region: filters.region,
        gender: filters.gender,
        ageMin,
        ageMax,
        category: filters.category,
        tags: filters.tags,
        paymentMethod: filters.paymentMethod,
        date: filters.date,
        sortBy: filters.sortBy.includes('_asc') ? filters.sortBy.replace('_asc', '') : filters.sortBy.replace('_desc', ''),
        sortDir: filters.sortBy.includes('_asc') ? 'asc' : 'desc',
        page,
        pageSize
      };
      
      // Remove undefined values
      Object.keys(params).forEach(key => {
        if (params[key] === undefined) {
          delete params[key];
        }
      });

      const data = await fetchSales(params);
      setSales(data.items);
      setTotal(data.total);
    } catch {} finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(total / pageSize);

  // --- UI render ---
  return (
    <Layout title="Sales Management System">
      {/* Filter bar */}
      <div className="flex flex-wrap gap-3 items-center mb-6 bg-white py-4 px-5 rounded-xl border border-gray-200 shadow-sm">
        <input 
          type="text" 
          className="px-3 py-1 border rounded text-sm" 
          placeholder="Search by name or phone" 
          value={filters.q} 
          onChange={e => setFilters(f => ({ ...f, q: e.target.value }))}
        />
        <select className="px-3 py-1 border rounded text-sm" value={filters.region} onChange={e => setFilters(f => ({ ...f, region: e.target.value }))}>
          <option value="">Customer Region</option>
          {filterOptions.regions.map(v => <option key={v} value={v}>{v}</option>)}
        </select>
        <select className="px-3 py-1 border rounded text-sm" value={filters.gender} onChange={e => setFilters(f => ({ ...f, gender: e.target.value }))}>
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <select className="px-3 py-1 border rounded text-sm" value={filters.ageRange} onChange={e => setFilters(f => ({ ...f, ageRange: e.target.value }))}>
          <option value="">Age Range</option>
          <option value="18-25">18-25</option>
          <option value="26-35">26-35</option>
          <option value="36-50">36-50</option>
          <option value="51+">51+</option>
        </select>
        <select className="px-3 py-1 border rounded text-sm" value={filters.category} onChange={e => setFilters(f => ({ ...f, category: e.target.value }))}>
          <option value="">Product Category</option>
          {filterOptions.categories.map(v => <option key={v} value={v}>{v}</option>)}
        </select>
        <input type="text" className="px-3 py-1 border rounded text-sm" placeholder="Tags" value={filters.tags} onChange={e => setFilters(f => ({ ...f, tags: e.target.value }))} />
        <select className="px-3 py-1 border rounded text-sm" value={filters.paymentMethod} onChange={e => setFilters(f => ({ ...f, paymentMethod: e.target.value }))}>
          <option value="">Payment Method</option>
          {filterOptions.paymentMethods.map(v => <option key={v} value={v}>{v}</option>)}
        </select>
        <input type="date" className="px-3 py-1 border rounded text-sm" value={filters.date} onChange={e => setFilters(f => ({ ...f, date: e.target.value }))} />
        <div className="ml-auto">
          <select className="px-3 py-1 border rounded text-sm" value={filters.sortBy} onChange={e => setFilters(f => ({ ...f, sortBy: e.target.value }))}>
            <option value="customer_name_asc">Sort by: Customer Name (A-Z)</option>
            <option value="customer_name_desc">Sort by: Customer Name (Z-A)</option>
            <option value="date_asc">Sort by: Oldest</option>
            <option value="date_desc">Sort by: Newest</option>
          </select>
        </div>
      </div>

      {/* Stat cards */}
      <div className="w-full bg-black rounded-2xl py-5 px-7 flex flex-wrap gap-5 items-center mb-6">
        <div className="bg-black rounded-lg border border-gray-700 p-4 flex-1 min-w-[200px] max-w-[300px]">
          <div className="text-white/60 text-xs mb-1">Total units sold</div>
          <div className="text-2xl sm:text-3xl font-bold text-white">{summary.totalUnits ?? 0}</div>
        </div>
        <div className="bg-black rounded-lg border border-gray-700 p-4 flex-1 min-w-[200px] max-w-[300px]">
          <div className="text-white/60 text-xs mb-1">Total Amount</div>
          <div className="text-2xl sm:text-3xl font-bold text-white">₹{summary.totalAmount?.toLocaleString() ?? 0} <span className="text-xs text-white/60 font-normal align-middle" style={{letterSpacing:'-0.1em'}}>&nbsp;({summary.totalUnits ?? 0} SRs)</span></div>
        </div>
        <div className="bg-black rounded-lg border border-gray-700 p-4 flex-1 min-w-[200px] max-w-[300px]">
          <div className="text-white/60 text-xs mb-1">Total Discount</div>
          <div className="text-2xl sm:text-3xl font-bold text-white">₹{summary.totalDiscount?.toLocaleString() ?? 0} <span className="text-xs text-white/60 font-normal align-middle" style={{letterSpacing:'-0.1em'}}>&nbsp;(45 SRs)</span></div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20"><Loader2 className="w-12 h-12 text-blue-500 animate-spin" /></div>
        ) : (
          <>
            {/* Make inner div horizontally scrollable */}
            <div className="overflow-x-auto w-full">
              <table className="w-full min-w-[1200px]">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-sm font-semibold text-slate-500">Transaction ID</th>
                    <th className="px-4 py-3 text-sm font-semibold text-slate-500">Date</th>
                    <th className="px-4 py-3 text-sm font-semibold text-slate-500">Customer ID</th>
                    <th className="px-4 py-3 text-sm font-semibold text-slate-500">Customer name</th>
                    <th className="px-4 py-3 text-sm font-semibold text-slate-500">Phone Number</th>
                    <th className="px-4 py-3 text-sm font-semibold text-slate-500">Gender</th>
                    <th className="px-4 py-3 text-sm font-semibold text-slate-500">Age</th>
                    <th className="px-4 py-3 text-sm font-semibold text-slate-500">Product Category</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-slate-500">Quantity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sales.map((sale, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-slate-800">{sale.transaction_id}</td>
                      <td className="px-4 py-3 text-sm text-slate-800">{sale.date}</td>
                      <td className="px-4 py-3 text-sm text-slate-800">{sale.customer_id}</td>
                      <td className="px-4 py-3 text-sm text-slate-800">{sale.customer_name}</td>
                      <td className="px-4 py-3 text-sm text-slate-800">{sale.phone_number}</td>
                      <td className="px-4 py-3 text-sm text-slate-800">{sale.gender}</td>
                      <td className="px-4 py-3 text-sm text-slate-800">{sale.age}</td>
                      <td className="px-4 py-3 text-sm font-bold text-slate-900">{sale.category}</td>
                      <td className="px-4 py-3 text-right text-sm font-bold text-slate-900">{sale.quantity?.toString().padStart(2, '0')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="flex items-center justify-center py-6 gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                <button key={pg} onClick={() => setPage(pg)} className={`h-9 w-9 mx-1 rounded border text-base font-medium transition-all ${page === pg ? 'bg-slate-900 text-white border-slate-800 shadow' : 'bg-white text-slate-900 border-slate-200 hover:bg-slate-100 hover:border-blue-400'}`}>{pg}</button>
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}