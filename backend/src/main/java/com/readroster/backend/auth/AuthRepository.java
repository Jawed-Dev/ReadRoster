package com.readroster.backend.auth;

import org.springframework.stereotype.Repository;

@Repository
public class AuthRepository {

    public LoginDto login(LoginDto loginDto) {
        return loginDto;
    }
}
