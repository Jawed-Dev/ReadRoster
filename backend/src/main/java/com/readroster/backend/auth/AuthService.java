package com.readroster.backend.auth;
import com.readroster.backend.user.User;
import com.readroster.backend.user.UserDto;
import com.readroster.backend.user.UserResponse;
import com.readroster.backend.user.UserService;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserService userService;

    public AuthService(UserService userService) {
        this.userService = userService;
    }

    public AuthResponse<UserDto> login(LoginDto loginDto) {
        try {
            UserResponse<User> userResponse = this.userService.findByEmail(loginDto.getEmail());
            if(!userResponse.isSuccess()) {
                return AuthResponse.error("Error");
            }

            User user = userResponse.getData();

            if(!loginDto.getPassword().equals(user.getPassword())) {
                return AuthResponse.error("Error");
            }

            UserDto userDto = AuthMapper.toDto(user);
            return AuthResponse.success(userDto);
        }
        catch (Exception e) {
            return AuthResponse.error("Error");
        }
    }
}
