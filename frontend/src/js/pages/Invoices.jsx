import { useState } from 'react';
import Layout from "../components/Layout.jsx";
import { FileText, Plus, Download } from 'lucide-react';
import InvoiceModal from '../components/InvoiceModal.jsx';
import { createSale } from '../api.js';

export default function Invoices() {
  const [showModal, setShowModal] = useState(false);
  const [invoices, setInvoices] = useState([
    { id: 'INV-001', date: '2024-12-01', customer: 'John Doe', amount: 45000, status: 'Paid' },
    { id: 'INV-002', date: '2024-12-02', customer: 'Jane Smith', amount: 32000, status: 'Pending' },
    { id: 'INV-003', date: '2024-12-03', customer: 'Bob Johnson', amount: 28000, status: 'Paid' },
    { id: 'INV-004', date: '2024-12-04', customer: 'Alice Williams', amount: 51000, status: 'Overdue' },
  ]);

  const handleCreateInvoice = async (invoiceData) => {
    try {
      // Create the invoice in the backend
      const newInvoice = await createSale(invoiceData);
      
      // Add to local state
      const invoice = {
        id: `INV-${newInvoice.id}`, 
        date: newInvoice.date, 
        customer: newInvoice.customer_name, 
        amount: newInvoice.final_amount, 
        status: 'Paid'
      };
      
      setInvoices(prev => [invoice, ...prev]);
      setShowModal(false);
      
      // Show success message
      alert('Invoice created successfully!');
    } catch (error) {
      console.error('Error creating invoice:', error);
      alert('Failed to create invoice. Please try again.');
    }
  };

  const handleDownloadInvoice = (invoice) => {
    // Create a simple text representation of the invoice
    const invoiceText = `
Invoice Details
===============
Invoice ID: ${invoice.id}
Date: ${invoice.date}
Customer: ${invoice.customer}
Amount: ₹${invoice.amount.toLocaleString()}
Status: ${invoice.status}

Thank you for your business!
    `;
    
    // Create a blob and download it
    const blob = new Blob([invoiceText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${invoice.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Layout title="Invoices">
      <div className="flex items-center justify-between mb-8">
        <p className="text-gray-600">Manage and track all customer invoices</p>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          New Invoice
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max">
            <thead className="bg-gradient-to-r from-gray-50 to-white border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider whitespace-nowrap">Invoice ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider whitespace-nowrap">Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider whitespace-nowrap">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider whitespace-nowrap">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider whitespace-nowrap">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900 whitespace-nowrap">{invoice.id}</td>
                  <td className="px-6 py-4 text-sm text-slate-900 whitespace-nowrap">{invoice.date}</td>
                  <td className="px-6 py-4 text-sm text-slate-900 whitespace-nowrap">{invoice.customer}</td>
                  <td className="px-6 py-4 text-sm text-slate-900 whitespace-nowrap">₹{invoice.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                      invoice.status === 'Paid' ? 'bg-green-100 text-green-800' :
                      invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button 
                      onClick={() => handleDownloadInvoice(invoice)}
                      className="flex items-center gap-2 text-blue-500 hover:text-blue-600 font-semibold transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <InvoiceModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        onSubmit={handleCreateInvoice} 
      />
    </Layout>
  );
}
