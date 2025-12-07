import { BrowserRouter as Router, Routes, Route } from "react-router";
import "../css/styles.css";
import Dashboard from "./pages/Dashboard.jsx";
import Invoices from "./pages/Invoices.jsx";
import Customers from "./pages/Customers.jsx";
import Products from "./pages/Products.jsx";
import Reports from "./pages/Reports.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/products" element={<Products />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Router>
  );
}
