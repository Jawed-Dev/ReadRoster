import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BooksDto, BooksResponse } from "./books.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "@env/environment";

@Injectable()
export class BooksService {
    private apiUrl = environment.apiUrlAuth
    constructor(private http: HttpClient) {}


    getBooks() {
        return [
            { title: 'Book 1' },
            { title: 'Book 2' },
            { title: 'Book 3' }
        ];
    }

    searchBooks(title: string): Observable<BooksResponse<BooksDto[]>> {
        return this.http.post<BooksResponse<BooksDto[]>>(`${this.apiUrl}/search`, { title });
      }


    
}