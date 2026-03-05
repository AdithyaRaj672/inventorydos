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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { OrderService } from '../../services/order.service';
import { ProductService } from '../../services/product.service';
import { Order } from '../../models/order.model';
import { Product } from '../../models/product.model';
import { ConfirmDialogComponent } from '../shared/confirm-dialog';
import { OrderFormDialogComponent } from './order-form-dialog';

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
    MatTooltipModule,
    MatDialogModule,
    MatPaginatorModule
  ],
  templateUrl: './order-tracker.html',
  styleUrl: './order-tracker.css'
})
export class OrderTrackerComponent implements OnInit {
  private orderService = inject(OrderService);
  private productService = inject(ProductService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  orders: Order[] = [];
  products: Product[] = [];
  displayedColumns: string[] = ['id', 'productId', 'quantity', 'orderDate', 'expectedDelivery', 'supplier', 'status', 'actions'];
  isLoading = false;
  errorMessage = '';
  activeTab: 'all' | 'pending' | 'delivered' = 'all';

  pageSize = 10;
  pageIndex = 0;

  ngOnInit(): void {
    this.loadOrders();
    this.productService.getProducts().subscribe({ next: (data) => (this.products = data) });
  }

  loadOrders(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.orderService.getOrders().subscribe({
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

  private getOrdersForActiveTab(): Order[] {
    if (this.activeTab === 'pending') return this.orders.filter(o => o.status === 'pending');
    if (this.activeTab === 'delivered') return this.orders.filter(o => o.status === 'delivered');
    return this.orders;
  }

  getFilteredOrders(): Order[] {
    const filtered = this.getOrdersForActiveTab();
    const start = this.pageIndex * this.pageSize;
    return filtered.slice(start, start + this.pageSize);
  }

  getFilteredTotal(): number {
    return this.getOrdersForActiveTab().length;
  }

  getPendingCount(): number {
    return this.orders.filter(o => o.status === 'pending').length;
  }

  getDeliveredCount(): number {
    return this.orders.filter(o => o.status === 'delivered').length;
  }

  setTab(tab: 'all' | 'pending' | 'delivered'): void {
    this.activeTab = tab;
    this.pageIndex = 0;
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(OrderFormDialogComponent, {
      width: '600px',
      data: { products: this.products }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.orderService.addOrder(result).subscribe({
          next: () => {
            this.loadOrders();
            this.snackBar.open('Order added successfully', 'Close', { duration: 3000 });
          },
          error: (err) => {
            console.error('Error adding order:', err);
            this.snackBar.open('Failed to add order', 'Close', { duration: 5000 });
          }
        });
      }
    });
  }

  openEditDialog(order: Order): void {
    const dialogRef = this.dialog.open(OrderFormDialogComponent, {
      width: '600px',
      data: { order: { ...order }, products: this.products }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.orderService.updateOrder(result.id, result).subscribe({
          next: () => {
            this.loadOrders();
            this.snackBar.open('Order updated successfully', 'Close', { duration: 3000 });
          },
          error: (err) => {
            console.error('Error updating order:', err);
            this.snackBar.open('Failed to update order', 'Close', { duration: 5000 });
          }
        });
      }
    });
  }

  deleteOrder(order: Order): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Order',
        message: `Are you sure you want to delete order #${order.id}?`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.orderService.deleteOrder(order.id).subscribe({
          next: () => {
            this.loadOrders();
            this.snackBar.open('Order deleted successfully', 'Close', { duration: 3000 });
          },
          error: (err) => {
            console.error('Error deleting order:', err);
            this.snackBar.open('Failed to delete order', 'Close', { duration: 5000 });
          }
        });
      }
    });
  }

  markAsDelivered(order: Order): void {
    const updatedOrder = { ...order, status: 'delivered' as const };
    this.orderService.updateOrder(order.id, updatedOrder).subscribe({
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

  getProductName(productId: number): string {
    const product = this.products.find(p => p.id === productId);
    return product ? product.name : `Product #${productId}`;
  }
}
