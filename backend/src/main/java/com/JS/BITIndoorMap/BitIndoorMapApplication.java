package com.JS.BITIndoorMap;

import com.JS.BITIndoorMap.entity.Role;
import com.JS.BITIndoorMap.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BitIndoorMapApplication {

    public static void main(String[] args) {
        SpringApplication.run(BitIndoorMapApplication.class, args);
    }

    @Autowired
    private RoleRepository roleRepository;

    @Bean
    public CommandLineRunner initRoles() {
        return args -> {
            if (roleRepository.findByRoleName("user") == null) {
                Role userRole = new Role();
                userRole.setRoleName("user");
                roleRepository.save(userRole);
            }
        };
    }
}
