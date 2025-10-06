package com.readroster.backend.books;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BooksController {
    private final BooksService booksService;

    BooksController(BooksService booksService) {
        this.booksService = booksService;
    }

    @PostMapping("search")
        public ResponseEntity<List<GoogleBooksDto>> searchByTitle(@RequestBody SearchPayload searchPayload) {
        BooksResponse<List<GoogleBooksDto>> booksResponse = this.booksService.searchByTitle(searchPayload);
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(booksResponse.getData());
    }

    @PostMapping("updateStatus")
    public void updateStatus(@RequestBody UpdateStatusPayload updateStatusPayload) {
        System.out.println(updateStatusPayload);
        this.booksService.updateStatus(updateStatusPayload);
    }

}
