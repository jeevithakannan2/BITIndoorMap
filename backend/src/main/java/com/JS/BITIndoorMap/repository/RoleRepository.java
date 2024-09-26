package com.JS.BITIndoorMap.repository;

import com.JS.BITIndoorMap.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByRoleName(String roleName);
}
