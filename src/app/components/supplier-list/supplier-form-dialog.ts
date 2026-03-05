import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
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
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <h2 mat-dialog-title>{{ data.supplier ? 'Edit Supplier' : 'Add New Supplier' }}</h2>
    <mat-dialog-content>
      <form #supplierForm="ngForm" class="supplier-form" (ngSubmit)="onSave(supplierForm)">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Supplier Name</mat-label>
          <input matInput
                 name="name"
                 [(ngModel)]="model.name"
                 required
                 #nameField="ngModel"
                 placeholder="Enter supplier name">
          <mat-error *ngIf="nameField.invalid && nameField.touched">
            Supplier name is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Email</mat-label>
          <input matInput
                 type="email"
                 name="email"
                 [(ngModel)]="model.email"
                 required
                 email
                 #emailField="ngModel"
                 placeholder="Enter email address">
          <mat-error *ngIf="emailField.hasError('required') && emailField.touched">
            Email is required
          </mat-error>
          <mat-error *ngIf="emailField.hasError('email') && emailField.touched">
            Please enter a valid email address
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Phone</mat-label>
          <input matInput
                 type="tel"
                 name="phone"
                 [(ngModel)]="model.phone"
                 placeholder="Enter phone number">
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Address</mat-label>
          <textarea matInput
                    name="address"
                    [(ngModel)]="model.address"
                    placeholder="Enter address"
                    rows="3"></textarea>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button type="button" (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" type="submit" [disabled]="supplierForm.invalid" (click)="onSave(supplierForm)">
        {{ data.supplier ? 'Update' : 'Create' }}
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .supplier-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      min-width: 300px;
      max-width: 600px;
      padding: 16px 0;
    }

    @media (min-width: 768px) {
      .supplier-form {
        min-width: 500px;
      }
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
  model: Supplier;

  constructor(
    public dialogRef: MatDialogRef<SupplierFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { supplier?: Supplier }
  ) {
    this.model = {
      id: data.supplier?.id || 0,
      name: data.supplier?.name || '',
      email: data.supplier?.email || '',
      phone: data.supplier?.phone || '',
      address: data.supplier?.address || ''
    };
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(form: NgForm): void {
    if (form.valid) {
      this.dialogRef.close({ ...this.model });
    }
  }
}
