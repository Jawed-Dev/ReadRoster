import { Injectable } from "@angular/core";
import { environment } from '@env/environment';
import { UserDto, UserResponse, RegisterCredentials } from "./user.model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private baseUrl = environment.apiUrlAuth;

    constructor(private http: HttpClient) {
        // this.getAuthState();
    }

    register(credentials: RegisterCredentials): Observable<UserResponse<UserDto>> {
        return this.http.post<UserResponse<UserDto>>(`${this.baseUrl}/register`, credentials, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        });
    }
    
}