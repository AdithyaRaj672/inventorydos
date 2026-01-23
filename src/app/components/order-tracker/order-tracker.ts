import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { InventoryService } from '../../services/inventory.service';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-order-tracker',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTabsModule,
    MatTooltipModule
  ],
  templateUrl: './order-tracker.html',
  styleUrl: './order-tracker.css'
})
export class OrderTrackerComponent implements OnInit {
  private inventoryService = inject(InventoryService);
  private snackBar = inject(MatSnackBar);

  orders: Order[] = [];
  displayedColumns: string[] = ['id', 'productId', 'quantity', 'orderDate', 'expectedDelivery', 'supplier', 'status', 'actions'];
  isLoading = false;
  errorMessage = '';
  activeTab: 'all' | 'pending' | 'delivered' = 'all';

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.inventoryService.getOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load orders. Please try again.';
        this.isLoading = false;
        console.error('Error loading orders:', err);
        this.snackBar.open(this.errorMessage, 'Close', { duration: 5000 });
      }
    });
  }

  getFilteredOrders(): Order[] {
    if (this.activeTab === 'pending') {
      return this.orders.filter((o) => o.status === 'pending');
    } else if (this.activeTab === 'delivered') {
      return this.orders.filter((o) => o.status === 'delivered');
    }
    return this.orders;
  }

  getPendingCount(): number {
    return this.orders.filter(o => o.status === 'pending').length;
  }

  getDeliveredCount(): number {
    return this.orders.filter(o => o.status === 'delivered').length;
  }

  setTab(tab: 'all' | 'pending' | 'delivered'): void {
    this.activeTab = tab;
  }

  deleteOrder(order: Order): void {
    if (confirm(`Are you sure you want to delete order #${order.id}?`)) {
      this.inventoryService.deleteOrder(order.id).subscribe({
        next: () => {
          this.orders = this.orders.filter(o => o.id !== order.id);
          this.snackBar.open('Order deleted successfully', 'Close', { duration: 3000 });
        },
        error: (err) => {
          console.error('Error deleting order:', err);
          this.snackBar.open('Failed to delete order', 'Close', { duration: 5000 });
        }
      });
    }
  }

  markAsDelivered(order: Order): void {
    const updatedOrder = { ...order, status: 'delivered' as const };
    this.inventoryService.updateOrder(order.id, updatedOrder).subscribe({
      next: () => {
        const index = this.orders.findIndex(o => o.id === order.id);
        if (index !== -1) {
          this.orders[index].status = 'delivered';
        }
        this.snackBar.open('Order marked as delivered', 'Close', { duration: 3000 });
      },
      error: (err) => {
        console.error('Error updating order:', err);
        this.snackBar.open('Failed to update order', 'Close', { duration: 5000 });
      }
    });
  }
}
