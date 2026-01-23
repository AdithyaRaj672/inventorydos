import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Supplier } from '../../models/supplier.model';

@Component({
  selector: 'app-supplier-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <h2 mat-dialog-title>{{ data.supplier ? 'Edit Supplier' : 'Add New Supplier' }}</h2>
    <mat-dialog-content>
      <form [formGroup]="supplierForm" class="supplier-form">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Supplier Name</mat-label>
          <input matInput formControlName="name" placeholder="Enter supplier name" required>
          <mat-error *ngIf="supplierForm.get('name')?.hasError('required')">
            Supplier name is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Email</mat-label>
          <input matInput type="email" formControlName="email" placeholder="Enter email address" required>
          <mat-error *ngIf="supplierForm.get('email')?.hasError('required')">
            Email is required
          </mat-error>
          <mat-error *ngIf="supplierForm.get('email')?.hasError('email')">
            Please enter a valid email address
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Phone</mat-label>
          <input matInput type="tel" formControlName="phone" placeholder="Enter phone number">
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Address</mat-label>
          <textarea matInput formControlName="address" placeholder="Enter address" rows="3"></textarea>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" [disabled]="!supplierForm.valid" (click)="onSave()">
        {{ data.supplier ? 'Update' : 'Create' }}
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .supplier-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      min-width: 500px;
      padding: 16px 0;
    }

    .full-width {
      width: 100%;
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
export class SupplierFormDialogComponent {
  private fb = inject(FormBuilder);
  supplierForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<SupplierFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { supplier?: Supplier }
  ) {
    this.supplierForm = this.fb.group({
      name: [data.supplier?.name || '', Validators.required],
      email: [data.supplier?.email || '', [Validators.required, Validators.email]],
      phone: [data.supplier?.phone || ''],
      address: [data.supplier?.address || '']
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.supplierForm.valid) {
      const formValue = this.supplierForm.value;
      const supplier: Supplier = {
        id: this.data.supplier?.id || 0,
        ...formValue
      };
      this.dialogRef.close(supplier);
    }
  }
}
