import { Injectable } from "@angular/core";

@Injectable()
export class BooksService {


    getBooks() {
        return [
            { title: 'Book 1' },
            { title: 'Book 2' },
            { title: 'Book 3' }
        ];
    }
    
}