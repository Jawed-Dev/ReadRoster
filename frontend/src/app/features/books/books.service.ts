import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, Observable, tap, throwError } from "rxjs";
import { GoogleBooksDto, SearchPayload } from "./books.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "@env/environment";

@Injectable()
export class BooksService {
    private booksSubject = new BehaviorSubject<GoogleBooksDto[]>([]);
    public books$ = this.booksSubject.asObservable();  
    private apiUrl = environment.apiUrlBooks;
    constructor(private http: HttpClient) {}

    searchBooks(SearchPayload: SearchPayload): Observable<any> {  
        return this.http.post<GoogleBooksDto[]>(`${this.apiUrl}/search`, SearchPayload)
            .pipe(
                tap(response => {  
                    console.log('Réponse de la recherche de livres:', response);
                    if (response) this.booksSubject.next(response);
                }),
                catchError(error => {
                    console.error('Erreur lors du chargement des livres:', error);
                    this.booksSubject.next([]);
                    return throwError(() => error); 
                })
            );
    }

    
}