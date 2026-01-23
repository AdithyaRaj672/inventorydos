import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { InventoryService } from '../../services/inventory.service';
import { Product } from '../../models/product.model';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatChipsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  private inventoryService = inject(InventoryService);

  products: Product[] = [];
  orders: Order[] = [];
  isLoading = false;

  totalProducts = 0;
  totalValue = 0;
  lowStockItems = 0;
  pendingOrders = 0;

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.isLoading = true;

    this.inventoryService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.calculateMetrics();
      }
    });

    this.inventoryService.getOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.pendingOrders = this.orders.filter(
          (o) => o.status === 'pending'
        ).length;
        this.isLoading = false;
      }
    });
  }

  calculateMetrics(): void {
    this.totalProducts = this.products.length;
    this.totalValue = this.products.reduce((sum, p) => sum + p.price * p.quantity, 0);
    this.lowStockItems = this.products.filter((p) => p.quantity <= p.reorderLevel).length;
  }

  getLowStockProducts(): Product[] {
    return this.products.filter((p) => p.quantity <= p.reorderLevel).slice(0, 5);
  }
}
