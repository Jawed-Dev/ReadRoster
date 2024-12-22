import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginCredentials } from './auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/api'; // Assurez-vous que le port est correct

  constructor(private http: HttpClient) {}

  login(credentials: LoginCredentials): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/auth/login`, credentials);
  }
}