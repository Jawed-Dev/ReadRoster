import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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

export class DashboardPageComponent{
  private booksSubject = new BehaviorSubject<any[]>([]);
  books$ = this.booksSubject.asObservable();  
  searchValue: string = '';
  isLoading: boolean = false;
  private apiUrl = environment.apiUrlAuth;

  constructor(private booksService: BooksService, private http: HttpClient) {}

  loadBooks() {
    this.http.post<any>(`${this.apiUrl}/search`, {
      title: this.searchValue
    })
      .subscribe({
        next: (response) => {
          console.log('Response type:', typeof response);
          console.log('Response structure:', response);
          alert(this.searchValue);
          if (response.items) {
            this.booksSubject.next(response.items);
          } 
        },
        error: (error) => {
          console.error('Erreur lors du chargement des livres:', error);
          this.booksSubject.next([]);
        }
      });
  }

  // onSearch() {
  //   if (this.searchValue.trim()) {
  //     this.isLoading = true;
  //     this.booksService.searchBooks(this.searchValue).subscribe({
  //       next: (response) => {
  //         this.isLoading = false;
  //         this.booksSubject.next(response.data);
  //       },
  //       error: (error) => {
  //         console.error('Erreur lors de la recherche:', error);
  //         this.isLoading = false;
  //       }
  //     });
  //   }
  // }
}