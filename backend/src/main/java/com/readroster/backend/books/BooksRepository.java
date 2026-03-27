package com.readroster.backend.books;
import com.readroster.backend.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.awt.print.Book;
import java.util.Optional;

@Repository
public interface BooksRepository extends JpaRepository<Books, Long> {
    Optional<Books> findByIdGoogleBook(String idGoogleBook);
    Optional<Books> findByUserId(User userId);
    Optional<Books> findByUserIdAndIdGoogleBook(User userId, String idGoogleBook);
}
