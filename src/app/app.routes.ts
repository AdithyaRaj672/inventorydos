import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list';
import { ProductDetailComponent } from './components/product-detail/product-detail';
import { SupplierListComponent } from './components/supplier-list/supplier-list';
import { OrderTrackerComponent } from './components/order-tracker/order-tracker';
import { DashboardComponent } from './components/dashboard/dashboard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'suppliers', component: SupplierListComponent },
  { path: 'orders', component: OrderTrackerComponent },
  { path: '**', redirectTo: 'dashboard' }
];
