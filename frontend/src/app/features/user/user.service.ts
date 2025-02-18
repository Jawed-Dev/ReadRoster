import { Injectable } from "@angular/core";
import { environment } from '@env/environment';
import { UserDto, UserResponse, RegisterCredentials } from "./user.model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class UserService {
    private baseUrl = environment.apiUrlAuth;

    constructor(private http: HttpClient) { }

    register(credentials: RegisterCredentials): Observable<UserDto> {
        return this.http.post<UserDto>(`${this.baseUrl}/register`, credentials, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        });
    }
    
}