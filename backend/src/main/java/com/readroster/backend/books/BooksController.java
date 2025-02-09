package com.readroster.backend.books;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class BooksController {
    private final BooksService booksService;

    BooksController(BooksService booksService) {
        this.booksService = booksService;
    }

    @PostMapping("search")
    public ResponseEntity<BooksResponse<Books>> searchByTitle() {
        this.booksService.searchByTitle("Tintin");
        return ResponseEntity.ok(null);
    }

}
