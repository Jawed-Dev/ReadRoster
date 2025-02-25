package com.readroster.backend.user;
import com.readroster.backend.auth.AuthDto;
import com.readroster.backend.auth.SessionService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final SessionService sessionService;

    UserService(UserRepository userRepository, UserMapper userMapper, PasswordEncoder passwordEncoder, SessionService sessionService) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
        this.sessionService = sessionService;
    }

    public UserResponse<UserDto> getDataUser() {
        try {

            System.out.println("Test");

            if(!this.sessionService.isAuthenticated()) {
                return UserResponse.error("L'utilisateur n'est pas connecté");
            }

            AuthDto authDto = this.sessionService.getDataSession();

            System.out.println("AuthDto : " + authDto.getEmail());
            Optional<User> optionalUser = this.userRepository.findByEmail(authDto.getEmail());

            if(optionalUser.isEmpty()) {
                return UserResponse.error("Utilisateur non trouvé");
            }

            UserDto userDto = this.userMapper.userToDto(optionalUser.get());
            System.out.println("UserDto : " + userDto);
            return UserResponse.success(userDto);
        }
        catch (Exception e) {
            return UserResponse.error("Error ");
        }
    }

    public UserResponse<User> findByEmail(String email) {
        try {
            Optional<User> userOptional = userRepository.findByEmail(email);
            return userOptional
                    .map(UserResponse::success)
                    .orElse(UserResponse.error("Not found"));
        }
        catch (Exception e) {
            return UserResponse.error("Error findByEmail");
        }
    }

    public UserResponse<UserDto> register(RegisterPayload registerPayload) {
        try {
            if(this.sessionService.isAuthenticated()) {
                return UserResponse.error("L'utilisateur est connecté");
            }

            String hashedPassword = this.passwordEncoder.encode(registerPayload.getPassword());
            registerPayload.setPassword(hashedPassword);

            User user = userMapper.registerPayloadToUser(registerPayload);
            User savedUser = userRepository.save(user);

            UserDto userDto = userMapper.userToDto(savedUser);
            return UserResponse.success(userDto);
        }
        catch (Exception e) {
            return UserResponse.error("Error ");
        }
    }
}
