import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService } from '../../services/inventory.service';
import { Supplier } from '../../models/supplier.model';

@Component({
  selector: 'app-supplier-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './supplier-list.html',
  styleUrl: './supplier-list.css'
})
export class SupplierListComponent implements OnInit {
  private inventoryService = inject(InventoryService);

  suppliers: Supplier[] = [];
  isLoading = false;
  errorMessage = '';
  showForm = false;
  editingId: number | null = null;

  newSupplier: Supplier = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    address: ''
  };

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.inventoryService.getSuppliers().subscribe({
      next: (data) => {
        this.suppliers = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load suppliers.';
        this.isLoading = false;
        console.error('Error loading suppliers:', err);
      }
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.resetForm();
    }
  }

  editSupplier(supplier: Supplier): void {
    this.editingId = supplier.id;
    this.newSupplier = { ...supplier };
    this.showForm = true;
  }

  addOrUpdateSupplier(): void {
    if (!this.newSupplier.name || !this.newSupplier.email) {
      alert('Please fill in required fields: Name and Email');
      return;
    }

    if (this.editingId) {
      this.inventoryService.updateSupplier(this.editingId, this.newSupplier).subscribe({
        next: () => {
          this.loadSuppliers();
          this.resetForm();
          this.showForm = false;
          alert('Supplier updated successfully');
        },
        error: (err) => {
          alert('Failed to update supplier');
          console.error('Error updating supplier:', err);
        }
      });
    } else {
      this.inventoryService.addSupplier(this.newSupplier).subscribe({
        next: () => {
          this.loadSuppliers();
          this.resetForm();
          this.showForm = false;
          alert('Supplier added successfully');
        },
        error: (err) => {
          alert('Failed to add supplier');
          console.error('Error adding supplier:', err);
        }
      });
    }
  }

  deleteSupplier(id: number): void {
    if (confirm('Are you sure you want to delete this supplier?')) {
      this.inventoryService.deleteSupplier(id).subscribe({
        next: () => {
          this.loadSuppliers();
          alert('Supplier deleted successfully');
        },
        error: (err) => {
          alert('Failed to delete supplier');
          console.error('Error deleting supplier:', err);
        }
      });
    }
  }

  resetForm(): void {
    this.newSupplier = {
      id: 0,
      name: '',
      email: '',
      phone: '',
      address: ''
    };
    this.editingId = null;
  }
}

