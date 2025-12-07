# TruEstate R.S.M.S. - Architecture Overview

## Backend Architecture

### Core Components
- **Framework**: Hono 4.7.7 - Lightweight, fast web framework
- **Runtime**: Cloudflare Workers - Serverless edge computing platform
- **Data Storage**: In-memory database (simulated for demonstration)
- **API Layer**: RESTful API endpoints for frontend communication

### Key Features
- CORS-enabled for cross-origin requests
- Modular service architecture with database service layer
- CRUD operations for sales, customers, and products
- Filtering and sorting capabilities
- Pagination support for large datasets

## Frontend Architecture

### Core Components
- **Framework**: React 19 - Modern UI library
- **Routing**: React Router 7 - Declarative routing
- **Build Tool**: Vite 7 - Fast build tool and development server
- **Styling**: Tailwind CSS - Utility-first CSS framework
- **Icons**: Lucide React - Consistent icon set

### Key Features
- Responsive design for all device sizes
- Component-based architecture
- State management with React Hooks
- API integration layer
- Interactive UI with form handling

## Data Flow

1. **User Interaction**: User interacts with React frontend components
2. **API Requests**: Frontend makes REST API calls to backend endpoints
3. **Request Processing**: Backend receives requests and routes to appropriate handlers
4. **Business Logic**: Services process data and apply business rules
5. **Data Operations**: Database service handles data storage and retrieval
6. **Response Generation**: Backend formats data as JSON responses
7. **UI Updates**: Frontend receives data and updates components
8. **User Feedback**: Updated interface is displayed to user

## Folder Structure

```
TruEstate-R-S-M-S/
├── backend/
│   ├── src/
│   │   ├── services/
│   │   │   └── databaseService.js
│   │   ├── index.js
│   │   └── server.js
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── js/
│   │   │   ├── components/
│   │   │   │   └── Layout.jsx
│   │   │   ├── pages/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── Customers.jsx
│   │   │   │   ├── Invoices.jsx
│   │   │   │   ├── Products.jsx
│   │   │   │   └── Reports.jsx
│   │   │   ├── api.js
│   │   │   ├── App.jsx
│   │   │   ├── main.jsx
│   │   │   ├── ui.js
│   │   │   └── utils.js
│   │   ├── css/
│   │   │   └── styles.css
│   │   └── assets/
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   └── README.md
├── docs/
│   └── architecture.md
└── README.md
```

## Module Responsibilities

### Dashboard Module
- Displays sales summary statistics
- Shows transaction data with filtering and sorting
- Provides overview of key metrics

### Customers Module
- Manages customer information
- Allows adding new customers
- Displays customer list with contact details

### Invoices Module
- Handles sales transaction records
- Supports creating new invoices
- Enables downloading invoice details

### Products Module
- Manages product catalog
- Allows adding new products
- Tracks inventory levels

### Reports Module
- Generates analytical reports
- Provides data visualization
- Shows trends and insights

### API Service Layer
- Abstracts backend communication
- Handles HTTP requests and responses
- Provides error handling and data transformation

### Database Service Layer
- Manages data storage operations
- Implements CRUD functionality
- Handles data filtering and sorting
- Simulates persistence with in-memory storage



