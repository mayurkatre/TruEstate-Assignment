# TruEstate R.S.M.S. - Sales Management System (Frontend)

This is the frontend component of the TruEstate R.S.M.S. Sales Management System.

## Structure

- `public/` - Static assets
- `src/` - Source code
  - `css/` - Stylesheets
  - `js/` - JavaScript files
    - `components/` - Reusable UI components
    - `pages/` - Page components
    - `app.js` - Application entry point
  - `assets/` - Images and other media

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm start
   ```

## Build

```
npm run build
```

## ☁️ Render Deployment Instructions

To deploy this frontend to Render:

1. Deploy as a Static Site with the following settings:
   - Build command: `npm install && npm run build`
   - Publish directory: `dist`

2. After the initial deployment, update the API URL in `src/js/api.js` to point to your deployed backend service URL

3. Redeploy the frontend to use the updated API URL

4. The frontend will be accessible at your Render service URL