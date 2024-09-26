package com.JS.BITIndoorMap.controller;

import com.JS.BITIndoorMap.entity.User;
import com.JS.BITIndoorMap.service.UserService;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody User user) {
        try {
            if (
                userService.authenticateUser(
                    user.getUsername(),
                    user.getPasswordHash()
                )
            ) {
                Map<String, String> response = new HashMap<>();
                response.put("message", "Login successful!");
                response.put("username", user.getUsername());
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    Map.of("message", "Invalid credentials")
                );
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                Map.of("message", "An error occurred during login")
            );
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        try {
            userService.registerUser(user);
            return ResponseEntity.ok("Registration successful!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                e.getMessage()
            );
        }
    }

    @GetMapping("/{userId}/username")
    public String getUsername(@PathVariable Long userId) {
        return userService.getUsername(userId);
    }

    @GetMapping("/{userId}/password")
    public String getPassword(@PathVariable Long userId) {
        return userService.getPassword(userId);
    }
}
