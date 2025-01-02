import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { AuthResponse, LoginCredentials, UserResponse } from '../models/auth.model';
import { apiEnvironment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = apiEnvironment.apiUrl; 
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  
  constructor(private http: HttpClient) {
    this.getStateSession();
  }

  login(credentials: LoginCredentials): Observable<AuthResponse<UserResponse>> {
    console.log('Sending credentials:', credentials);
    return this.http.post<AuthResponse<UserResponse>>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap({
        next: (response) => {
          console.log('Login successful:', response);
          this.isAuthenticatedSubject.next(true);
        },
        error: (error) => {
          console.error('Login failed:', error);
        }
      })
    );
  }

  logout(): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/auth/logout`, {}).pipe(
      tap(() => {
        this.isAuthenticatedSubject.next(false);
      })
    );
  }

  getStateSession() {
    this.http.get(`${this.apiUrl}/auth/isAuth`, {
      withCredentials: true
    }).subscribe({
      next: () => this.isAuthenticatedSubject.next(true),
      error: () => this.isAuthenticatedSubject.next(false)
    });
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  
}