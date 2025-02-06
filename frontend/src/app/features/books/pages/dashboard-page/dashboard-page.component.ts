import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BooksModule } from '@features/books/books.module';
import { BooksService } from '@features/books/books.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BooksModule
  ]
})

export class DashboardPageComponent {
  books: any[] = [];

  constructor(private booksService: BooksService) {
    this.books = this.booksService.getBooks();
  }
}