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