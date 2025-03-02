import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { GoogleBooksDto, SearchPayload } from "@features/books/books.model";
import { BooksService } from "@features/books/books.service";
import { Observable } from "rxjs";

@Component({
    selector: 'app-list-books-searched',
    templateUrl: './list-books.component.html',
    standalone: true, 
    imports: [  
        CommonModule,
        FormsModule
    ]   
})

export class ListBooksComponent {
    books$: Observable<any[]>; 
    isLoading: boolean = false;
    searchDto: SearchPayload = {
      title: ''
    };
    
    constructor(private booksService: BooksService) {
      this.books$ = this.booksService.books$;  
    }
  
    loadBooks() {
      this.isLoading = true;
      this.booksService.searchBooks(this.searchDto).subscribe({
        next: () => {
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
    }
}