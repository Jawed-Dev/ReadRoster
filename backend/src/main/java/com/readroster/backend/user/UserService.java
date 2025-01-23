package com.readroster.backend.user;
import com.readroster.backend.auth.AuthDto;
import com.readroster.backend.auth.AuthResponse;
import com.readroster.backend.auth.LoginDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    public UserResponse<User> findByEmail(String email) {
        try {
            Optional<User> userOptional = userRepository.findByEmail(email);
            return userOptional
                    .map(UserResponse::success)
                    .orElse(UserResponse.error("Not found"));
        }
        catch (Exception e) {
            return UserResponse.error("An unexpected error occurred");
        }
    }

    public UserResponse<User> register(User user) {
        try {
            Optional<User> userOptional = Optional.of(userRepository.save(user));
            return userOptional
                    .map(UserResponse::success)
                    .orElse(UserResponse.error("Error register"));
        }
        catch (Exception e) {
            return UserResponse.error("Error");
        }
    }
}
