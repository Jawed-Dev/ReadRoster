package com.readroster.backend.books;
import com.readroster.backend.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
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
    private String idGoogleBook;



    @ManyToOne
    @JoinColumn(name = "user_id")
    private User userId;

    private boolean favory;
    private boolean isRead;
    private boolean toRead;
    private boolean reading;

    public void updateStatuses(List<Map<String, Object>> statuses) {
        for (Map<String, Object> status : statuses) {
            int id = (Integer) status.get("id");
            boolean checked = (Boolean) status.get("checked");

            switch (id) {
                case 1: this.favory = checked; break;
                case 2: this.isRead = checked; break;
                case 3: this.toRead = checked; break;
                case 4: this.reading = checked; break;
            }
        }
    }

    public List<Map<String, Object>> getStatuses() {
        List<Map<String, Object>> statuses = new ArrayList<>();

        statuses.add(Map.of("id", 1, "checked", this.favory));
        statuses.add(Map.of("id", 2, "checked", this.isRead));
        statuses.add(Map.of("id", 3, "checked", this.toRead));
        statuses.add(Map.of("id", 4, "checked", this.reading));

        return statuses;
    }


    public User getUserId() {
        return userId;
    }

    public void setUserId(User userId) {
        this.userId = userId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIdGoogleBook() {
        return idGoogleBook;
    }

    public void setIdGoogleBook(String idGoogleBook) {
        this.idGoogleBook = idGoogleBook;
    }

    public boolean isFavory() {
        return favory;
    }

    public void setFavory(boolean favory) {
        this.favory = favory;
    }

    public boolean isRead() {
        return isRead;
    }

    public void setRead(boolean read) {
        this.isRead = read;
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
