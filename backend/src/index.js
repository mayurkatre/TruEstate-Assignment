import { Hono } from "hono";
import { cors } from "hono/cors";
import { getAllSales, getSalesSummary, getFilterValues, createSale, createCustomer, getAllProducts, createProduct } from "./services/databaseService.js";

const app = new Hono();

app.use("*", cors());

app.get("/api/sales", async (c) => {
  try {
    // Get query parameters
    const query = c.req.query();
    
    // Fetch sales data with filters
    const sales = getAllSales(query);
    
    // Implement pagination
    const page = parseInt(query.page) || 1;
    const pageSize = parseInt(query.pageSize) || 10;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    
    const paginatedSales = sales.slice(startIndex, endIndex);
    
    const response = {
      total: sales.length,
      page,
      pageSize,
      items: paginatedSales
    };
    
    return c.json(response);
  } catch (error) {
    console.error("Error fetching sales:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get summary statistics
app.get("/api/sales/summary", async (c) => {
  try {
    const summary = getSalesSummary();
    return c.json(summary);
  } catch (error) {
    console.error("Error fetching summary:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get unique filter values
app.get("/api/sales/filters", async (c) => {
  try {
    const filters = getFilterValues();
    return c.json(filters);
  } catch (error) {
    console.error("Error fetching filters:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Create a new sale/invoice
app.post("/api/sales", async (c) => {
  try {
    const saleData = await c.req.json();
    const newSale = createSale(saleData);
    return c.json(newSale, 201);
  } catch (error) {
    console.error("Error creating sale:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Create a new customer
app.post("/api/customers", async (c) => {
  try {
    const customerData = await c.req.json();
    const newCustomer = createCustomer(customerData);
    return c.json(newCustomer, 201);
  } catch (error) {
    console.error("Error creating customer:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get all products
app.get("/api/products", async (c) => {
  try {
    const products = getAllProducts();
    return c.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Create a new product
app.post("/api/products", async (c) => {
  try {
    const productData = await c.req.json();
    const newProduct = createProduct(productData);
    return c.json(newProduct, 201);
  } catch (error) {
    console.error("Error creating product:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

export default app;