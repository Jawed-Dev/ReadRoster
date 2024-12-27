package com.readroster.backend.auth;
import com.readroster.backend.user.User;
import com.readroster.backend.user.UserDto;

public class AuthMapper {
    public static UserDto toDto(User user) {  // Notez le nom AuthUserDto
        UserDto userDto = new UserDto();
        userDto.setEmail(user.getEmail());
        userDto.setFirstName(user.getFirstName());
        userDto.setLastName(user.getLastName());
        return userDto;
    }
}