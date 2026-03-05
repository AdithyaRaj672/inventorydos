import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly DEMO_USERNAME = 'admin';
  private readonly DEMO_PASSWORD = 'admin123';
  private readonly AUTH_KEY = 'inventory_auth';

  isAuthenticated = signal<boolean>(this.checkStoredAuth());

  constructor(private router: Router) {}

  private checkStoredAuth(): boolean {
    return sessionStorage.getItem(this.AUTH_KEY) === 'true';
  }

  login(username: string, password: string): boolean {
    if (username === this.DEMO_USERNAME && password === this.DEMO_PASSWORD) {
      sessionStorage.setItem(this.AUTH_KEY, 'true');
      this.isAuthenticated.set(true);
      return true;
    }
    return false;
  }

  logout(): void {
    sessionStorage.removeItem(this.AUTH_KEY);
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }
}
