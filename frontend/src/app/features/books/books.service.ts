import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, Observable, tap, throwError } from "rxjs";
import { BooksDto, BooksResponse, SearchDto } from "./books.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "@env/environment";

@Injectable()
export class BooksService {
    private booksSubject = new BehaviorSubject<any[]>([]);
    public books$ = this.booksSubject.asObservable();  
    private apiUrl = environment.apiUrlBooks;
    constructor(private http: HttpClient) {}

    searchBooks(searchDto: SearchDto): Observable<any> {  
        return this.http.post<any>(`${this.apiUrl}/search`, searchDto)
            .pipe(
                tap(response => {  
                    if (response.items) this.booksSubject.next(response.items);
                }),
                catchError(error => {
                    console.error('Erreur lors du chargement des livres:', error);
                    this.booksSubject.next([]);
                    return throwError(() => error); 
                })
            );
    }

    
}