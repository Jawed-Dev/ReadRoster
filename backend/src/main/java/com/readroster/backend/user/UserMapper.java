package com.readroster.backend.user;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public UserDto userToDto(User user) {
        UserDto dto = new UserDto();
        dto.setEmail(user.getEmail());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        return dto;
    }

    public User registerPayloadToUser(RegisterPayload registerPayload) {
        User user = new User();
        user.setFirstName(registerPayload.getFirstName());
        user.setLastName(registerPayload.getLastName());
        user.setEmail(registerPayload.getEmail());
        user.setPassword(registerPayload.getPassword());
        return user;
    }
}
