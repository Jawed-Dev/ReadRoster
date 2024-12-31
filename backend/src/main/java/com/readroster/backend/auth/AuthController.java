package com.readroster.backend.auth;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("auth/login")
    public ResponseEntity<AuthResponse<AuthDto>> login(@RequestBody LoginDto loginDto) {
        AuthResponse<AuthDto> authResponse = this.authService.login(loginDto);
        if(!authResponse.isSuccess()) {
            return ResponseEntity.badRequest().body(authResponse);
        }
        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("auth/logout")
    public ResponseEntity<AuthResponse<Void>> logout() {
        AuthResponse<Void> authResponse = this.authService.logout();
        if(!authResponse.isSuccess()) {
            return ResponseEntity.badRequest().body(authResponse);
        }
        return ResponseEntity.ok(authResponse);
    }

    @GetMapping("auth/isAuth")
    public ResponseEntity<AuthResponse<Boolean>> isAuthenticated() {
        System.out.println("Entering isAuthenticated endpoint");
        AuthResponse<Boolean> authResponse = this.authService.isAuthenticated();
        return ResponseEntity.ok(authResponse);
    }

    @GetMapping("auth/getDataSession")
    public ResponseEntity<AuthResponse<AuthDto>> getDataSession() {
        AuthResponse<AuthDto> authResponse = this.authService.getDataSession();
        if(!authResponse.isSuccess()) {
            return ResponseEntity.badRequest().body(authResponse);
        }
        return ResponseEntity.ok(authResponse);
    }
}

