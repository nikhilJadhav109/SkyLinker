package com.app.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Role;
import com.app.pojos.UserRole;



public interface RoleRepository extends JpaRepository<UserRole, Integer> {
	Optional<UserRole> findByRoleName(Role role);
}
