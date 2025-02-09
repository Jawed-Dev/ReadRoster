import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { AuthResponse, LoginCredentials, AuthDto } from './auth.model';
import { environment } from '@env/environment';


@Injectable()
export class AuthService {
  private baseUrl = environment.apiUrlAuth;
  isAuthenticated$ = new BehaviorSubject<boolean>(false);

  private currentUserSubject = new BehaviorSubject<AuthDto | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getAuthState();
  }

  private getAuthState() {
    this.isAuthenticated().subscribe({
      next: (response) => {
        console.log('Auth check response:', response);
        this.isAuthenticated$.next(response.data);
      },
      error: (error) => {
        console.error('Auth check error:', error);
        this.isAuthenticated$.next(false);
      }
    });
  }

  getCurrentUser(): Observable<AuthResponse<AuthDto>> {
    return this.http.get<AuthResponse<AuthDto>>(`${this.baseUrl}/user/data`, {
      withCredentials: true
    }).pipe(
      tap(response => {
        this.currentUserSubject.next(response.data);
        console.log('Current user:', response.data);
      })
    );
  }

  login(credentials: LoginCredentials): Observable<AuthResponse<AuthDto>> {
    return this.http.post<AuthResponse<AuthDto>>(`${this.baseUrl}/login`, credentials, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      tap(response => {
        if (response.success) {
          this.isAuthenticated$.next(true);
          this.getCurrentUser().subscribe(); 
        }
      })
    );
  }

  isAuthenticated(): Observable<AuthResponse<boolean>> {
    this.getCurrentUser().subscribe(); 
    return this.http.get<AuthResponse<boolean>>(`${this.baseUrl}/isAuth`, {
      withCredentials: true
    });
  }

  logout(): Observable<AuthResponse<void>> {
    return this.http.post<AuthResponse<void>>(`${this.baseUrl}/logout`, {}, {
      withCredentials: true
    }).pipe(
      tap(() => {
        this.isAuthenticated$.next(false);
      })
    );
  }
}