package com.readroster.backend.auth;
import com.readroster.backend.user.User;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("auth/login")
    public ResponseEntity<AuthResponse<User>> login(@RequestBody LoginDto loginDto) {
        AuthResponse<User> authResponse = this.authService.login(loginDto);
        if(!authResponse.isSuccess()) {
            return ResponseEntity.badRequest().body(authResponse);
        }
        return ResponseEntity.ok(authResponse);
    }
}

