package com.readroster.backend.auth;
import com.readroster.backend.user.User;
import com.readroster.backend.user.UserResponse;
import com.readroster.backend.user.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class AuthService {
    private final UserService userService;
    private final AuthMapper authMapper;
    private final HttpSession session;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserService userService, AuthMapper authMapper, HttpSession session, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.authMapper = authMapper;
        this.session = session;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthResponse<AuthDto> getDataSession() {
        AuthDto authDto = (AuthDto) session.getAttribute(AuthConstant.SESSION_USER);
        return AuthResponse.success(authDto);
    }

    public AuthResponse<Boolean> isAuthenticated() {
        Object sessionUser = session.getAttribute(AuthConstant.SESSION_USER);
        boolean stateAuth = (sessionUser != null);
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
            if(!this.passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
                return AuthResponse.error("Credentials error");
            }

            AuthDto authDto = this.authMapper.toDto(user);
            this.createSession(authDto);

            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            String hashedPassword = encoder.encode(loginDto.getPassword());
            System.out.println(hashedPassword);

            return AuthResponse.success(authDto);
        }
        catch (Exception e) {
            return AuthResponse.error("Error");
        }
    }

    public AuthResponse<Void> logout() {
        try {
            this.session.removeAttribute(AuthConstant.SESSION_USER);
            return AuthResponse.success(null);
        } catch (Exception e) {
            return AuthResponse.error("Erreur lors de la déconnexion");
        }
    }


}
