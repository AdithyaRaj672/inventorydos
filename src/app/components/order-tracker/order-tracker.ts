import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryService } from '../../services/inventory.service';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-order-tracker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-tracker.html',
  styleUrl: './order-tracker.css'
})
export class OrderTrackerComponent implements OnInit {
  private inventoryService = inject(InventoryService);

  orders: Order[] = [];
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
        this.errorMessage = 'Failed to load orders.';
        this.isLoading = false;
        console.error('Error loading orders:', err);
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

  getStatusClass(status: string): string {
    return status === 'pending' ? 'pending' : 'delivered';
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

  deleteOrder(id: number): void {
    if (confirm('Are you sure you want to delete this order?')) {
      this.inventoryService.deleteOrder(id).subscribe({
        next: () => {
          this.orders = this.orders.filter(o => o.id !== id);
          alert('Order deleted successfully');
        },
        error: (err) => {
          alert('Failed to delete order');
          console.error('Error deleting order:', err);
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
        alert('Order marked as delivered');
      },
      error: (err) => {
        alert('Failed to update order');
        console.error('Error updating order:', err);
      }
    });
  }
}
