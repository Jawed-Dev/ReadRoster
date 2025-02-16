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

    public String searchByTitle(BooksDto booksDto) {
        //List<Books> books = this.booksRepository.findById(1);
        String jsonBooks = this.googleBooksService.searchBooksByTitle(booksDto.getTitle());
        System.out.println(jsonBooks);
        return jsonBooks;
        //BooksResponse.success(null);
    }
}
