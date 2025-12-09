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

  // State for filters (using arrays for multi-select)
  const [filters, setFilters] = useState({
    q: '', // Search term for name and phone
    regions: [],
    genders: [],
    ageRange: '',
    categories: [],
    tags: '',
    paymentMethods: [],
    dateFrom: '',
    dateTo: '',
    sortBy: 'customer_name_asc',
  });

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchFilterValues();
        setFilterOptions(data);
      } catch (error) {
        console.error("Error fetching filter values:", error);
      }
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
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
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
        regions: filters.regions.join(','),
        genders: filters.genders.join(','),
        ageMin,
        ageMax,
        categories: filters.categories.join(','),
        tags: filters.tags,
        paymentMethods: filters.paymentMethods.join(','),
        dateFrom: filters.dateFrom,
        dateTo: filters.dateTo,
        sortBy: filters.sortBy.includes('_asc') ? filters.sortBy.replace('_asc', '') : filters.sortBy.replace('_desc', ''),
        sortDir: filters.sortBy.includes('_asc') ? 'asc' : 'desc',
        page,
        pageSize
      };

      // Remove undefined values
      Object.keys(params).forEach(key => {
        if (params[key] === undefined || params[key] === '') {
          delete params[key];
        }
      });

      const data = await fetchSales(params);
      setSales(data.items);
      setTotal(data.total);
    } catch (error) {
      console.error("Error fetching sales:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(total / pageSize);

  // Handler for multi-select changes
  const handleMultiSelectChange = (filterName, value, checked) => {
    setFilters(prev => {
      const currentValues = [...prev[filterName]];
      if (checked) {
        // Add value if not already present
        if (!currentValues.includes(value)) {
          return { ...prev, [filterName]: [...currentValues, value] };
        }
      } else {
        // Remove value
        return { ...prev, [filterName]: currentValues.filter(item => item !== value) };
      }
      return prev;
    });
  };

  // Handler for select all in multi-select
  const handleSelectAll = (filterName, allValues) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: prev[filterName].length === allValues.length ? [] : [...allValues]
    }));
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      q: '',
      regions: [],
      genders: [],
      ageRange: '',
      categories: [],
      tags: '',
      paymentMethods: [],
      dateFrom: '',
      dateTo: '',
      sortBy: 'customer_name_asc',
    });
    setPage(1);
  };

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
        
        {/* Multi-select for regions */}
        <div className="relative">
          <details className="dropdown">
            <summary className="px-3 py-1 border rounded text-sm cursor-pointer flex items-center">
              Regions {filters.regions.length > 0 && `(${filters.regions.length})`}
            </summary>
            <div className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 absolute z-10 mt-1 max-h-60 overflow-y-auto">
              <div className="form-control">
                <label className="cursor-pointer label">
                  <span className="label-text">Select All</span>
                  <input 
                    type="checkbox" 
                    className="checkbox checkbox-primary" 
                    checked={filters.regions.length === filterOptions.regions.length && filterOptions.regions.length > 0}
                    onChange={() => handleSelectAll('regions', filterOptions.regions)}
                  />
                </label>
              </div>
              {filterOptions.regions.map(region => (
                <div className="form-control" key={region}>
                  <label className="cursor-pointer label">
                    <span className="label-text">{region}</span>
                    <input 
                      type="checkbox" 
                      className="checkbox checkbox-primary" 
                      checked={filters.regions.includes(region)}
                      onChange={(e) => handleMultiSelectChange('regions', region, e.target.checked)}
                    />
                  </label>
                </div>
              ))}
            </div>
          </details>
        </div>
        
        {/* Multi-select for genders */}
        <div className="relative">
          <details className="dropdown">
            <summary className="px-3 py-1 border rounded text-sm cursor-pointer flex items-center">
              Gender {filters.genders.length > 0 && `(${filters.genders.length})`}
            </summary>
            <div className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 absolute z-10 mt-1">
              <div className="form-control">
                <label className="cursor-pointer label">
                  <span className="label-text">Select All</span>
                  <input 
                    type="checkbox" 
                    className="checkbox checkbox-primary" 
                    checked={filters.genders.length === 2}
                    onChange={() => handleSelectAll('genders', ['Male', 'Female'])}
                  />
                </label>
              </div>
              {['Male', 'Female'].map(gender => (
                <div className="form-control" key={gender}>
                  <label className="cursor-pointer label">
                    <span className="label-text">{gender}</span>
                    <input 
                      type="checkbox" 
                      className="checkbox checkbox-primary" 
                      checked={filters.genders.includes(gender)}
                      onChange={(e) => handleMultiSelectChange('genders', gender, e.target.checked)}
                    />
                  </label>
                </div>
              ))}
            </div>
          </details>
        </div>
        
        <select className="px-3 py-1 border rounded text-sm" value={filters.ageRange} onChange={e => setFilters(f => ({ ...f, ageRange: e.target.value }))}>
          <option value="">Age Range</option>
          <option value="18-25">18-25</option>
          <option value="26-35">26-35</option>
          <option value="36-50">36-50</option>
          <option value="51+">51+</option>
        </select>
        
        {/* Multi-select for categories */}
        <div className="relative">
          <details className="dropdown">
            <summary className="px-3 py-1 border rounded text-sm cursor-pointer flex items-center">
              Categories {filters.categories.length > 0 && `(${filters.categories.length})`}
            </summary>
            <div className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 absolute z-10 mt-1 max-h-60 overflow-y-auto">
              <div className="form-control">
                <label className="cursor-pointer label">
                  <span className="label-text">Select All</span>
                  <input 
                    type="checkbox" 
                    className="checkbox checkbox-primary" 
                    checked={filters.categories.length === filterOptions.categories.length && filterOptions.categories.length > 0}
                    onChange={() => handleSelectAll('categories', filterOptions.categories)}
                  />
                </label>
              </div>
              {filterOptions.categories.map(category => (
                <div className="form-control" key={category}>
                  <label className="cursor-pointer label">
                    <span className="label-text">{category}</span>
                    <input 
                      type="checkbox" 
                      className="checkbox checkbox-primary" 
                      checked={filters.categories.includes(category)}
                      onChange={(e) => handleMultiSelectChange('categories', category, e.target.checked)}
                    />
                  </label>
                </div>
              ))}
            </div>
          </details>
        </div>
        
        <input type="text" className="px-3 py-1 border rounded text-sm" placeholder="Tags" value={filters.tags} onChange={e => setFilters(f => ({ ...f, tags: e.target.value }))} />
        
        {/* Multi-select for payment methods */}
        <div className="relative">
          <details className="dropdown">
            <summary className="px-3 py-1 border rounded text-sm cursor-pointer flex items-center">
              Payment Methods {filters.paymentMethods.length > 0 && `(${filters.paymentMethods.length})`}
            </summary>
            <div className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 absolute z-10 mt-1 max-h-60 overflow-y-auto">
              <div className="form-control">
                <label className="cursor-pointer label">
                  <span className="label-text">Select All</span>
                  <input 
                    type="checkbox" 
                    className="checkbox checkbox-primary" 
                    checked={filters.paymentMethods.length === filterOptions.paymentMethods.length && filterOptions.paymentMethods.length > 0}
                    onChange={() => handleSelectAll('paymentMethods', filterOptions.paymentMethods)}
                  />
                </label>
              </div>
              {filterOptions.paymentMethods.map(method => (
                <div className="form-control" key={method}>
                  <label className="cursor-pointer label">
                    <span className="label-text">{method}</span>
                    <input 
                      type="checkbox" 
                      className="checkbox checkbox-primary" 
                      checked={filters.paymentMethods.includes(method)}
                      onChange={(e) => handleMultiSelectChange('paymentMethods', method, e.target.checked)}
                    />
                  </label>
                </div>
              ))}
            </div>
          </details>
        </div>
        
        <div className="flex gap-2">
          <input 
            type="date" 
            className="px-3 py-1 border rounded text-sm" 
            placeholder="From" 
            value={filters.dateFrom} 
            onChange={e => setFilters(f => ({ ...f, dateFrom: e.target.value }))}
          />
          <input 
            type="date" 
            className="px-3 py-1 border rounded text-sm" 
            placeholder="To" 
            value={filters.dateTo} 
            onChange={e => setFilters(f => ({ ...f, dateTo: e.target.value }))}
          />
        </div>
        
        <div className="ml-auto flex gap-2">
          <button 
            className="px-3 py-1 border rounded text-sm bg-gray-100 hover:bg-gray-200"
            onClick={resetFilters}
          >
            Reset
          </button>
          <select className="px-3 py-1 border rounded text-sm" value={filters.sortBy} onChange={e => setFilters(f => ({ ...f, sortBy: e.target.value }))}>
            <option value="customer_name_asc">Sort by: Customer Name (A-Z)</option>
            <option value="customer_name_desc">Sort by: Customer Name (Z-A)</option>
            <option value="date_asc">Sort by: Oldest</option>
            <option value="date_desc">Sort by: Newest</option>
            <option value="final_amount_desc">Sort by: Amount (High-Low)</option>
            <option value="final_amount_asc">Sort by: Amount (Low-High)</option>
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
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
            <p className="mt-4 text-gray-500">Loading sales data...</p>
          </div>
        ) : (
          <>
            {sales.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="text-gray-400 text-lg mb-2">No sales data found</div>
                <button 
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={resetFilters}
                >
                  Reset Filters
                </button>
              </div>
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
                        <tr key={sale.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-slate-800">{sale.transaction_id}</td>
                          <td className="px-4 py-3 text-sm text-slate-800">{sale.date}</td>
                          <td className="px-4 py-3 text-sm text-slate-800">{sale.customer_id}</td>
                          <td className="px-4 py-3 text-sm text-slate-800">{sale.customer_name}</td>
                          <td className="px-4 py-3 text-sm text-slate-800">{sale.phone_number}</td>
                          <td className="px-4 py-3 text-sm text-slate-800">{sale.gender}</td>
                          <td className="px-4 py-3 text-sm text-slate-800">{sale.age}</td>
                          <td className="px-4 py-3 text-sm font-bold text-slate-900">{sale.product_category}</td>
                          <td className="px-4 py-3 text-right text-sm font-bold text-slate-900">{sale.quantity?.toString().padStart(2, '0')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Pagination */}
                <div className="flex items-center justify-between py-4 px-6">
                  <div className="text-sm text-gray-500">
                    Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, total)} of {total} entries
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      className={`px-3 py-1 rounded border ${page === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                    >
                      Previous
                    </button>
                    
                    {/* Page numbers */}
                    {[...Array(Math.min(5, totalPages))].map((_, i) => {
                      const pageNum = Math.max(1, Math.min(page - 2, totalPages - 4)) + i;
                      if (pageNum <= totalPages) {
                        return (
                          <button 
                            key={pageNum}
                            className={`w-9 h-9 rounded border text-base font-medium transition-all ${
                              page === pageNum 
                                ? 'bg-slate-900 text-white border-slate-800 shadow' 
                                : 'bg-white text-slate-900 border-slate-200 hover:bg-slate-100 hover:border-blue-400'
                            }`}
                            onClick={() => setPage(pageNum)}
                          >
                            {pageNum}
                          </button>
                        );
                      }
                      return null;
                    })}
                    
                    <button 
                      className={`px-3 py-1 rounded border ${page === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}