import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
    selector: 'app-list-books',
    templateUrl: './list-books.component.html',
    standalone: true, 
    imports: [  
        CommonModule,
        FormsModule
    ]   
})

export class ListBooksComponent {

}