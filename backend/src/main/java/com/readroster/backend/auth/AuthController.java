package com.readroster.backend.auth;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("auth/login")
    public ResponseEntity<AuthDto> login(@RequestBody LoginPayload loginPayload) {
        AuthResponse<AuthDto> authResponse = this.authService.login(loginPayload);
        if(!authResponse.isSuccess()) {
            return ResponseEntity.badRequest().body(authResponse.getData());
        }
        return ResponseEntity.ok(authResponse.getData());
    }

    @GetMapping("auth/isAuth")
    public ResponseEntity<Boolean> isAuthenticated() {
        AuthResponse<Boolean> authResponse = this.authService.isAuthenticated();
        if(!authResponse.isSuccess()) {
            return ResponseEntity.badRequest().body(authResponse.getData());
        }
        return ResponseEntity.ok(authResponse.getData());
    }

    @PostMapping("auth/logout")
    public ResponseEntity<Boolean> logout() {
        AuthResponse<Boolean> authResponse = this.authService.logout();
        if(!authResponse.isSuccess()) {
            return ResponseEntity.badRequest().body(authResponse.getData());
        }
        return ResponseEntity.ok(authResponse.getData());
    }


    @GetMapping("auth/getDataSession")
    public ResponseEntity<AuthDto> getDataSession() {
        AuthResponse<AuthDto> authResponse = this.authService.getDataSession();
        if(!authResponse.isSuccess()) {
            return ResponseEntity.badRequest().body(authResponse.getData());
        }
        return ResponseEntity.ok(authResponse.getData());
    }
}

