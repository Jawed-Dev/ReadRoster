package com.readroster.backend.books.services;

import com.readroster.backend.books.dto.GoogleBooksDto;
import com.readroster.backend.books.GoogleBooksWrapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import java.util.List;

@Service
public class GoogleBooksService {
    private final WebClient webClient;
    private static final String GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes";

    @Value("${google.books.api.key}")  // ← sur le champ
    private String apiKey;

    public GoogleBooksService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder
                .baseUrl(GOOGLE_BOOKS_API_URL)
                .build();
    }


    public List<GoogleBooksDto> searchBooksByTitle(String title) {
        System.err.println(title);
        return webClient
                .get()
                .uri(uriBuilder -> uriBuilder
                        .queryParam("q", title)
                        .queryParam("maxResults", "5")
                        .queryParam("key", apiKey)
                        .build())
                .retrieve()
                .bodyToMono(GoogleBooksWrapper.class)
                .map(GoogleBooksWrapper::getItems)
                .block();
    }

}
