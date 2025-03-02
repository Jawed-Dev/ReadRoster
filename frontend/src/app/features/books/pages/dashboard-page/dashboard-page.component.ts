import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchPayload } from '@features/books/books.model';
import { BooksService } from '@features/books/books.service';
import { SearchedBooksComponent } from '@features/books/components/searched-books/searched-books.component';
import { ButtonComponent } from '@shared/components/button';
import { InputComponent } from '@shared/components/input';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  standalone: true,
  providers: [BooksService],
  imports: [
    CommonModule,
    FormsModule,
    InputComponent,
    ButtonComponent,
    SearchedBooksComponent
  ]
})

export class DashboardPageComponent {
  searchDto: SearchPayload = {
    title: ''
  };

  books$: Observable<any[]>;  
  isLoading: boolean = false;

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