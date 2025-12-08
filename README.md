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

- csv-parser
- fast-csv
- Papa Parse

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

## 🧩 Components Overview

### Backend (Node.js + Hono)

Fast and lightweight REST API using Hono

Handles:

- Sales operations
- Filtering, sorting, pagination
- Customer & product data processing

Easily upgradable to PostgreSQL for production

CSV → SQL support via parsing libraries

### Frontend (React + Vite + Tailwind)

Modern SPA (Single Page Application)

Built with:

- React (19)
- Vite
- Tailwind CSS
- Lucide Icons

Implements:

- Dynamic dashboards
- Search & filtering UI
- Reactive tables
- Sales analytics

## 🛠️ Local Development Setup

### 1️⃣ Backend Setup

```bash
cd backend
npm install
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

## 🎯 Summary

TruEstate R.S.M.S. is a scalable sales management platform supporting:

- Modern UI (React + Tailwind)
- Fast backend (Node.js + Hono)
- Search, Filter, Sort, Pagination
- CSV Data Ingestion & SQL Migration Support
- Ready for PostgreSQL production deployment
- Fully deployed on Render