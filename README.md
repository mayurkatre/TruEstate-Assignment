TruEstate R.S.M.S. - Sales Management System

A comprehensive real estate sales management system built with a modern full-stack architecture, supporting sales analytics, customer management, and product tracking.

Project Structure
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

Components Overview
Backend

Built using Node.js with the Hono framework

Handles:

Sales data processing

Filtering, sorting, searching, and pagination logic

API routing

Designed to integrate with PostgreSQL in production

CSV data can be converted into SQL tables using parsing libraries like:

csv-parser

fast-csv

Papa Parse

Current demo uses partial CSV data for demonstration mode

Frontend

Built with React (Vite-powered)

Implements dashboards, tables, UI components, and filtering features

Responsive design using Tailwind CSS

Connects to backend APIs for full CRUD functionality

Setup Instructions
1. Backend Setup
cd backend
npm install
npm run dev

2. Frontend Setup
cd ../frontend
npm install
npm start

Deployment Information
Live Deployed Application

The project is deployed and accessible at:

🌐 https://truestate-assignment-as17.onrender.com/

Render Deployment Architecture
Backend

Hosted under Render Web Service

Auto-build & auto-deploy from Git

Runs Node.js + Hono API

Frontend

Hosted under Render Static Web Service

Built using Vite (npm run build)

Served via global CDN

This setup ensures clean separation of concerns and better scalability.

Technical Documentation

All detailed system design documents (HLD, LLD, architecture diagrams, workflow diagrams) are stored here:

📄 Technical Documentation Link:
👉 https://drive.google.com/drive/folders/1_RXCbMdpIWdWZuif5CFXkmYoKWoWRfhu

Additional Production Notes

Current version uses sample CSV data only for demonstration.

For production deployment:

PostgreSQL can replace the in-memory dataset.

CSV → SQL conversion can be automated using parsing libraries.

SQL schema migrations can be managed using tools like Prisma, Knex, or Sequelize.

The system is structured to easily scale with real-world enterprise datasets and multiple users.

Documentation Reference

All architecture, diagrams, and technical details are available inside the docs/ directory and the Google Drive documentation link above.
