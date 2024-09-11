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
}
