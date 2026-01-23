# Inventorydos - Inventory Management System

A complete Angular-based inventory management system with full CRUD operations for products, suppliers, and orders. Built with Angular 20, TypeScript, and JSON Server for mock API.

## Features

### 📊 Dashboard
- Real-time metrics (Total Products, Inventory Value, Low Stock Items, Pending Orders)
- Low stock product alerts
- Recent orders overview
- Quick action buttons for common tasks

### 📦 Product Management
- View all products in a comprehensive table
- Filter by all products or low stock items
- View detailed product information
- Delete products with confirmation
- Visual highlighting for low stock items

### 🏢 Supplier Management
- Complete supplier directory
- Add new suppliers with contact information
- Edit existing supplier details
- Delete suppliers with confirmation
- Clickable email and phone links for quick contact

### 📋 Order Tracking
- View all purchase orders with status filtering
- Pending orders tab with order count
- Delivered orders tab with order count
- Mark orders as delivered
- Delete orders with confirmation
- Color-coded rows for easy status identification

### 🎨 UI/UX Features
- Responsive grid-based layout
- Professional styling with gradients and hover effects
- Interactive buttons with visual feedback
- Clean navigation bar with easy access to all sections
- Tab-based filtering interfaces
- Form validation and error handling

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── product-list/
│   │   ├── product-detail/
│   │   ├── supplier-list/
│   │   ├── order-tracker/
│   │   └── dashboard/
│   ├── services/
│   │   └── inventory.service.ts
│   ├── models/
│   │   ├── product.model.ts
│   │   ├── supplier.model.ts
│   │   └── order.model.ts
│   ├── pipes/
│   │   └── low-stock.pipe.ts
│   ├── directives/
│   │   └── highlight-low-stock.directive.ts
│   ├── app.ts
│   ├── app.html
│   ├── app.css
│   └── app.routes.ts
├── main.ts
└── styles.css
db.json (Mock data)
```

## Technology Stack

- **Framework**: Angular 20 (Standalone Components)
- **Language**: TypeScript
- **Styling**: CSS3 with gradients and responsive grid
- **State Management**: RxJS Observables
- **API**: JSON Server (Mock REST API)
- **Forms**: Template-driven forms with two-way binding
- **Routing**: Angular Router with lazy loading

## Development server

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Running the Application

1. Start the JSON Server (backend):
```bash
npm run json-server
```
The API will be available at `http://localhost:3000`

2. Start the Angular development server (in another terminal):
```bash
npm start
```
Navigate to `http://localhost:4200/` (or the port shown in terminal if 4200 is in use)

The application will automatically reload if you change any source files.

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
