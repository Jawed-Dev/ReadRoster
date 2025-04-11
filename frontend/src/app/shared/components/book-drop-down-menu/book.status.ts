import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";

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

    getBookStatuses(bookId: string): Observable<BookStatus[]> {
        return this.bookStatuses$.pipe(
          map(statusMap => {
            return statusMap[bookId] || 
              this.defaultStatuses.map(status => 
                new BookStatus(status.id, status.label, false)
              );
          })
        );
      }

    updateBookStatus(bookId: string, statusId: number, checked: boolean): void {
        const currentStatusMap = this.statusSubject.getValue();
        const defaultStatuses = this.defaultStatuses.map(status => 
            new BookStatus(status.id, status.label, false)
        );
        let bookStatuses = currentStatusMap[bookId] || [...defaultStatuses];

        const statusIndex = bookStatuses.findIndex(status => status.id === statusId);
        if (statusIndex !== -1) bookStatuses[statusIndex].checked = checked;
        const newStatusMap = {
            ...currentStatusMap,
            [bookId]: bookStatuses
        };
        this.statusSubject.next(newStatusMap);
        
        // Ici, ajouter une sauvegarde en base de données
        // this.saveToDatabase(bookId, statusId, checked);
    }

    // Méthode pour sauvegarder dans la base de données (à implémenter)
    private saveToDatabase(bookId: string, statusId: number, checked: boolean): void {
        // Appel API pour sauvegarder les changements
        // Exemple: this.http.post('/api/books/status', { bookId, statusId, checked });
    }
}