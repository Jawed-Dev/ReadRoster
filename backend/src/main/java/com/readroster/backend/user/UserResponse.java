package com.readroster.backend.user;

public class UserResponse<T> {
    private final boolean success;
    private final String message;
    private final T data;

    private UserResponse(T data, boolean success, String message) {
        this.data = data;
        this.success = success;
        this.message = message;
    }

    public static <T> UserResponse<T> success(T data) {
        return new UserResponse<>(data, true, null);
    }

    public static <T> UserResponse<T> error(String message) {
        return new UserResponse<>(null, false, message);
    }

    public boolean isSuccess() {
        return success;
    }

    public String getMessage() {
        return message;
    }

    public T getData() {
        return data;
    }
}