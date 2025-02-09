package com.readroster.backend.books;

import java.util.Optional;

public interface BooksRepository {
    Optional<Books> findById(Integer id);
}
