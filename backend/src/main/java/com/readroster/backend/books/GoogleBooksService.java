package com.readroster.backend.books;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class GoogleBooksService {
    private final WebClient webClient;
    private final String GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes";

    public GoogleBooksService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder
                .baseUrl("https://www.googleapis.com/books/v1/volumes")
                .build();
    }

    public String searchBooksByTitle(String title) {
        return webClient
                .get()
                .uri(uriBuilder -> uriBuilder
                        .queryParam("q", title)
                        .build())
                .retrieve()
                .bodyToMono(String.class)  // Convertit la réponse en String
                .block();  // Attend et retourne le résultat
    }
}
