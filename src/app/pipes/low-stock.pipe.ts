import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product.model';

@Pipe({
  name: 'lowStock',
  standalone: true
})
export class LowStockPipe implements PipeTransform {
  transform(products: Product[]): Product[] {
    return products.filter((product) => product.quantity <= product.reorderLevel);
  }
}
