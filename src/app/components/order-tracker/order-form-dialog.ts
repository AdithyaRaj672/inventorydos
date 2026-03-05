import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Order } from '../../models/order.model';
import { Product } from '../../models/product.model';

/** Custom validator: quantity must be > 0 */
function positiveQuantityValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (value === null || value === undefined || value === '') return null;
  return value > 0 ? null : { positiveQuantity: true };
}

/** Custom validator: delivery date must not be before order date */
function deliveryAfterOrderValidator(group: AbstractControl): ValidationErrors | null {
  const orderDate = group.get('orderDate')?.value;
  const expectedDelivery = group.get('expectedDelivery')?.value;
  if (!orderDate || !expectedDelivery) return null;
  return new Date(expectedDelivery) >= new Date(orderDate) ? null : { deliveryBeforeOrder: true };
}

@Component({
  selector: 'app-order-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  template: `
    <h2 mat-dialog-title>{{ data.order ? 'Edit Order' : 'Add New Order' }}</h2>
    <mat-dialog-content>
      <form [formGroup]="orderForm" class="order-form">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Product</mat-label>
          <mat-select formControlName="productId" required>
            <mat-option *ngFor="let product of data.products" [value]="product.id">
              {{ product.name }} (Stock: {{ product.quantity }})
            </mat-option>
          </mat-select>
          <mat-error *ngIf="orderForm.get('productId')?.hasError('required')">
            Product is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Quantity</mat-label>
          <input matInput type="number" formControlName="quantity" placeholder="1" required>
          <mat-error *ngIf="orderForm.get('quantity')?.hasError('required')">
            Quantity is required
          </mat-error>
          <mat-error *ngIf="orderForm.get('quantity')?.hasError('positiveQuantity')">
            Quantity must be greater than 0
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Supplier</mat-label>
          <input matInput formControlName="supplier" placeholder="Supplier name" required>
          <mat-error *ngIf="orderForm.get('supplier')?.hasError('required')">
            Supplier is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Order Date</mat-label>
          <input matInput [matDatepicker]="orderDatePicker" formControlName="orderDate" required>
          <mat-datepicker-toggle matIconSuffix [for]="orderDatePicker"></mat-datepicker-toggle>
          <mat-datepicker #orderDatePicker></mat-datepicker>
          <mat-error *ngIf="orderForm.get('orderDate')?.hasError('required')">
            Order date is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Expected Delivery</mat-label>
          <input matInput [matDatepicker]="deliveryPicker" formControlName="expectedDelivery" required>
          <mat-datepicker-toggle matIconSuffix [for]="deliveryPicker"></mat-datepicker-toggle>
          <mat-datepicker #deliveryPicker></mat-datepicker>
          <mat-error *ngIf="orderForm.get('expectedDelivery')?.hasError('required')">
            Expected delivery date is required
          </mat-error>
        </mat-form-field>

        <div *ngIf="orderForm.hasError('deliveryBeforeOrder')" class="form-error">
          Expected delivery must be on or after the order date.
        </div>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Status</mat-label>
          <mat-select formControlName="status" required>
            <mat-option value="pending">Pending</mat-option>
            <mat-option value="delivered">Delivered</mat-option>
            <mat-option value="cancelled">Cancelled</mat-option>
          </mat-select>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" [disabled]="!orderForm.valid" (click)="onSave()">
        {{ data.order ? 'Update' : 'Create' }}
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .order-form {
      display: flex;
      flex-direction: column;
      gap: 12px;
      min-width: 300px;
      max-width: 500px;
      padding: 16px 0;
    }
    @media (min-width: 768px) {
      .order-form { min-width: 450px; }
    }
    .full-width { width: 100%; }
    mat-dialog-content { max-height: 70vh; overflow-y: auto; }
    mat-dialog-actions { padding: 16px 0; margin: 0; }
    .form-error { color: #f44336; font-size: 12px; margin-top: -8px; }
  `]
})
export class OrderFormDialogComponent {
  private fb = inject(FormBuilder);
  orderForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<OrderFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { order?: Order; products: Product[] }
  ) {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    this.orderForm = this.fb.group(
      {
        productId: [data.order?.productId || null, Validators.required],
        quantity: [data.order?.quantity || 1, [Validators.required, positiveQuantityValidator]],
        supplier: [data.order?.supplier || '', Validators.required],
        orderDate: [data.order ? new Date(data.order.orderDate) : today, Validators.required],
        expectedDelivery: [data.order ? new Date(data.order.expectedDelivery) : nextWeek, Validators.required],
        status: [data.order?.status || 'pending', Validators.required]
      },
      { validators: deliveryAfterOrderValidator }
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.orderForm.valid) {
      const formValue = this.orderForm.value;
      const order: Order = {
        id: this.data.order?.id || 0,
        productId: formValue.productId,
        quantity: formValue.quantity,
        orderDate: formValue.orderDate,
        expectedDelivery: formValue.expectedDelivery,
        status: formValue.status,
        supplier: formValue.supplier
      };
      this.dialogRef.close(order);
    }
  }
}
