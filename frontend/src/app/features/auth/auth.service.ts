import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { LoginPayload, AuthDto } from './auth.model';
import { environment } from '@env/environment';


@Injectable({
  providedIn: 'root' 
})
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
        this.isAuthenticated$.next(response);
      },
      error: (error) => {
        console.error('Auth check error:', error);
        this.isAuthenticated$.next(false);
      }
    });
  }

  getCurrentUser(): Observable<AuthDto> {
    return this.http.get<AuthDto>(`${this.baseUrl}/user/data`, {
      withCredentials: true
    }).pipe(
      tap(response => {
        this.currentUserSubject.next(response);
        console.log('Current user:', response);
      })
    );
  }

  isAuthenticated(): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/isAuth`, {
      withCredentials: true 
    });
  }

  login(credentials: LoginPayload): Observable<AuthDto> {
    return this.http.post<AuthDto>(`${this.baseUrl}/login`, credentials, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      tap(response => {
        if (response) {
          console.log('Login successful, setting isAuthenticated$ to true');
          this.isAuthenticated$.next(true);
          this.getCurrentUser().subscribe(); 
        }
      })
    );
  }

  logout(): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/logout`, {}, {
      withCredentials: true
    }).pipe(
      tap(() => {
        this.isAuthenticated$.next(false);
      })
    );
  }  
}