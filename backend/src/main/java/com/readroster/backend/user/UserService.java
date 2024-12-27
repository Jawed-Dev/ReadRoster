package com.readroster.backend.user;
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
}
