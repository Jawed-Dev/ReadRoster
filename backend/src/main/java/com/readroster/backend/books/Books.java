package com.readroster.backend.books;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "books")
public class Books {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int idGoogleBook;
    private boolean favory;
    private boolean read;
    private boolean toRead;
    private boolean reading;

    public void updateStatuses(List<Map<String, Object>> statuses) {
        for (Map<String, Object> status : statuses) {
            int id = (Integer) status.get("id");
            boolean checked = (Boolean) status.get("checked");

            switch (id) {
                case 1: this.read = checked; break;
                case 2: this.toRead = checked; break;
                case 3: this.reading = checked; break;
                case 4: this.favory = checked; break;
            }
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getIdGoogleBook() {
        return idGoogleBook;
    }

    public void setIdGoogleBook(int idGoogleBook) {
        this.idGoogleBook = idGoogleBook;
    }

    public boolean isFavory() {
        return favory;
    }

    public void setFavory(boolean favory) {
        this.favory = favory;
    }

    public boolean isRead() {
        return read;
    }

    public void setRead(boolean read) {
        this.read = read;
    }

    public boolean isToRead() {
        return toRead;
    }

    public void setToRead(boolean toRead) {
        this.toRead = toRead;
    }

    public boolean isReading() {
        return reading;
    }

    public void setReading(boolean reading) {
        this.reading = reading;
    }
}
