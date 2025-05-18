# Forsit E-commerce Admin Dashboard

A comprehensive admin dashboard for e-commerce management, built with Vue.js and Node.js.

## Features

- Revenue Analysis
  - Real-time order and sales tracking
  - Interactive charts for revenue trends
  - Category-based filtering
  - Time-based analysis (daily, weekly, monthly, annual)

- Inventory Management
  - Product listing with current stock status
  - Advanced filtering and search capabilities
  - Inventory level updates
  - Low stock alerts and forecasting

- Product Registration
  - New product addition form
  - Image upload functionality
  - Real-time inventory updates

## Tech Stack

- Vue.js 3
- Vuex for state management
- Vue Router for navigation
- Chart.js for data visualization
- AG Grid for data tables
- Element Plus for UI components
- Axios for API communication

## Setup Instructions

1. Clone the repository:
```bash
git clone [repository-url]
cd forsit-ecommerce-admin
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run serve
```

4. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── assets/         # Static assets
├── components/     # Reusable components
├── views/          # Page components
├── router/         # Route configurations
├── store/          # Vuex store modules
├── services/       # API services
└── utils/          # Utility functions
```

## Navigation

1. Revenue Analysis
   - Access via the "Revenue" tab in the main navigation
   - Use the time period selector to view different time ranges
   - Filter data by product categories using the category dropdown

2. Inventory Management
   - Access via the "Inventory" tab
   - Use the search bar to find specific products
   - Sort columns by clicking on column headers
   - Update stock levels using the inline edit functionality

3. Product Registration
   - Access via the "Add Product" button in the Inventory page
   - Fill in the product details form
   - Upload product images
   - Submit to add the product to inventory

## Demo Data

The dashboard is populated with sample data simulating real e-commerce metrics from Amazon and Walmart. This includes:
- Sales data across different product categories
- Inventory levels and movement
- Order statistics
- Revenue trends

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 