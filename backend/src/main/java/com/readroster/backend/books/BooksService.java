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

    /*public BooksResponse<String> searchByTitle(SearchDto searchDto) {
        try {
            String jsonBooks = this.googleBooksService.searchBooksByTitle(searchDto.getTitle());
            return BooksResponse.success(jsonBooks);
        }
        catch (Exception e) {
            return BooksResponse.error("Erreur sur la recherche de livre");
        }
    }*/

    public BooksResponse<List<GoogleBooksDto>> searchByTitle(SearchPayload searchPayload) {
        try {
            List<GoogleBooksDto> books = googleBooksService.searchBooksByTitle(searchPayload.getTitle());                           // Bloque pour obtenir le résultat
            return BooksResponse.success(books);
        }
        catch (Exception e) {
            return BooksResponse.error("Erreur sur la recherche de livre");
        }
    }

    public void updateStatus(UpdateStatusPayload updateStatusPayload) {
        String testId = "WddYEAAAQBAJ";

        Books book = booksRepository.findByIdGoogleBook(testId)
                .orElseThrow(() -> new RuntimeException("Livre non trouvé"));

        book.updateStatuses(updateStatusPayload.getStatus());
        booksRepository.save(book);
    }
}
