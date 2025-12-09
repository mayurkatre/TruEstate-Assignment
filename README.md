# TruEstate R.S.M.S. — Sales Management System

A modern, full-stack Retail & Real Estate Sales Management System built with React (Vite) on the frontend and Node.js + Hono on the backend.
Designed to manage sales, customers, products, and analytics with powerful filtering, search, sorting, and pagination capabilities.

## 🚀 Live Deployment

Frontend + Backend Deployment (Render):
🔗 https://truestate-assignment-as17.onrender.com/

## 📘 Technical Documentation (HLD + LLD + Architecture)

All diagrams, LLD, HLD, and architecture docs are available here:
📂 https://drive.google.com/drive/folders/1_RXCbMdpIWdWZuif5CFXkmYoKWoWRfhu

## 📌 Important Note on Data & Production Readiness

This project currently uses sample CSV data only for demonstration purposes.

For real production-level deployment, the system fully supports:

✅ PostgreSQL Integration

CSV → PostgreSQL data migration

Using Node.js CSV parsing libraries:

- csv-parse
- pg (PostgreSQL client)

✅ Converting CSV to SQL

Automatically convert CSV dataset into SQL tables

Populate structured PostgreSQL database

Replace all in-memory operations with SQL queries

This ensures the system can scale for enterprise-grade sales operations.

## 📁 Project Structure

```
root/
├── backend/
│   ├── dataset/
│   │   └── truestate_assignment_dataset.csv (1 million records)
│   │
│   ├── migrations/
│   │   └── database migration scripts
│   │
│   ├── scripts/
│   │   ├── import-csv.js (CSV import utility)
│   │   └── setup-db.js (Database setup utility)
│   │
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   │   └── PostgreSQL database service
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

## 🧩 Components Overview

### Backend (Node.js + Hono + PostgreSQL)

Fast and lightweight REST API using Hono with PostgreSQL database integration

Handles:

- Sales operations with advanced filtering
- Multi-select filtering capabilities
- Sorting, pagination at database level
- Customer & product data processing

Production-ready PostgreSQL implementation with:

- Optimized schema design
- Indexing for performance
- Array fields for multi-value tags
- Efficient CSV import utility

### Frontend (React + Vite + Tailwind)

Modern SPA (Single Page Application)

Built with:

- React (19)
- Vite
- Tailwind CSS
- Lucide Icons

Implements:

- Dynamic dashboards with summary statistics
- Advanced multi-select filtering UI
- Reactive tables with pagination
- Sales analytics and data visualization

## 🛠️ Local Development Setup

### 1️⃣ Backend Setup

```bash
cd backend
npm install
# Set up PostgreSQL database
# Create .env file with database credentials
npm run setup-db
npm run download-and-import
npm run dev
```

### 2️⃣ Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

## ☁️ Deployment Details

Hosted on Render

| Component | Render Service Type | Status |
|----------|---------------------|--------|
| Backend | Web Service | ✔ Live |
| Frontend | Static Web Service | ✔ Live |

The architecture uses:

- Auto-build on Git push
- Node.js build & start commands
- Static deployment with global CDN for frontend

## 📚 Documentation

Full architecture, workflow diagrams, HLD, LLD, and system explanation:
📂 https://drive.google.com/drive/folders/1_RXCbMdpIWdWZuif5CFXkmYoKWoWRfhu

Additional technical documents:

- [Testing Checklist](TESTING_CHECKLIST.md)
- [Deployment Summary](DEPLOYMENT_SUMMARY.md)
- [Recommended Improvements](IMPROVEMENTS.md)

## 🎯 Summary

TruEstate R.S.M.S. is a scalable sales management platform supporting:

- Modern UI with advanced multi-select filtering
- Fast backend with PostgreSQL database
- Search, Filter, Sort, Pagination
- CSV Data Ingestion & SQL Migration Support
- Ready for PostgreSQL production deployment
- Fully deployed on Render

## 🔧 PostgreSQL Database Features

The system now includes a full PostgreSQL implementation with:

- Optimized schema for 1M+ records
- Multi-select filtering using PostgreSQL arrays
- GIN indexes for efficient tag-based searches
- Batch processing for large CSV imports
- Connection pooling for performance
- Comprehensive indexing strategy

To set up the PostgreSQL database:

1. Install PostgreSQL locally or use a cloud provider
2. Configure environment variables in the backend
3. Run `npm run setup-db` to create the database and tables
4. Run `npm run download-and-import` to populate the database with data

## ☁️ Render Deployment Instructions

To deploy this application to Render with PostgreSQL:

1. Create a PostgreSQL database on Render
2. Deploy the backend as a Web Service with the following settings:
   - Build command: `npm install`
   - Start command: `npm start`
   - Environment variables:
     - `DATABASE_URL` (provided by Render)
     - `NODE_ENV=production`

3. Deploy the frontend as a Static Site with the following settings:
   - Build command: `npm install && npm run build`
   - Publish directory: `dist`

4. Update the frontend API URL to point to your deployed backend
5. Redeploy the frontend

## 📥 CSV Data Import

The sales data CSV file is hosted on Google Drive. You can import the data in two ways:

### Option 1: Automatic Download and Import (Recommended)
This will automatically download the CSV file from Google Drive and import it:

```bash
npm run download-and-import
```

### Option 2: Manual Download and Import
1. Download the CSV file:
   ```bash
   curl -L "https://drive.google.com/uc?export=download&id=1tzbyuxBmrBwMSXbL22r33FUMtO0V_lxb" -o backend/dataset/truestate_assignment_dataset.csv
   ```

2. Run the import script:
   ```bash
   npm run import-csv
   ```

This approach allows you to keep the large file separate from your repository while still having a reliable way to import the data during deployment.