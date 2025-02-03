import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BooksService } from './services/books.service';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';

@NgModule({
  imports: [   
    CommonModule,
    FormsModule,
    DashboardPageComponent,
  ],
  providers: [
    BooksService
  ]
})
export class BooksModule { }