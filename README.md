# Inventorydos - Inventory Management System

A complete Angular-based inventory management system with full CRUD operations for products, suppliers, and orders. Built with Angular 20, TypeScript, Angular Material Design, and JSON Server for mock API.

## Features

###  Dashboard
- Real-time metrics with Material Cards (Total Products, Inventory Value, Low Stock Items, Pending Orders)
- Material Icons for visual indicators
- Low stock product alerts with Material Chips
- Recent orders overview
- Quick action buttons with Material Design

###  Product Management
- Material Table with sortable columns
- Material Tabs for filtering (All Products / Low Stock Items)
- Material Dialog with Reactive Forms for add/edit operations
- Form validation with error messages
- Material SnackBar notifications
- View detailed product information with Material Cards
- Material Tooltips on action buttons
- Visual highlighting for low stock items

###  Supplier Management
- Material Table with complete CRUD operations
- Material Dialog with Reactive Forms and validation
- Add, edit, and delete suppliers with confirmation dialogs
- Material SnackBar for user feedback
- Responsive form design with media queries

###  Order Tracking
- Material Table with status visualization
- Material Tabs for filtering (All / Pending / Delivered)
- Material Chips with icons for order status
- Mark orders as delivered functionality
- Delete orders with Material confirmation dialog
- Real-time order status updates

###  UI/UX Features
- **Angular Material Design** throughout the application
- Material Toolbar for navigation with RouterLink active states
- Material Progress Spinners for loading states
- Material SnackBar for user notifications
- Material Dialogs for confirmations and forms
- Material Icons for visual clarity
- Responsive grid-based layout
- Tab-based filtering interfaces
- Reactive Forms with comprehensive validation
- Professional Material Design theme (Azure Blue)

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── product-list/
│   │   │   ├── product-list.ts
│   │   │   ├── product-list.html
│   │   │   ├── product-list.css
│   │   │   └── product-form-dialog.ts
│   │   ├── product-detail/
│   │   ├── supplier-list/
│   │   │   ├── supplier-list.ts
│   │   │   ├── supplier-list.html
│   │   │   ├── supplier-list.css
│   │   │   └── supplier-form-dialog.ts
│   │   ├── order-tracker/
│   │   ├── dashboard/
│   │   └── shared/
│   │       └── confirm-dialog.ts
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
│   ├── app.config.ts
│   └── app.routes.ts
├── main.ts
└── styles.css
db.json (Mock data)
```

## Technology Stack

- **Framework**: Angular 20 (Standalone Components)
- **Language**: TypeScript (with strict typing)
- **UI Library**: Angular Material Design (@angular/material v20.2)
- **Styling**: Angular Material theme + Custom CSS3
- **State Management**: RxJS Observables
- **API**: JSON Server (Mock REST API)
- **Forms**: Reactive Forms with validation
- **Routing**: Angular Router
- **HTTP**: HttpClient with Interceptors
- **Animations**: @angular/animations

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
