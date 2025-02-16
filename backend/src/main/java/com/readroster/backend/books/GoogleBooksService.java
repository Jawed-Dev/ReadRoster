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
        if (title == null || title.trim().isEmpty()) {
            throw new IllegalArgumentException("Le titre de recherche ne peut pas être vide");
        }

        try {
            return webClient
                    .get()
                    .uri(uriBuilder -> uriBuilder
                            .queryParam("q", "Naruto")
                            .queryParam("maxResults", "40")
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
