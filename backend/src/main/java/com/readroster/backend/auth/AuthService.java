package com.readroster.backend.auth;
import com.readroster.backend.user.User;
import com.readroster.backend.user.UserResponse;
import com.readroster.backend.user.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserService userService;
    private final AuthMapper authMapper;
    private final SessionService sessionService;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserService userService, AuthMapper authMapper,
                       SessionService sessionService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.authMapper = authMapper;
        this.sessionService = sessionService;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthResponse<Boolean> isAuthenticated() {
        Boolean isAuth = this.sessionService.isAuthenticated();
        return AuthResponse.success(isAuth);
    }

    public AuthResponse<AuthDto> getDataSession() {
        AuthDto authDto = sessionService.getDataSession();
        return AuthResponse.success(authDto);
    }

    public AuthResponse<AuthDto> login(LoginDto loginDto) {

        try {
            if(this.sessionService.isAuthenticated()) {
                return AuthResponse.error("L'utilisateur est déjà connecté");
            }

            UserResponse<User> userResponse = this.userService.findByEmail(loginDto.getEmail());
            if(!userResponse.isSuccess()) {
                return AuthResponse.error("Error");
            }

            User user = userResponse.getData();
            if(!this.passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
                return AuthResponse.error("Credentials error");
            }

            AuthDto authDto = this.authMapper.toDto(user);
            this.sessionService.createSession(authDto);

            return AuthResponse.success(authDto);

        }
        catch (Exception e) {
            return AuthResponse.error("Error");
        }
    }

    public AuthResponse<Void> logout() {
        try {
            if(!this.sessionService.isAuthenticated()) {
                return AuthResponse.error("L'utilisateur n'est pas connecté");
            }
            this.sessionService.clearSession();
            return AuthResponse.success(null);
        }
        catch (Exception e) {
            return AuthResponse.error("Erreur lors de la déconnexion");
        }
    }


}
