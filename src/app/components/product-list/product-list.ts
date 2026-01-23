import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { InventoryService } from '../../services/inventory.service';
import { Product } from '../../models/product.model';
import { ProductFormDialogComponent } from './product-form-dialog';
import { ConfirmDialogComponent } from '../shared/confirm-dialog';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTabsModule,
    MatTooltipModule
  ],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductListComponent implements OnInit {
  private inventoryService = inject(InventoryService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  products: Product[] = [];
  displayedColumns: string[] = ['name', 'description', 'price', 'quantity', 'reorderLevel', 'supplier', 'status', 'actions'];
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
        this.snackBar.open(this.errorMessage, 'Close', { duration: 5000 });
      }
    });
  }

  isLowStock(product: Product): boolean {
    return product.quantity <= product.reorderLevel;
  }

  deleteProduct(product: Product): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Product',
        message: `Are you sure you want to delete ${product.name}?`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.inventoryService.deleteProduct(product.id).subscribe({
          next: () => {
            this.loadProducts();
            this.snackBar.open('Product deleted successfully', 'Close', { duration: 3000 });
          },
          error: (err) => {
            console.error('Error deleting product:', err);
            this.snackBar.open('Failed to delete product', 'Close', { duration: 5000 });
          }
        });
      }
    });
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

  openAddDialog(): void {
    const dialogRef = this.dialog.open(ProductFormDialogComponent, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.inventoryService.addProduct(result).subscribe({
          next: () => {
            this.loadProducts();
            this.snackBar.open('Product added successfully', 'Close', { duration: 3000 });
          },
          error: (err) => {
            console.error('Error adding product:', err);
            this.snackBar.open('Failed to add product', 'Close', { duration: 5000 });
          }
        });
      }
    });
  }

  openEditDialog(product: Product): void {
    const dialogRef = this.dialog.open(ProductFormDialogComponent, {
      width: '600px',
      data: { product: { ...product } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.inventoryService.updateProduct(result.id, result).subscribe({
          next: () => {
            this.loadProducts();
            this.snackBar.open('Product updated successfully', 'Close', { duration: 3000 });
          },
          error: (err) => {
            console.error('Error updating product:', err);
            this.snackBar.open('Failed to update product', 'Close', { duration: 5000 });
          }
        });
      }
    });
  }
}
