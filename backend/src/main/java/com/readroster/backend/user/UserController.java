package com.readroster.backend.user;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")

public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("auth/register")
    public ResponseEntity<UserDto> register(@RequestBody RegisterPayload registerPayload) {
        UserResponse<UserDto> userResponse = this.userService.register(registerPayload);
        if(!userResponse.isSuccess()) {
            return ResponseEntity.badRequest().body(userResponse.getData());
        }
        return ResponseEntity.ok(userResponse.getData());
    }

    @GetMapping("auth/user/data")
    public ResponseEntity<UserDto> getDataUser() {
        UserResponse<UserDto> userResponse = this.userService.getDataUser();
        if(!userResponse.isSuccess()) {
            return ResponseEntity.badRequest().body(userResponse.getData());
        }
        return ResponseEntity.ok(userResponse.getData());
    }
}
