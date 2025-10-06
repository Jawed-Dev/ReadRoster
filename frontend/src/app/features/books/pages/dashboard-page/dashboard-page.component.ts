import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@features/auth/auth.service';
import { SearchPayload } from '@features/books/books.model';
import { BooksService } from '@features/books/books.service';
import { SearchedBooksComponent } from '@features/books/components/searched-books/searched-books.component';
import { ButtonComponent } from '@shared/components/button';
import { InputComponent } from '@shared/components/input';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AppHeaderComponent } from '@core/header/app.header';

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
    SearchedBooksComponent,
    AppHeaderComponent
  ]
})

export class DashboardPageComponent {
  searchDto: SearchPayload = {
    title: ''
  };

  books$: Observable<any[]>;  
  isLoading: boolean = false;

  constructor(private booksService: BooksService, private authService: AuthService, private router: Router) {
    this.books$ = this.booksService.googleBook$;  
  }

  loadBooks() {
    this.isLoading = true;
    this.booksService.searchBooks(this.searchDto.title).subscribe({
      next: () => {
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }
}