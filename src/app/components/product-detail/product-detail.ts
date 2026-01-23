import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { InventoryService } from '../../services/inventory.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetailComponent implements OnInit {
  private inventoryService = inject(InventoryService);
  private route = inject(ActivatedRoute);

  product: Product | null = null;
  isLoading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const productId = params['id'];
      this.loadProduct(productId);
    });
  }

  loadProduct(id: number): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.inventoryService.getProductById(id).subscribe({
      next: (data) => {
        this.product = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load product details.';
        this.isLoading = false;
        console.error('Error loading product:', err);
      }
    });
  }

  isLowStock(): boolean {
    return this.product ? this.product.quantity <= this.product.reorderLevel : false;
  }
}
