package com.readroster.backend.books;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/books")
public class BooksController {
    private final BooksService booksService;

    BooksController(BooksService booksService) {
        this.booksService = booksService;
    }

    @PostMapping("search")
        public ResponseEntity<String> searchByTitle(@RequestBody SearchDto searchDto) {
        BooksResponse<String> booksResponse = this.booksService.searchByTitle(searchDto);
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(booksResponse.getData());
    }

}
