import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, of } from "rxjs";

export class BookStatus {
    id: number;
    label: string;
    checked: boolean;

    constructor(id: number, label: string, checked: boolean = false) {
        this.id = id;
        this.label = label;
        this.checked = checked;
    }
}

interface BookStatusMap {
    [bookId: string]: BookStatus[];
}

@Injectable()
export class BookStatusService {
    private statusSubject = new BehaviorSubject<BookStatusMap>({});
    public bookStatuses$ = this.statusSubject.asObservable();
    
    private defaultStatuses: BookStatus[] = [
        new BookStatus(1, 'Favori'),
        new BookStatus(2, 'Lu'),
        new BookStatus(3, 'A lire'),
        new BookStatus(4, 'En cours de lecture')
    ];

    constructor() {}

    readonly statusOptions = [
        {id: 1, label: 'Favori'},
        {id: 2, label: 'Lu'},
        {id: 3, label: 'A lire'},
        {id: 4, label: 'En cours de lecture'}
    ];

    getBookStatuses(bookId: string): Observable<{id: number, checked: boolean}[]> {
        return of(this.statusOptions.map(option => ({ 
          id: option.id, 
          checked: false 
        })));
    }

    updateBookStatus(bookId: string, statusId: number, checked: boolean): Observable<boolean> {
        console.log(`Livre ${bookId}: statut ${statusId} mis à ${checked}`);
        return of(true); 
    }

    private saveToDatabase(bookId: string, statusId: number, checked: boolean): void {
    }
}