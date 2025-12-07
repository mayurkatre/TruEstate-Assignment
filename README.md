# TruEstate R.S.M.S. - Sales Management System

A comprehensive sales management system built with modern web technologies.

## Project Structure

```
root/
├── backend/
│   ├── dataset/
│   │   └── migrations data
│   │
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── routes/
│   │   ├── models/
│   │   └── index.js
│   │
│   ├── schema.sql
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── css/styles.css
│   │   ├── js/app.js
│   │   ├── js/api.js
│   │   ├── js/ui.js
│   │   ├── js/utils.js
│   │   └── assets/
│   ├── package.json
│   └── README.md
│
├── docs/
│   └── architecture.md
│
└── README.md
```

## Components

### Backend
The backend is built with Node.js and uses Hono for routing. It connects to a database to manage sales data.

### Frontend
The frontend is built with React and uses Vite for development and build processes.

## Setup

1. Navigate to the backend directory and install dependencies:
   ```
   cd backend
   npm install
   ```

2. Navigate to the frontend directory and install dependencies:
   ```
   cd ../frontend
   npm install
   ```

3. Start the development servers:
   ```
   # In backend directory
   npm run dev
   
   # In frontend directory
   npm start
   ```

## Documentation

See the `docs/` directory for detailed architecture and design documents.