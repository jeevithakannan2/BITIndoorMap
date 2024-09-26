package com.JS.BITIndoorMap.service;

import com.JS.BITIndoorMap.entity.User;
import com.JS.BITIndoorMap.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public boolean authenticateUser(String username, String password) {
        User user = userRepository.findByUsername(username);
        if (
            user != null &&
            passwordEncoder.matches(password, user.getPasswordHash())
        ) {
            return true;
        } else {
            return false;
        }
    }

    public boolean registerUser(User user) {
        if (userRepository.findByUsername(user.getUsername()) != null) {
            throw new IllegalArgumentException("Username already exists");
        }
        String hashedPassword = passwordEncoder.encode(user.getPasswordHash());
        user.setPasswordHash(hashedPassword);
        userRepository.save(user);
        return true;
    }

    public String getUsername(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        return user != null ? user.getUsername() : null;
    }

    public String getPassword(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        return user != null ? user.getPasswordHash() : null;
    }
}
