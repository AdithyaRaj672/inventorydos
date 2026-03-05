import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient);
  private ordersUrl = 'http://localhost:3000/orders';

  private ordersSubject = new BehaviorSubject<Order[]>([]);
  orders$ = this.ordersSubject.asObservable();

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.ordersUrl).pipe(
      tap(orders => this.ordersSubject.next(orders))
    );
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.ordersUrl}/${id}`);
  }

  addOrder(order: Order): Observable<Order[]> {
    return this.http.post<Order>(this.ordersUrl, order).pipe(
      switchMap(() => this.getOrders())
    );
  }

  updateOrder(id: number, order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.ordersUrl}/${id}`, order).pipe(
      tap(updated => {
        const current = this.ordersSubject.getValue();
        const index = current.findIndex(o => o.id === id);
        if (index !== -1) {
          const next = [...current];
          next[index] = updated;
          this.ordersSubject.next(next);
        }
      })
    );
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.ordersUrl}/${id}`).pipe(
      tap(() => {
        const current = this.ordersSubject.getValue();
        this.ordersSubject.next(current.filter(o => o.id !== id));
      })
    );
  }
}
