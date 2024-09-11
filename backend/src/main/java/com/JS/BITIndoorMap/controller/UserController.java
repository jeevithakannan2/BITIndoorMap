package com.JS.BITIndoorMap.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import com.JS.BITIndoorMap.entity.User;
import com.JS.BITIndoorMap.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        if (userService.authenticateUser(userService.getUsername(user.getId()), userService.getPassword(user.getId()))) {
            return ResponseEntity.ok("Login successful!");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
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
