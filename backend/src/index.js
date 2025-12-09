import { Hono } from "hono";
import { cors } from "hono/cors";
import { getAllSales, getSalesSummary, getFilterValues, createSale, createCustomer, getAllProducts, createProduct, initDatabase } from "./services/databaseService.js";

// Initialize the app
const app = new Hono();

// Initialize database connection
initDatabase().catch(error => {
  console.error('Failed to initialize database:', error.message);
});

// Enable CORS
app.use("*", cors());

// Get all sales with filtering, sorting, and pagination
app.get("/api/sales", async (c) => {
  try {
    // Get query parameters
    const query = c.req.query();
    
    // Fetch sales data with filters
    const result = await getAllSales(query);
    
    return c.json(result);
  } catch (error) {
    console.error("Error fetching sales:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get summary statistics
app.get("/api/sales/summary", async (c) => {
  try {
    const summary = await getSalesSummary();
    return c.json(summary);
  } catch (error) {
    console.error("Error fetching summary:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get unique filter values
app.get("/api/sales/filters", async (c) => {
  try {
    const filters = await getFilterValues();
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
    const newSale = await createSale(saleData);
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
    const newCustomer = await createCustomer(customerData);
    return c.json(newCustomer, 201);
  } catch (error) {
    console.error("Error creating customer:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get all products
app.get("/api/products", async (c) => {
  try {
    const products = await getAllProducts();
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
    const newProduct = await createProduct(productData);
    return c.json(newProduct, 201);
  } catch (error) {
    console.error("Error creating product:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

export default app;