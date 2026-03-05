import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="login-container">
      <mat-card class="login-card">
        <mat-card-header>
          <mat-card-title>
            <span class="emoji-icon">📦</span>
            Inventory Management System
          </mat-card-title>
          <mat-card-subtitle>Please sign in to continue</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <form #loginForm="ngForm" (ngSubmit)="onSubmit(loginForm.valid)" class="login-form">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Username</mat-label>
              <input matInput
                     name="username"
                     [(ngModel)]="username"
                     required
                     #usernameField="ngModel"
                     placeholder="Enter username">
              <span matSuffix class="emoji-icon field-suffix">👤</span>
              <mat-error *ngIf="usernameField.invalid && usernameField.touched">
                Username is required
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Password</mat-label>
              <input matInput
                     [type]="hidePassword ? 'password' : 'text'"
                     name="password"
                     [(ngModel)]="password"
                     required
                     #passwordField="ngModel"
                     placeholder="Enter password">
              <button mat-icon-button matSuffix type="button" (click)="hidePassword = !hidePassword">
                <span class="emoji-icon">{{ hidePassword ? '🙈' : '👁️' }}</span>
              </button>
              <mat-error *ngIf="passwordField.invalid && passwordField.touched">
                Password is required
              </mat-error>
            </mat-form-field>

            <div *ngIf="loginError" class="error-message">
              <span class="emoji-icon">❌</span>
              Invalid username or password
            </div>

            <button mat-raised-button color="primary" type="submit" class="full-width login-btn">
              <span class="emoji-icon">🔑</span> Sign In
            </button>
          </form>

          <p class="demo-hint">
            <span class="emoji-icon">ℹ️</span>
            Demo credentials: <strong>admin</strong> / <strong>admin123</strong>
          </p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 16px;
    }
    .login-card {
      width: 100%;
      max-width: 420px;
    }
    .login-form {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 16px 0;
    }
    .full-width { width: 100%; }
    .login-btn { margin-top: 8px; }
    .error-message {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #f44336;
      font-size: 14px;
    }
    .demo-hint {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 13px;
      color: #666;
      margin-top: 16px;
    }
    .field-suffix {
      font-size: 16px;
      margin-right: 4px;
    }
    mat-card-title {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  `]
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  username = '';
  password = '';
  hidePassword = true;
  loginError = false;

  onSubmit(formValid: boolean | null): void {
    if (!formValid) return;
    const success = this.authService.login(this.username, this.password);
    if (success) {
      this.loginError = false;
      this.router.navigate(['/dashboard']);
    } else {
      this.loginError = true;
    }
  }
}
