import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '@env/environment';
import { BooksDto, BooksResponse, SearchDto } from '@features/books/books.model';
import { BooksService } from '@features/books/books.service';
import { InputComponent } from '@shared/components/input';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  standalone: true,
  providers: [BooksService],
  imports: [
    CommonModule,
    FormsModule,
    InputComponent
  ]
})

export class DashboardPageComponent {
  books$: Observable<any[]>;  
  isLoading: boolean = false;
  searchDto: SearchDto = {
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