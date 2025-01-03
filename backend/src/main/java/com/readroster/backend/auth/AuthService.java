package com.readroster.backend.auth;
import com.readroster.backend.user.User;
import com.readroster.backend.user.UserResponse;
import com.readroster.backend.user.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserService userService;
    private final AuthMapper authMapper;
    private final HttpSession session;

    public AuthService(UserService userService, AuthMapper authMapper, HttpSession session) {
        this.userService = userService;
        this.authMapper = authMapper;
        this.session = session;
    }

    public AuthResponse<AuthDto> getDataSession() {
        AuthDto authDto = (AuthDto) session.getAttribute(AuthConstant.SESSION_USER);
        return AuthResponse.success(authDto);
    }

    public AuthResponse<Boolean> isAuthenticated() {
        Boolean stateAuth = session.getAttribute(AuthConstant.SESSION_USER) != null;
        System.out.println(stateAuth);
        return AuthResponse.success(stateAuth);
    }

    public void createSession(AuthDto authDto) {
        session.setAttribute(AuthConstant.SESSION_USER, authDto);
        session.setMaxInactiveInterval(AuthConstant.TIME_SESSION_USER);
    }

    public AuthResponse<AuthDto> login(LoginDto loginDto) {
        try {
            UserResponse<User> userResponse = this.userService.findByEmail(loginDto.getEmail());
            if(!userResponse.isSuccess()) {
                return AuthResponse.error("Error");
            }

            User user = userResponse.getData();
            if(!loginDto.getPassword().equals(user.getPassword())) {
                return AuthResponse.error("Error");
            }

            AuthDto authDto = this.authMapper.toDto(user);
            this.createSession(authDto);
            return AuthResponse.success(authDto);
        }
        catch (Exception e) {
            return AuthResponse.error("Error");
        }
    }

    public AuthResponse<Void> logout() {
        try {
            session.removeAttribute(AuthConstant.SESSION_USER);
            return AuthResponse.success(null);
        } catch (Exception e) {
            return AuthResponse.error("Erreur lors de la déconnexion");
        }
    }
}
