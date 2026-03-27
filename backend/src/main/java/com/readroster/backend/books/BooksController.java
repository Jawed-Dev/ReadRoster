package com.readroster.backend.books;
import com.readroster.backend.books.dto.BooksDto;
import com.readroster.backend.books.dto.GoogleBooksDto;
import com.readroster.backend.books.payloads.SearchPayload;
import com.readroster.backend.books.payloads.UpdateStatusPayload;
import com.readroster.backend.books.services.BooksService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.Optional;

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
    public ResponseEntity<String> updateStatus(@RequestBody UpdateStatusPayload updateStatusPayload) {
        System.out.println(updateStatusPayload);
        this.booksService.updateStatus(updateStatusPayload);
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body("test");
    }

    @PostMapping("getStatuses")
    public ResponseEntity<Books> getStatuses(@RequestBody BooksDto.StatusRequestDto request){

        System.out.println("idGoogleBook reçu : '" + request.idGoogleBook() + "'");

        ResponseEntity<Books> test = booksService.getStatus(request.idGoogleBook())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.noContent().build());

        System.out.println("RETOUR getStatuses :" + test);
        return test;
    }

}
