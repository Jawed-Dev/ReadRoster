package com.readroster.backend.books.services;
import com.readroster.backend.books.Books;
import com.readroster.backend.books.BooksRepository;
import com.readroster.backend.books.BooksResponse;
import com.readroster.backend.books.dto.GoogleBooksDto;
import com.readroster.backend.books.payloads.SearchPayload;
import com.readroster.backend.books.payloads.UpdateStatusPayload;
import com.readroster.backend.user.User;
import com.readroster.backend.user.UserService;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class BooksService {
    public final BooksRepository booksRepository;
    public final GoogleBooksService googleBooksService;
    public UserService userService;

    BooksService(BooksRepository booksRepository, GoogleBooksService googleBooksService, UserService userService) {
        this.booksRepository = booksRepository;
        this.googleBooksService = googleBooksService;
        this.userService = userService;
    }

    public BooksResponse<List<GoogleBooksDto>> searchByTitle(SearchPayload searchPayload) {
        try {
            List<GoogleBooksDto> books = googleBooksService.searchBooksByTitle(searchPayload.getTitle());
            return BooksResponse.success(books);
        }
        catch (Exception e) {
            return BooksResponse.error("Erreur sur la recherche de livre");
        }
    }

    public void addBook(String idGoogleBook) {
        User userData = userService.getCurrentUser();
        Optional<Books> check = booksRepository.findByUserIdAndIdGoogleBook(userData,idGoogleBook);
        if (check.isPresent()) {
            throw new RuntimeException ("Ce livre est déjà ajouté par l'utilisateur");
        }

        Books book = new Books();
        book.setUserId(userData);
        book.setIdGoogleBook(idGoogleBook);
        booksRepository.save(book);
    }

    public boolean isUserAddedBook(String idGoogleBook) {
        User userData = userService.getCurrentUser();
        Optional<Books> books = booksRepository.findByUserIdAndIdGoogleBook(userData, idGoogleBook);
        return books.isPresent();
    }

    public void updateStatus(UpdateStatusPayload updateStatusPayload) {
        System.out.println(updateStatusPayload);
        User userData = userService.getCurrentUser();
        String idGoogleBook = updateStatusPayload.getIdGoogleBook();

        Books book = booksRepository.findByUserIdAndIdGoogleBook(userData, idGoogleBook)
                .orElseGet(() -> {
                    Books newBook = new Books();
                    newBook.setUserId(userData);
                    newBook.setIdGoogleBook(idGoogleBook);
                    return newBook;
                });
        book.updateStatuses(updateStatusPayload.getStatus());
        booksRepository.save(book);
    }

    public Optional<Books> getStatus(String idGoogleBook) {
        User userData = userService.getCurrentUser();
        return booksRepository.findByUserIdAndIdGoogleBook(userData, idGoogleBook);
    }
}
