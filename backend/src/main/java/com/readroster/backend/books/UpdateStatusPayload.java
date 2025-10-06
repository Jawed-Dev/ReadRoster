package com.readroster.backend.books;

import java.util.List;
import java.util.Map;

public class UpdateStatusPayload {
    private String idGoogleBook;
    private List<Map<String, Object>> status;

    public UpdateStatusPayload() {}

    public UpdateStatusPayload(String idGoogleBook, List<Map<String, Object>> status) {
        this.idGoogleBook = idGoogleBook;
        this.status = status;
    }

    public String getIdGoogleBook() {
        return idGoogleBook;
    }

    public void setIdGoogleBook(String idGoogleBook) {
        this.idGoogleBook = idGoogleBook;
    }

    public List<Map<String, Object>> getStatus() {
        return status;
    }

    public void setStatus(List<Map<String, Object>> status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "UpdateStatusPayload{" +
                "idGoogleBook='" + idGoogleBook + '\'' +
                ", status=" + status +
                '}';
    }
}