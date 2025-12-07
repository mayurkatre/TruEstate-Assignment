import { Link, useLocation } from 'react-router';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function Layout({ children, title }) {
  const location = useLocation();
  const [servicesOpen, setServicesOpen] = useState(false);

  // Helper for active highlighting
  const isActive = (path) => location.pathname === path;

  // Sidebar sections from screenshot
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-screen overflow-y-auto shadow-lg z-50">
        <div className="flex flex-col h-full">
          {/* Vault app title & user */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-slate-900 flex items-center justify-center text-xl shadow-md">
              <span className="font-bold text-white">V</span>
            </div>
            <div>
              <div className="font-bold text-lg text-slate-900 mb-0.5 leading-none">Vault</div>
              <div className="text-xs text-slate-500 leading-none">Mayur Katre</div>
            </div>
          </div>

          {/* Menu */}
          <nav className="flex-1 overflow-y-auto pt-3 pb-4">
            {/* Main navigation */}
            <ul className="mb-3 px-2">
              <li>
                <Link to="/" className={`flex items-center gap-2 py-2 px-4 rounded-lg text-sm ${isActive('/') ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-700 hover:bg-slate-100'}`}>Dashboard</Link>
              </li>
              <li>
                <a className="flex items-center gap-2 py-2 px-4 rounded-lg text-sm text-slate-700 hover:bg-slate-100 cursor-pointer">Nexus</a>
              </li>
              <li>
                <a className="flex items-center gap-2 py-2 px-4 rounded-lg text-sm text-slate-700 hover:bg-slate-100 cursor-pointer">Intake</a>
              </li>
            </ul>

            {/* Services with dropdown */}
            <div className="mb-3">
              <div 
                className="flex items-center justify-between text-xs font-semibold text-slate-400 px-6 py-2 tracking-wider uppercase cursor-pointer hover:bg-slate-50"
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </div>
              {servicesOpen && (
                <ul className="pl-2">
                  <li>
                    <div className="flex flex-col gap-1 ml-2">
                      <a className="flex items-center gap-2 py-2 px-4 text-slate-700 text-sm hover:bg-slate-100 rounded-lg cursor-pointer">Pre-active</a>
                      <a className="flex items-center gap-2 py-2 px-4 text-slate-700 text-sm hover:bg-slate-100 rounded-lg cursor-pointer">Active</a>
                      <a className="flex items-center gap-2 py-2 px-4 text-slate-700 text-sm hover:bg-slate-100 rounded-lg cursor-pointer">Blocked</a>
                      <a className="flex items-center gap-2 py-2 px-4 text-slate-700 text-sm hover:bg-slate-100 rounded-lg cursor-pointer">Closed</a>
                    </div>
                  </li>
                </ul>
              )}
            </div>

            {/* Invoices section */}
            <div>
              <div className="text-xs font-semibold text-slate-400 px-6 py-2 tracking-wider uppercase">Invoices</div>
              <ul className="pl-2">
                <li>
                  <Link to="/invoices" className={`flex items-center gap-2 py-2 px-4 text-sm rounded-lg ${isActive('/invoices') ? 'font-bold bg-slate-200 text-slate-900' : 'font-bold text-slate-900 hover:bg-slate-100'}`}>Proforma Invoices</Link>
                </li>
                <li>
                  <a className="flex items-center gap-2 py-2 px-4 text-sm text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer">Final Invoices</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content, moved for sidebar */}
      <main className="flex-1 ml-64 min-h-screen flex flex-col">
        {/* Topbar */}
        <header className="bg-white px-8 py-5 shadow-sm sticky top-0 z-40 flex items-center justify-between flex-shrink-0 border-b border-gray-100">
          <div className="text-xl font-semibold text-slate-900 tracking-tight">{title}</div>
          <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border focus-within:border-blue-500 focus-within:bg-white transition-all min-w-[320px]">
            <input
              type="text"
              placeholder="Name, Phone no."
              className="bg-transparent border-none outline-none flex-1 text-sm text-slate-900 placeholder-gray-400"
            />
          </div>
        </header>
        <div className="p-8 overflow-auto">{children}</div>
      </main>
    </div>
  );
}