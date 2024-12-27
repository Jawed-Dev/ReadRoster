package com.readroster.backend.auth;

public class AuthResponse<T> {
    private final boolean success;
    private final String errorMessage;
    private final T data;

    private AuthResponse(T data, boolean success, String errorMessage) {
        this.success = success;
        this.errorMessage = errorMessage;
        this.data = data;
    }

    public static <T> AuthResponse<T> success(T data) {
        return new AuthResponse<>(data, true, null);
    }

    public static <T> AuthResponse<T> error(String message) {
        return new AuthResponse<>(null, false, message);
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
