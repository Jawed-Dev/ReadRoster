package com.readroster.backend.controller;

import com.readroster.backend.entity.LoginCredentials;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class LoginController {

    @PostMapping("/auth/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginCredentials loginCredentials) {
        Map<String, String> response = new HashMap<>();

        if ("jawed".equals(loginCredentials.getUsername()) && "test".equals(loginCredentials.getPassword())) {
            response.put("message", "Connexion réussie !");
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Nom d'utilisateur ou mot de passe incorrect");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }
}
