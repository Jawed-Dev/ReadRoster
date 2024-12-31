package com.readroster.backend.auth;
import com.readroster.backend.user.User;
import org.springframework.stereotype.Component;

@Component
public class AuthMapper {
    public AuthDto toDto(User user) {
        AuthDto authDto = new AuthDto();
        authDto.setEmail(user.getEmail());
        authDto.setFirstName(user.getFirstName());
        authDto.setLastName(user.getLastName());
        return authDto;
    }
}