package com.readroster.backend.user;

public class UserResponse<T> {
    private T data;
    private String error;
    private ServiceStatus status;

    public enum ServiceStatus {
        SUCCESS,
        NOT_FOUND,
        INVALID_INPUT,
        ERROR
    }

    public static <T> UserResponse<T> success(T data) {
        return new UserResponse<>(data);
    }

    public static <T> UserResponse<T> error(String message) {
        return new UserResponse<>(ServiceStatus.ERROR, message);
    }

    private UserResponse(T data) {
        this.data = data;
        this.status = ServiceStatus.SUCCESS;
    }

    private UserResponse(ServiceStatus status, String error) {
        this.status = status;
        this.error = error;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public ServiceStatus getStatus() {
        return status;
    }

    public void setStatus(ServiceStatus status) {
        this.status = status;
    }


}