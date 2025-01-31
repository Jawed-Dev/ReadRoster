package com.readroster.backend.user;
import com.readroster.backend.auth.AuthDto;
import com.readroster.backend.auth.AuthResponse;
import com.readroster.backend.auth.LoginDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")

public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("auth/register")
    public ResponseEntity<UserResponse<UserDto>> register(@RequestBody User user) {
        UserResponse<UserDto> userResponse = this.userService.register(user);
        if(!userResponse.isSuccess()) {
            return ResponseEntity.badRequest().body(userResponse);
        }
        return ResponseEntity.ok(userResponse);
    }

    @GetMapping("auth/user/data")
    public ResponseEntity<UserResponse<UserDto>> getDataUser() {
        System.out.println("DEBUT");
        UserResponse<UserDto> userResponse = this.userService.getDataUser();
        if(!userResponse.isSuccess()) {
            return ResponseEntity.badRequest().body(userResponse);
        }
        return ResponseEntity.ok(userResponse);
    }
}
