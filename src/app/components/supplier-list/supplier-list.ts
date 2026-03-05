import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SupplierService } from '../../services/supplier.service';
import { Supplier } from '../../models/supplier.model';
import { SupplierFormDialogComponent } from './supplier-form-dialog';
import { ConfirmDialogComponent } from '../shared/confirm-dialog';

@Component({
  selector: 'app-supplier-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTabsModule,
    MatTooltipModule
  ],
  templateUrl: './supplier-list.html',
  styleUrl: './supplier-list.css'
})
export class SupplierListComponent implements OnInit {
  private supplierService = inject(SupplierService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  suppliers: Supplier[] = [];
  displayedColumns: string[] = ['name', 'email', 'phone', 'address', 'actions'];
  isLoading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.supplierService.getSuppliers().subscribe({
      next: (data) => {
        this.suppliers = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load suppliers. Please try again.';
        this.isLoading = false;
        console.error('Error loading suppliers:', err);
        this.snackBar.open(this.errorMessage, 'Close', { duration: 5000 });
      }
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(SupplierFormDialogComponent, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.supplierService.addSupplier(result).subscribe({
          next: () => {
            this.loadSuppliers();
            this.snackBar.open('Supplier added successfully', 'Close', { duration: 3000 });
          },
          error: (err) => {
            console.error('Error adding supplier:', err);
            this.snackBar.open('Failed to add supplier', 'Close', { duration: 5000 });
          }
        });
      }
    });
  }

  openEditDialog(supplier: Supplier): void {
    const dialogRef = this.dialog.open(SupplierFormDialogComponent, {
      width: '600px',
      data: { supplier: { ...supplier } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.supplierService.updateSupplier(result.id, result).subscribe({
          next: () => {
            this.loadSuppliers();
            this.snackBar.open('Supplier updated successfully', 'Close', { duration: 3000 });
          },
          error: (err) => {
            console.error('Error updating supplier:', err);
            this.snackBar.open('Failed to update supplier', 'Close', { duration: 5000 });
          }
        });
      }
    });
  }

  deleteSupplier(supplier: Supplier): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Supplier',
        message: `Are you sure you want to delete ${supplier.name}?`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.supplierService.deleteSupplier(supplier.id).subscribe({
          next: () => {
            this.loadSuppliers();
            this.snackBar.open('Supplier deleted successfully', 'Close', { duration: 3000 });
          },
          error: (err) => {
            console.error('Error deleting supplier:', err);
            this.snackBar.open('Failed to delete supplier', 'Close', { duration: 5000 });
          }
        });
      }
    });
  }
}

