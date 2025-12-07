import z from "zod";

export const SaleSchema = z.object({
  id: z.number(),
  transaction_id: z.string(),
  date: z.string(),
  customer_id: z.string(),
  customer_name: z.string(),
  phone_number: z.string().nullable(),
  gender: z.string().nullable(),
  age: z.number().nullable(),
  customer_region: z.string().nullable(),
  customer_type: z.string().nullable(),
  product_id: z.string().nullable(),
  product_name: z.string().nullable(),
  brand: z.string().nullable(),
  category: z.string().nullable(),
  subcategory: z.string().nullable(),
  quantity: z.number().nullable(),
  price_per_unit: z.number().nullable(),
  discount_percentage: z.number().nullable(),
  total_amount: z.number().nullable(),
  final_amount: z.number().nullable(),
  payment_method: z.string().nullable(),
  order_status: z.string().nullable(),
  delivery_type: z.string().nullable(),
  store_id: z.string().nullable(),
  store_location: z.string().nullable(),
  salesperson_id: z.string().nullable(),
  employee_name: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Sale = z.infer<typeof SaleSchema>;

export const SalesQuerySchema = z.object({
  q: z.string().optional(),
  regions: z.string().optional(),
  genders: z.string().optional(),
  ageMin: z.coerce.number().optional(),
  ageMax: z.coerce.number().optional(),
  categories: z.string().optional(),
  tags: z.string().optional(),
  paymentMethods: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  sortBy: z.enum(['date', 'quantity', 'customer_name']).optional(),
  sortDir: z.enum(['asc', 'desc']).optional(),
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(50).default(10),
});

export type SalesQuery = z.infer<typeof SalesQuerySchema>;

export interface SalesResponse {
  total: number;
  page: number;
  pageSize: number;
  items: Sale[];
}
