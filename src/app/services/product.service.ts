import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private productsUrl = 'http://localhost:3000/products';

  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl).pipe(
      tap(products => this.productsSubject.next(products))
    );
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.productsUrl}/${id}`);
  }

  addProduct(product: Product): Observable<Product[]> {
    return this.http.post<Product>(this.productsUrl, product).pipe(
      switchMap(() => this.getProducts())
    );
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.productsUrl}/${id}`, product).pipe(
      tap(updated => {
        const current = this.productsSubject.getValue();
        const index = current.findIndex(p => p.id === id);
        if (index !== -1) {
          const next = [...current];
          next[index] = updated;
          this.productsSubject.next(next);
        }
      })
    );
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.productsUrl}/${id}`).pipe(
      tap(() => {
        const current = this.productsSubject.getValue();
        this.productsSubject.next(current.filter(p => p.id !== id));
      })
    );
  }
}
