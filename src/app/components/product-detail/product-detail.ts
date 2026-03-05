import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { HighlightLowStockDirective } from '../../directives/highlight-low-stock.directive';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    HighlightLowStockDirective
  ],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetailComponent implements OnInit {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private location = inject(Location);

  product: Product | null = null;
  isLoading = false;
  errorMessage = '';

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const productId = params['id'];
      this.loadProduct(productId);
    });
  }

  loadProduct(id: number): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.productService.getProductById(id).subscribe({
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
