import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { Supplier } from '../models/supplier.model';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private http = inject(HttpClient);
  private suppliersUrl = 'http://localhost:3000/suppliers';

  private suppliersSubject = new BehaviorSubject<Supplier[]>([]);
  suppliers$ = this.suppliersSubject.asObservable();

  getSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(this.suppliersUrl).pipe(
      tap(suppliers => this.suppliersSubject.next(suppliers))
    );
  }

  getSupplierById(id: number): Observable<Supplier> {
    return this.http.get<Supplier>(`${this.suppliersUrl}/${id}`);
  }

  addSupplier(supplier: Supplier): Observable<Supplier[]> {
    return this.http.post<Supplier>(this.suppliersUrl, supplier).pipe(
      switchMap(() => this.getSuppliers())
    );
  }

  updateSupplier(id: number, supplier: Supplier): Observable<Supplier> {
    return this.http.put<Supplier>(`${this.suppliersUrl}/${id}`, supplier).pipe(
      tap(updated => {
        const current = this.suppliersSubject.getValue();
        const index = current.findIndex(s => s.id === id);
        if (index !== -1) {
          const next = [...current];
          next[index] = updated;
          this.suppliersSubject.next(next);
        }
      })
    );
  }

  deleteSupplier(id: number): Observable<void> {
    return this.http.delete<void>(`${this.suppliersUrl}/${id}`).pipe(
      tap(() => {
        const current = this.suppliersSubject.getValue();
        this.suppliersSubject.next(current.filter(s => s.id !== id));
      })
    );
  }
}
