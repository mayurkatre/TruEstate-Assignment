// backend/src/server.js
import dotenv from 'dotenv';

// Load environment variables first
dotenv.config();

import { serve } from '@hono/node-server';
import app from './index.js';

const port = process.env.PORT || 3001;

console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port
});