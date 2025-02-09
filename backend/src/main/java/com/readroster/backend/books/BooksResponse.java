package com.readroster.backend.books;

import com.readroster.backend.auth.AuthResponse;

public class BooksResponse<T> {
    private final boolean success;
    private final String errorMessage;
    private final T data;

    private BooksResponse(T data, boolean success, String errorMessage) {
        this.success = success;
        this.errorMessage = errorMessage;
        this.data = data;
    }

    public static <T> BooksResponse<T> success(T data) {
        return new BooksResponse<>(data, true, null);
    }

    public static <T> BooksResponse<T> error(String message) {
        return new BooksResponse<>(null, false, message);
    }

    public boolean isSuccess() {
        return success;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public T getData() {
        return data;
    }
}

