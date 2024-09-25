package com.JS.BITIndoorMap.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.JS.BITIndoorMap.entity.User;
import com.JS.BITIndoorMap.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public boolean authenticateUser(String username, String password) {
        User user = userRepository.findByUsername(username);
        if (user != null && user.getPassword().equals(password)) {
            return true;
        } else {
            return false;
        }
    }

    public boolean registerUser(User user) {
        if (userRepository.findByUsername(user.getUsername()) != null) {
            throw new IllegalArgumentException("Username already exists");
        }
        userRepository.save(user);
        return true;
    }
    
    public String getUsername(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        return user != null ? user.getUsername() : null;
    }

    public String getPassword(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        return user != null ? user.getPassword() : null;
    }
}