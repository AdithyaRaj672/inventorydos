import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  template: `
    <h2 mat-dialog-title>{{ data.product ? 'Edit Product' : 'Add New Product' }}</h2>
    <mat-dialog-content>
      <form [formGroup]="productForm" class="product-form">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Product Name</mat-label>
          <input matInput formControlName="name" placeholder="Enter product name" required>
          <mat-error *ngIf="productForm.get('name')?.hasError('required')">
            Product name is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Description</mat-label>
          <textarea matInput formControlName="description" placeholder="Enter product description" rows="3" required></textarea>
          <mat-error *ngIf="productForm.get('description')?.hasError('required')">
            Description is required
          </mat-error>
        </mat-form-field>

        <div class="form-row">
          <mat-form-field appearance="outline">
            <mat-label>Price</mat-label>
            <input matInput type="number" formControlName="price" placeholder="0.00" required>
            <span matTextPrefix>$&nbsp;</span>
            <mat-error *ngIf="productForm.get('price')?.hasError('required')">
              Price is required
            </mat-error>
            <mat-error *ngIf="productForm.get('price')?.hasError('min')">
              Price must be greater than 0
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Quantity</mat-label>
            <input matInput type="number" formControlName="quantity" placeholder="0" required>
            <mat-error *ngIf="productForm.get('quantity')?.hasError('required')">
              Quantity is required
            </mat-error>
            <mat-error *ngIf="productForm.get('quantity')?.hasError('min')">
              Quantity must be 0 or greater
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Reorder Level</mat-label>
            <input matInput type="number" formControlName="reorderLevel" placeholder="0" required>
            <mat-error *ngIf="productForm.get('reorderLevel')?.hasError('required')">
              Reorder level is required
            </mat-error>
            <mat-error *ngIf="productForm.get('reorderLevel')?.hasError('min')">
              Reorder level must be 0 or greater
            </mat-error>
          </mat-form-field>
        </div>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Supplier</mat-label>
          <input matInput formControlName="supplier" placeholder="Enter supplier name" required>
          <mat-error *ngIf="productForm.get('supplier')?.hasError('required')">
            Supplier is required
          </mat-error>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" [disabled]="!productForm.valid" (click)="onSave()">
        {{ data.product ? 'Update' : 'Create' }}
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .product-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      min-width: 300px;
      max-width: 600px;
      padding: 16px 0;
    }

    @media (min-width: 768px) {
      .product-form {
        min-width: 500px;
      }
    }

    .full-width {
      width: 100%;
    }

    .form-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }

    mat-dialog-content {
      max-height: 70vh;
      overflow-y: auto;
    }

    mat-dialog-actions {
      padding: 16px 0;
      margin: 0;
    }
  `]
})
export class ProductFormDialogComponent {
  private fb = inject(FormBuilder);
  productForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ProductFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product?: Product }
  ) {
    this.productForm = this.fb.group({
      name: [data.product?.name || '', Validators.required],
      description: [data.product?.description || '', Validators.required],
      price: [data.product?.price || 0, [Validators.required, Validators.min(0.01)]],
      quantity: [data.product?.quantity || 0, [Validators.required, Validators.min(0)]],
      reorderLevel: [data.product?.reorderLevel || 0, [Validators.required, Validators.min(0)]],
      supplier: [data.product?.supplier || '', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.productForm.valid) {
      const formValue = this.productForm.value;
      const product: Product = {
        id: this.data.product?.id || 0,
        ...formValue
      };
      this.dialogRef.close(product);
    }
  }
}
