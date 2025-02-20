package com.readroster.backend.books;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class GoogleBooksWrapper {
    private List<GoogleBooksDto> items;

    public List<GoogleBooksDto> getItems() {
        return items;
    }

    public void setItems(List<GoogleBooksDto> items) {
        this.items = items;
    }
}