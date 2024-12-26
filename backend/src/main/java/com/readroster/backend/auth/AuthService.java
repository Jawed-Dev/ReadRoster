package com.readroster.backend.auth;
import com.readroster.backend.user.User;
import com.readroster.backend.user.UserResponse;
import com.readroster.backend.user.UserService;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final AuthRepository authRepository;
    private final UserService userService;

    public AuthService(AuthRepository authRepository, UserService userService) {
        this.authRepository = authRepository;
        this.userService = userService;
    }

    public AuthResponse<User> login(LoginDto loginDto) {
        try {
            UserResponse<User> userResponse = this.userService.findByEmail(loginDto.getEmail());
            User user = userResponse.getData();

            if(!loginDto.getPassword().equals(user.getPassword())) {
                return new AuthResponse<>("Error");
            }
            return new AuthResponse<>(user);
        }
        catch (Exception e) {
            return new AuthResponse<>("Error");
        }
    }
}
