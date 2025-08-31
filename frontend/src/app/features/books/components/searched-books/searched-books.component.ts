import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { GoogleBooksDto, SearchPayload } from "@features/books/books.model";
import { BooksService } from "@features/books/books.service";
import { DropDownMenuComponent } from "@shared/components/book-drop-down-menu/book.drop-down-menu";
import { Observable } from "rxjs";

@Component({
    selector: 'app-list-books-searched',
    templateUrl: './searched-books.component.html',
    standalone: true, 
    imports: [  
        CommonModule,
        FormsModule,
        DropDownMenuComponent
    ]   
})

export class SearchedBooksComponent {
    books$: Observable<any[]>; // changer le type
    isLoading: boolean = false;
    searchPayload: SearchPayload = {
      title: ''
    };
    
    constructor(private booksService: BooksService) {
      this.books$ = this.booksService.books$;  
    }

    onBookStatusChanged(book: any, allStatuses: {id: number, label: string, checked: boolean}[]): void {
        console.log(`Livre: ${book.volumeInfo.title}`);
        console.log('Statuts mis à jour:', allStatuses);
        
        // Exemple : vérifier quels statuts sont cochés
        const checkedStatuses = allStatuses.filter(status => status.checked);
        console.log('Statuts cochés:', checkedStatuses.map(s => s.label));
        // Ici tu peux sauvegarder en base, mettre à jour un service, etc.
    }
  
    loadBooks() {
      this.isLoading = true;
      this.booksService.searchBooks(this.searchPayload).subscribe({
        next: () => {
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
    }
}