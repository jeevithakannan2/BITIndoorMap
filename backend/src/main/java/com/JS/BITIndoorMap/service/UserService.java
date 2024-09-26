package com.JS.BITIndoorMap.service;

import com.JS.BITIndoorMap.entity.Role;
import com.JS.BITIndoorMap.entity.User;
import com.JS.BITIndoorMap.repository.RoleRepository;
import com.JS.BITIndoorMap.repository.UserRepository;
import java.util.HashSet;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

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
        if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new IllegalArgumentException("Email already exists");
        }
        String hashedPassword = passwordEncoder.encode(user.getPasswordHash());
        user.setPasswordHash(hashedPassword);
        Role userRole = roleRepository.findByRoleName("user");
        if (userRole == null) {
            throw new IllegalArgumentException("Role 'user' not found");
        }
        Set<Role> roles = new HashSet<>();
        roles.add(userRole);
        user.setRoles(roles);
        user.setFullName(user.getFullName());
        userRepository.save(user);
        return true;
    }

    public boolean addRoleToUser(String username, String roleName) {
        User user = userRepository.findByUsername(username);
        Role role = roleRepository.findByRoleName(roleName);
        if (user != null && role != null) {
            user.getRoles().add(role);
            userRepository.save(user);
            return true;
        }
        return false;
    }

    public boolean removeRoleFromUser(String username, String roleName) {
        User user = userRepository.findByUsername(username);
        Role role = roleRepository.findByRoleName(roleName);
        if (user != null && role != null) {
            user.getRoles().remove(role);
            userRepository.save(user);
            return true;
        }
        return false;
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
