package com.readroster.backend.books.dto;

public class BooksDto {
    private String title;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public record StatusRequestDto(String idGoogleBook) {}
}
