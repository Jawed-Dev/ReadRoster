import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '@env/environment';
import { BooksDto, BooksResponse } from '@features/books/books.model';
import { BooksService } from '@features/books/books.service';
import { InputComponent } from '@shared/components/input';
import { BehaviorSubject } from 'rxjs';

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
  books: any[] = [];
  searchValue: string = '';
  isLoading: boolean = false;
  private apiUrl = environment.apiUrlAuth
  private booksSubject = new BehaviorSubject<BooksDto[]>([]);

  constructor(private booksService: BooksService, private http: HttpClient) {
    this.books = this.booksService.getBooks();
  }

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.http.post<BooksResponse<String>>(`${this.apiUrl}/search`, {})
      .subscribe({
        next: (response) => {
          console.log(response);
          const parsedData = JSON.parse(response.data); 
          this.booksSubject.next(parsedData);
        },
        error: (error) => {
          console.error('Erreur lors du chargement des livres:', error);
          this.booksSubject.next([]);
        }
      });
  }

  onSearch() {
    if (this.searchValue.trim()) {
      this.isLoading = true;
      this.booksService.searchBooks(this.searchValue).subscribe({
        next: (response) => {
          this.books = response.data;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erreur lors de la recherche:', error);
          this.isLoading = false;
        }
      });
    }
  }

  
}