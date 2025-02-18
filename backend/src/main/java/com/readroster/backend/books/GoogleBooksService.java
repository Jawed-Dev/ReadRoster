package com.readroster.backend.books;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class GoogleBooksService {
    private final WebClient webClient;
    private static final String GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes";

    public GoogleBooksService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder
                .baseUrl(GOOGLE_BOOKS_API_URL)
                .build();
    }

    public String searchBooksByTitle(String title) {
        try {
            return webClient
                .get()
                .uri(uriBuilder -> uriBuilder
                        .queryParam("q", title)
                        .queryParam("maxResults", "20")
                        .build())
                .retrieve()
                .bodyToMono(String.class)
                .block();
        }

        catch (Exception e) {
            System.err.println("Erreur inattendue: " + e.getMessage());
            throw new RuntimeException("Erreur lors de la recherche de livres", e);
        }
    }
}
