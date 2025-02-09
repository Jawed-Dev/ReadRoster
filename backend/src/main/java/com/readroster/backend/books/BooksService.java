package com.readroster.backend.books;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BooksService {
    public final BooksRepository booksRepository;
    public final GoogleBooksService googleBooksService;

    BooksService(BooksRepository booksRepository, GoogleBooksService googleBooksService) {
        this.booksRepository = booksRepository;
        this.googleBooksService = googleBooksService;
    }

    public void searchByTitle(String title) {
        //List<Books> books = this.booksRepository.findById(1);
        String jsonBooks = this.googleBooksService.searchBooksByTitle(title);
        System.out.println(jsonBooks);

        //BooksResponse.success(null);
    }
}
