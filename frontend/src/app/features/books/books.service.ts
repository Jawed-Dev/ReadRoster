import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, Observable, tap, throwError } from "rxjs";
import { GoogleBooksDto, SearchPayload, UpdateStatusPayload, BooksDto } from "./books.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "@env/environment";

@Injectable()
export class BooksService {
    private apiUrl = environment.apiUrlBooks;
    private googleBookSubject = new BehaviorSubject<GoogleBooksDto[]>([]);
    public googleBook$ = this.googleBookSubject.asObservable();  

    private bookSubject = new BehaviorSubject<BooksDto[]>([]);
    public book$ = this.bookSubject.asObservable();  
    
    constructor(private http: HttpClient) {}

    searchBooks(title: string): Observable<GoogleBooksDto[]> {  
        const searchPayload: SearchPayload = { title };
        return this.http.post<GoogleBooksDto[]>(`${this.apiUrl}/search`, searchPayload)
            .pipe(
                tap(response => {  
                    console.log('Réponse de la recherche de livres:', response);
                    if (response) this.googleBookSubject.next(response);
                }),
                catchError(error => {
                    console.error('Erreur lors du chargement des livres:', error);
                    this.googleBookSubject.next([]);
                    return throwError(() => error); 
                })
            );
    }

    updateStatusBook(idGoogleBook: string, allStatuses: { id: number; label: string; checked: boolean; }[]): any {  
        const updateStatusPayload: UpdateStatusPayload = { idGoogleBook, status: allStatuses };
        return this.http.post<BooksDto[]>(`${this.apiUrl}/updateStatus`, updateStatusPayload)
            .pipe(
                tap(response => {  
                    console.log('Réponse de la mise à jour des status du livre:', response);
                    if (response) this.bookSubject.next(response);
                }),
                catchError(error => {
                    console.error('Erreur lors du chargement des livres:', error);
                    this.bookSubject.next([]);
                    return throwError(() => error); 
                })
            );
    }

    
}