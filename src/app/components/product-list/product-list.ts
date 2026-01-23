import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InventoryService } from '../../services/inventory.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductListComponent implements OnInit {
  private inventoryService = inject(InventoryService);

  products: Product[] = [];
  isLoading = false;
  errorMessage = '';
  selectedFilter = 'all';

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.inventoryService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load products. Please try again.';
        this.isLoading = false;
        console.error('Error loading products:', err);
      }
    });
  }

  isLowStock(product: Product): boolean {
    return product.quantity <= product.reorderLevel;
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.inventoryService.deleteProduct(id).subscribe({
        next: () => {
          this.products = this.products.filter(p => p.id !== id);
          alert('Product deleted successfully');
        },
        error: (err) => {
          alert('Failed to delete product');
          console.error('Error deleting product:', err);
        }
      });
    }
  }

  getFilteredProducts(): Product[] {
    if (this.selectedFilter === 'lowStock') {
      return this.products.filter(p => this.isLowStock(p));
    }
    return this.products;
  }

  setFilter(filter: string): void {
    this.selectedFilter = filter;
  }
}
