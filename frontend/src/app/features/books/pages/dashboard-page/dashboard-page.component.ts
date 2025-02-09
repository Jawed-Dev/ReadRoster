import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BooksService } from '@features/books/books.service';
import { InputComponent } from '@shared/components/input';

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

  constructor(private booksService: BooksService) {
    this.books = this.booksService.getBooks();
  }
}