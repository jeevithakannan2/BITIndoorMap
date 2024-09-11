package com.JS.BITIndoorMap.service;

import org.springframework.stereotype.Service;

// Placeholder for actual authentication logic (e.g., database interaction)
@Service
public class UserService {

    public boolean authenticateUser(String username, String password) {
        // TODO: Implement actual authentication logic (e.g., check against database)
        if (username.equals("testuser") && password.equals("password")) {
            return true;
        } else {
            return false;
        }
    }

    public String getUsername(Long userId) {
        // TODO: Fetch username from the database based on userId
        return "testuser"; // Replace with actual database logic
    }

    public String getPassword(Long userId) {
        // TODO: Fetch password from the database based on userId
        return "password"; // Replace with actual database logic
    }
}
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
